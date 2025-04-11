# AI Social Replier SaaS - GPT Response Generator

## Introduction

Welcome to AI Social Replier SaaS or Replier in short, an AI-powered social media management tool designed to automate responses to your social media interactions. This documentation will guide you through the installation, setup, and usage of Replier, ensuring you can make the most of its features.

## Table of Contents

1. [Getting Started](#getting-started)
2. [Requirements](#requirements)
3. [Installation](#installation)
4. [Using Replier](#using-replier)
5. [Chrome Extension](#chrome-extension)
6. [Support](#support)

## Getting Started

Replier is a lightweight application that can be run on a free Vercel account. It requires no database since we are using Stripe dashboard and APIs to their full potential. Vercel is indeed a requirement for deploying this application.

## Requirements

Before you begin, ensure you have the following:

1. [Google OAuth API](https://support.google.com/cloud/answer/6158849?hl=en): For Google authentication.
2. [Stripe API Key](https://support.stripe.com/questions/what-are-stripe-api-keys-and-how-to-find-them): For payment processing.
3. [OpenAI API Key](https://platform.openai.com/api-keys): For generating AI responses.
4. [Resend API Key](https://resend.com/): For sending emails from the contact form.

## Installation

### Local Setup

1. Extract the downloaded Zip file from CodeCanyon and navigate to the project directory:

   ```sh
   cd replier
   ```

2. Install Dependencies:

   We use PNPM and recommend using it, but npm can be used as well.

   ```sh
   pnpm install
   ```

3. Set Up Environment Variables:

   Create a `.env.local` file in the root directory and add the following environment variables:

   ```sh
   ADMIN_NAME=your_name
   ADMIN_EMAIL=your_email_address
   AUTH_SECRET=your_nextauth_secret
   AUTH_GOOGLE_ID=your_google_client_id
   AUTH_GOOGLE_SECRET=your_google_client_secret
   STRIPE_SECRET_KEY=your_stripe_secret_key
   BASE_URL=https://localhost:3000
   OPENAI_API_KEY=your_openai_api_key
   RESEND_API_KEY=your_resend_api_key
   RESEND_FROM_NAME=your_resend_from_name
   RESEND_FROM_EMAIL=your_resend_from_email
   RESEND_TO_NAME=your_resend_to_name
   RESEND_TO_EMAIL=your_resend_to_email
   ```

4. Stripe Integration:

   Replier is tightly integrated with Stripe for subscription management and billing. Follow these steps to configure Stripe in a Sandbox environment:

   - Create Stripe Products and Prices:

     Run the seed script to create the necessary products and prices in Stripe:

     ```sh
     pnpm seed --dev
     ```

5. Run the Development Server:

   ```sh
   pnpm dev --experimental-https
   ```

6. Open the Application:

   Open https://localhost:3000 with your browser to see the result.

### Production Deployment

For production deployment on Vercel, follow the standard Next.js deployment documentation: [Deplying Your Next.js App to Vercel](https://nextjs.org/learn-pages-router/basics/deploying-nextjs-app)

Before deploying to production, run the seed script for production from your local environment. This will prepare the Stripe configuration in a production setup for you without needing to manually set up all the Stripe products in the production environment. It is important that you do this while you're at your local setup as you can't run it from the Vercel production server:

```sh
pnpm seed
```

After the app is in production and the seed command has been run, the administrator will need to create a 100% discount coupon from Stripe production and use that coupon to make a purchase on the unlimited subscription package directly from the app. This is required as we will use the relevant subscription ID as a license key for all the free trial users who have no license key. We are offering 5 free trial AI generations from the Chrome extension for users who install it for the first time. Copy the relevant subscription ID somewhere as we will use it in the next section of the Chrome extension installation guide.

## Using Replier

### Dashboard

Access the dashboard at `/dashboard` to manage your subscription, view usage statistics, and update your billing information.

### Subscription Management

Manage your subscription through the billing portal. Navigate to the billing portal from the dashboard to update your plan or billing information.

### AI-Powered Replies

Replier uses AI to generate contextually relevant responses to social media interactions. Simply use the extension in your social media accounts and let Replier handle the rest.

## Chrome Extension

Replier includes a Chrome extension to enhance your social media management experience. Follow these steps to install and use the extension:

1. Extract the Chrome Extension:

   The Chrome extension is provided as a zip file that you will get when you extract the downloaded zip file from CodeCanyon.

2. Set Up Environment Variables:

   The extension needs to connect with the Next.js app. Fill up the following environment variables in the extension's `.env` file:

   ```sh
   VITE_WXT_MAX_REQUEST=5
   VITE_WXT_SITE_URL='https://replier.social'
   VITE_WXT_ADMIN_LICENSE='your_license_key_from_your_site_dashboard'
   ```

   - `VITE_WXT_MAX_REQUEST`: The number of free AI generations allowed for free users.
   - `VITE_WXT_SITE_URL`: The site URL where you've deployed the Next.js app on Vercel recently.
   - `VITE_WXT_ADMIN_LICENSE`: The admin license key that you purchased using the 100% coupon. Logging into the Replier site dashboard will grant you the license that needs to be used here.

3. Build the Extension:

   Run the following command to build the extension:

   ```sh
   pnpm dev
   ```

4. Prepare the Extension Zip File:

   Run the following command to prepare a zip file for the extension:

   ```sh
   pnpm zip
   ```

5. Install the Extension:

   Load the unpacked extension in Chrome by navigating to `chrome://extensions/`, enabling "Developer mode", and selecting "Load unpacked". Choose the directory where the extension was built.

6. Customize the Extension:

   The extension was built using the [WXT](https://wxt.dev) framework, which offers an extensive development guide for further customization. You can customize the app name and description in the `wxt.config.ts` file.

7. Publishing on Chrome Web Store:
   Replier extension has already approved on the demo site for https://replier.social at [Chrome Web Store](https://chromewebstore.google.com/detail/ai-social-replier-gpt-res/ahfilmopkkfaehndncopogaohdkddjjd). This means you're full proof to customize the extension based on your desired needs and release it on the Chrome Web Store under your own brands name.

## Support

If you have any questions or need assistance, please contact our support team at mazedulislamkhan@gmail.com. We'd be happy to assist you or set it up for you for a certain installation fee.

---

Thank you for choosing Replier! We hope you enjoy using our AI-powered social media management tool.
