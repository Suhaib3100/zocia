import { NextRequest, NextResponse } from "next/server";
import { decodeLicenseKey } from "@/lib/utils";
import { recordUsagetoMeterForBilling, stripe } from "@/lib/stripe";
import type Stripe from "stripe";
import { generateObject } from "ai";
import { openai } from "@ai-sdk/openai";
import { z } from "zod";

const corsHeaders = {
  "Access-Control-Allow-Origin": "*",
  "Access-Control-Allow-Headers": "Content-Type, Authorization, Email",
};

export async function OPTIONS() {
  return NextResponse.json({}, { headers: corsHeaders });
}

export async function POST(request: NextRequest) {
  const req = await request.json();
  const authHeader = request.headers.get("Authorization");
  if (!authHeader) {
    return NextResponse.json(
      {
        error: "Missing authorization",
        details: "No license key provided"
      },
      {
        status: 401,
        headers: corsHeaders,
      }
    );
  }

  const license = authHeader.split("Bearer ")[1];
  if (!license) {
    return NextResponse.json(
      {
        error: "Invalid authorization format",
        details: "Authorization header must be in 'Bearer <license>' format"
      },
      {
        status: 401,
        headers: corsHeaders,
      }
    );
  }

  let subscriptionId: Stripe.Subscription["id"];

  try {
    subscriptionId = decodeLicenseKey(license as string);
  } catch (error) {
    return NextResponse.json(
      {
        error: "Invalid license key format",
        details:
          error instanceof Error ? error.message : "Failed to decode license",
      },
      {
        status: 401,
        headers: corsHeaders,
      }
    );
  }

  let subscription: Stripe.Subscription;
  try {
    if (subscriptionId.startsWith('free_')) {
      // Create mock subscription for free tier
      subscription = {
        id: subscriptionId,
        status: 'active',
        customer: subscriptionId.split('_')[1],
        current_period_end: Math.floor(Date.now() / 1000) + 30 * 24 * 60 * 60, // 30 days from now
        items: {
          data: [{
            price: {
              product: 'free_tier'
            }
          }]
        }
      } as Stripe.Subscription;
    } else {
      subscription = await stripe.subscriptions.retrieve(subscriptionId);
    }
  } catch (error) {
    return NextResponse.json(
      {
        error: "Invalid subscription",
        details:
          error instanceof Error
            ? error.message
            : "Failed to retrieve subscription",
      },
      {
        status: 401,
        headers: corsHeaders,
      }
    );
  }

  if (req.type === "SET_API_KEY") {
    if (subscription.status !== "active") {
      return NextResponse.json(
        { error: "Subscription not active" },
        { status: 403, headers: corsHeaders }
      );
    }

    return NextResponse.json(
      { message: "Subscription active" },
      { headers: corsHeaders }
    );
  }

  try {
    if (subscription.status !== "active") {
      return NextResponse.json(
        { error: "Subscription not active" },
        { status: 403, headers: corsHeaders }
      );
    }

    const customer: Stripe.Customer = (await stripe.customers.retrieve(
      subscription.customer as string
    )) as Stripe.Customer;

    let systemPrompt = `You will be provided with a ${req.src} post ${
      req.comment ? "and comments" : ""
    }. Your task is to ${
      req.comment ? "reply to the comment" : "write a comment"
    } for it based on the initial language accounting the context and emotion of the ${
      req.comment ? "comment" : "post"
    }. Make the ${
      req.comment ? "reply" : "comment"
    } short and concise. Don't forget to use the ${
      req.tone
    } tone as it was a preferred option selected by the user. Use emojis if necessary. Use easier and common words. Do not start your response with "Replying:", "quotation", or similar stuff. Only use "hashtags" when you need to and "hashtags" shouldn't be more than "one" or "two".`;

    if (req.customPrompt && req.userPrompt) {
      systemPrompt += `\n\nAdditional context and instructions: ${req.userPrompt}\nPlease consider the above additional context and instructions when generating responses, but also adhere to the core functionality of generating social media comments based on the given context and tone.`;
    }

    const userPost =
      `Posted by: ${req.actor}, Description: ${req.description}` +
      (req.comment
        ? `, Comment: ${req.comment?.description}, Commented by: ${req.comment?.name}, Commenter profile headline: ${req.comment?.headline}`
        : "");

    const result = await generateObject({
      model: openai("gpt-4o-mini"),
      system: systemPrompt,
      prompt: userPost,
      schema: z.object({
        generate: z.string(),
      }),
    });

    recordUsagetoMeterForBilling(subscription, customer);

    return NextResponse.json(result.object, { headers: corsHeaders });
  } catch (error) {
    return NextResponse.json(
      { error: error },
      { status: 401, headers: corsHeaders }
    );
  }
}
