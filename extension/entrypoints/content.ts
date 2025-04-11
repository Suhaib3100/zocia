import {
  LinkedIn,
  Twitter,
  Facebook,
} from "../implementations/SocialPlatforms";
import type { SocialPlatform } from "../implementations/interfaces";

export default defineContentScript({
  matches: ["*://*.linkedin.com/feed/*", "*://x.com/*", "*://*.facebook.com/*"],
  async main() {
    const currentUrl = window.location.href;
    let platform: SocialPlatform | undefined;

    if (currentUrl.includes("linkedin.com")) {
      platform = new LinkedIn();
    } else if (currentUrl.includes("x.com")) {
      platform = new Twitter();
    } else if (currentUrl.includes("facebook.com")) {
      platform = new Facebook();
    }

    if (platform) {
      await platform.init();
    }
  },
});
