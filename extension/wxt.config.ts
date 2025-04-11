import { defineConfig } from "wxt";

// See https://wxt.dev/api/config.html
export default defineConfig({
  manifest: {
    name: "AI Social Replier - GPT Response Generator",
    description:
      "Write better social media replies instantly. Get AI suggestions for LinkedIn, Twitter & Facebook comments in your preferred style.",
    permissions: ["storage"],
    web_accessible_resources: [
      {
        resources: [
          "assets/common.css",
          "assets/linkedin.css",
          "assets/twitter.css",
          "assets/facebook.css",
        ],
        matches: ["<all_urls>"],
      },
    ],
  },
});
