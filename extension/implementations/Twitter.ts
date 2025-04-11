import { BaseSocialPlatform } from "./BaseSocialPlatform";
import { PostInfo } from "./interfaces";

export class Twitter extends BaseSocialPlatform {
  private isOnTweetPage: boolean = false;

  constructor() {
    super("Twitter", "x.com");
    this.checkIfOnTweetPage();
  }

  private checkIfOnTweetPage(): void {
    const urlPattern = /https:\/\/x\.com\/.+\/status\/.+/;
    this.isOnTweetPage = urlPattern.test(window.location.href);
  }

  async init(): Promise<void> {
    return super.init().then(() => {
      this.observeDOM(() => this.checkIfOnTweetPage());
    });
  }

  async injectPlatformCSS(): Promise<void> {
    await this.injectCSS("assets/twitter.css");
  }

  async processNewElements(): Promise<void> {
    if (!this.isOnTweetPage) return;

    const tweetTextArea = document.querySelector(
      ".css-175oi2r.r-kemksi.r-jumn1c.r-xd6kpl.r-gtdqiz.r-ipm5af.r-184en5c"
    );

    if (tweetTextArea && !tweetTextArea.querySelector("div.ai-comment-tones")) {
      this.createCommentTones(tweetTextArea as HTMLElement);

      if (!(await this.isConnected())) {
        this.findOrCreateUpsellBox(tweetTextArea);
      }
    }
  }

  extractPostInfo(event: MouseEvent): PostInfo {
    const name =
      document.querySelector(
        'div[data-testid="User-Name"] > div:first-child span span'
      )?.textContent || "";
    const actor =
      document.querySelector(
        'div[data-testid="User-Name"] > div:last-child span'
      )?.textContent || "";
    const description =
      document.querySelector("article > div > div > div:nth-child(3) > div")
        ?.textContent || "";

    return { actor, description };
  }

  getCommentField(event: MouseEvent): HTMLElement {
    return document.querySelector(
      '[data-testid="tweetTextarea_0"]'
    ) as HTMLElement;
  }

  showProgressIndicator(): void {
    const progressBar = document.querySelector(
      'div[role="progressbar"]'
    ) as HTMLElement;
    progressBar.style.visibility = "visible";
  }

  hideProgressIndicator(): void {
    const progressBar = document.querySelector(
      'div[role="progressbar"]'
    ) as HTMLElement;
    progressBar.style.visibility = "hidden";
  }

  findNearestContainer(event: MouseEvent): Element | null {
    return document.querySelector(
      ".css-175oi2r.r-kemksi.r-jumn1c.r-xd6kpl.r-gtdqiz.r-ipm5af.r-184en5c"
    );
  }
}
