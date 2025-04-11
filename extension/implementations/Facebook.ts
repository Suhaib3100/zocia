import { BaseSocialPlatform } from "./BaseSocialPlatform";
import { PostInfo } from "./interfaces";

export class Facebook extends BaseSocialPlatform {
  constructor() {
    super("Facebook", "facebook.com");
  }

  async injectPlatformCSS(): Promise<void> {
    await this.injectCSS("assets/facebook.css");
  }

  processNewElements(): void {
    const socialBars = document.querySelectorAll(
      'div[data-visualcompletion="ignore-dynamic"] .xq8finb.x16n37ib'
    );
    socialBars.forEach(async (bar) => {
      if (!bar.querySelector("div.ai-comment-tones")) {
        this.createCommentTones(bar as HTMLElement);

        if (!(await this.isConnected())) {
          this.findOrCreateUpsellBox(bar);
        }
      }
    });
  }

  extractPostInfo(event: MouseEvent): PostInfo {
    const card = (event.target as HTMLElement).closest(
      "div.html-div.xdj266r.x11i5rnm.xat24cr.x1mh8g0r.xexx8yu.x4uap5.x18d9i69.xkhd6sd"
    );

    // Split into separate selectors with specific parent-child relationships
    const actorSelectors = [
      // Standard profile posts
      'h2[id^=":r"] strong span a span.xt0psk2 span',
      // Newsfeed group posts
      "span.x193iq5w.xeuugli.x13faqbe.x1vvkbs.xlh3980.xvmahel.x1n0sxbx.x1nxh6w3.x1sibtaa.x1s688f.xi81zsa",
      // Shared photo posts
      'div[data-ad-preview="message"] span.html-span',
      // Background posts - more specific selector using parent elements
      'div[data-ad-rendering-role="profile_name"] strong span',
    ].join(", ");

    const descSelectors = [
      'div[data-ad-rendering-role="message"] div[dir="auto"]',
      'div[id^=":r"].x1pi30zi',
      // Background posts description
      "div.xdj266r.x11i5rnm.xat24cr.x1mh8g0r.x1vvkbs",
      // Event update posts - updated selector
      "h5.html-h5 span.x193iq5w a",
    ].join(", ");

    const actor =
      card
        ?.querySelector(actorSelectors)
        ?.textContent?.replace(/[\n\r]+/g, " ")
        ?.replace(/\s+/g, " ")
        ?.trim() ?? "";

    const description =
      card
        ?.querySelector(descSelectors)
        ?.textContent?.replace(/[\n\r]+/g, " ")
        ?.replace(/\s+/g, " ")
        ?.trim() ?? "";

    return { actor, description };
  }

  getCommentField(event: MouseEvent): HTMLElement {
    const commentForm = (event.target as HTMLElement).closest(
      'div[data-visualcompletion="ignore-dynamic"]'
    );
    return commentForm?.querySelector(
      'form [data-lexical-editor="true"]'
    ) as HTMLElement;
  }

  showProgressIndicator(): void {
    const progressBar = document.querySelector(
      'div[role="progressbar"]'
    ) as HTMLElement;
    progressBar.style.display = "block";
    progressBar.style.width = "50%";
  }

  hideProgressIndicator(): void {
    const progressBar = document.querySelector(
      'div[role="progressbar"]'
    ) as HTMLElement;
    progressBar.style.width = "100%";
    progressBar.style.display = "none";
  }

  findNearestContainer(event: MouseEvent): Element | null {
    return (event.target as HTMLElement).closest(".xq8finb.x16n37ib");
  }
}
