import { SocialPlatform, PostInfo } from "./interfaces";

export abstract class BaseSocialPlatform implements SocialPlatform {
  name: string;
  url: string;
  protected requestCounter: number = 0;
  protected maxRequestCounter: number = import.meta.env.VITE_WXT_MAX_REQUEST;
  protected toneNumberElement: HTMLSpanElement | null = null;

  constructor(name: string, url: string) {
    this.name = name;
    this.url = url;
  }

  async init(): Promise<void> {
    await this.loadRequestCounter();
    await this.injectCommonCSS();
    await this.injectPlatformCSS();
    this.observeDOM();
  }

  async isConnected(): Promise<boolean> {
    const result = await chrome.storage.sync.get(["connectStatus"]);

    return result.connectStatus === "connected";
  }

  async loadRequestCounter(): Promise<void> {
    return new Promise((resolve) => {
      chrome.storage.sync.get(["aiCommentRequestCounter"], (result) => {
        this.requestCounter = result.aiCommentRequestCounter || 0;
        this.updateToneNumberUI();
        resolve();
      });
    });
  }

  protected async injectCSS(filename: string): Promise<void> {
    const response = await fetch(chrome.runtime.getURL(filename));
    const css = await response.text();
    const style = document.createElement("style");
    style.textContent = css;
    document.head.appendChild(style);
  }

  public async injectCommonCSS(): Promise<void> {
    await this.injectCSS("assets/common.css");
  }

  abstract injectPlatformCSS(): Promise<void>;

  observeDOM(preProcessCallback?: () => void): void {
    const observer = new MutationObserver((mutationsList) => {
      for (let mutation of mutationsList) {
        if (mutation.type === "childList") {
          if (preProcessCallback) {
            preProcessCallback();
          }
          this.processNewElements();
        }
      }
    });

    observer.observe(document.body, { childList: true, subtree: true });
  }

  abstract processNewElements(): void;

  createCommentTones(element: HTMLElement): void {
    const aiCommentTones = document.createElement("div");
    aiCommentTones.className = "ai-comment-tones";

    const tones = [
      "positive",
      "negative",
      "supportive",
      "instructive",
      "enthusiastic",
      "empathetic",
      "encouraging",
      "congratulatory",
      "appreciative",
      "informative",
      "motivational",
      "inspirational",
      "viral",
      "professional",
      "friendly",
      "calm",
      "polite",
      "humorous",
      "idea",
      "questioning",
    ];

    tones.forEach((tone) => {
      const button = this.createButton(
        `ai-comment-tone-${tone}`,
        `${this.getEmoji(tone)} ${this.capitalize(tone)}`
      );
      button.addEventListener("click", (e) => this.handleButtonClick(e, tone));
      aiCommentTones.appendChild(button);
    });

    element.appendChild(aiCommentTones);
  }

  protected createButton(
    className: string,
    textContent: string
  ): HTMLButtonElement {
    const button = document.createElement("button");
    button.className = className;
    button.textContent = textContent;
    return button;
  }

  protected createUpsellBox(): HTMLDivElement {
    const upsellBox = document.createElement("div");
    upsellBox.className = "ai-comment-upsell-box";

    this.toneNumberElement = document.createElement("span");
    this.toneNumberElement.className = "ai-comment-tone-number";
    this.updateToneNumberUI();
    upsellBox.appendChild(this.toneNumberElement);

    const moreLink = document.createElement("a");
    moreLink.className = "ai-comment-more-link";
    moreLink.href = `${
      import.meta.env.VITE_WXT_SITE_URL
    }/${this.name.toLowerCase()}?utm_source=extension&utm_medium=upsell&utm_campaign=${this.name.toLowerCase()}`;
    moreLink.textContent = "Get more";
    upsellBox.appendChild(moreLink);

    return upsellBox;
  }

  protected updateToneNumberUI(): void {
    if (this.toneNumberElement) {
      this.toneNumberElement.textContent = `${this.requestCounter} / ${this.maxRequestCounter} generations`;
    }
  }

  simulateTyping(text: string, element: HTMLElement): void {
    element.focus();
    let index = 0;

    const typeNextChar = () => {
      if (index < text.length) {
        const char = text.charAt(index);
        document.execCommand("insertText", false, char);
        index++;
        setTimeout(typeNextChar, 0);
      }
    };

    typeNextChar();
  }

  protected updateRequestCounter(): Promise<void> {
    return new Promise((resolve) => {
      chrome.storage.sync.get(["aiCommentRequestCounter"], (result) => {
        this.requestCounter = (result.aiCommentRequestCounter || 0) + 1;
        chrome.storage.sync.set(
          { aiCommentRequestCounter: this.requestCounter },
          () => {
            this.updateToneNumberUI();
            resolve();
          }
        );
      });
    });
  }

  async handleButtonClick(event: MouseEvent, tone: string): Promise<void> {
    event.preventDefault();

    const { actor, description, comment } = this.extractPostInfo(event);
    const commentField = this.getCommentField(event);

    const message: any = {
      type: "GENERATE_TEXT",
      src: this.name.toLowerCase(),
      tone,
      actor,
      description,
    };

    if (comment) {
      message.comment = {
        name: comment.name,
        headline: comment.headline,
        description: comment.description,
      };
    }

    this.showProgressIndicator();

    if (await this.isConnected()) {
      this.generateAndInsertComment(message, event, commentField);
    } else {
      if (this.isMaxRequestReached()) {
        this.handleMaxRequestReached(event, commentField);
      } else {
        this.generateAndInsertComment(message, event, commentField);
      }
    }
  }

  abstract extractPostInfo(event: MouseEvent): PostInfo;
  abstract getCommentField(event: MouseEvent): HTMLElement;
  abstract showProgressIndicator(): void;
  abstract hideProgressIndicator(): void;

  protected isMaxRequestReached(): boolean {
    return this.requestCounter >= this.maxRequestCounter;
  }

  protected handleMaxRequestReached(
    event: MouseEvent,
    commentField: HTMLElement
  ): void {
    this.disableButtons(
      (event.target as HTMLElement).closest(".ai-comment-tones") as HTMLElement
    );
    this.simulateTyping(
      "🚫 Maximum generations reached. Consider upgrading.",
      commentField
    );
  }

  protected generateAndInsertComment(
    message: any,
    event: MouseEvent,
    commentField: HTMLElement
  ): void {
    chrome.runtime.sendMessage(
      message,
      async (response: { success: boolean; message: string }) => {
        this.hideProgressIndicator();
        this.simulateTyping(response.message, commentField);

        if (response.success) {
          await this.updateRequestCounter();
          this.updateToneNumberUI();

          if (!(await this.isConnected())) {
            this.updateNearestUpsellBox(event);
          }
        }
      }
    );
  }

  protected updateNearestUpsellBox(event: MouseEvent): void {
    const nearestContainer = this.findNearestContainer(event);
    if (nearestContainer) {
      const upsellBox = this.findOrCreateUpsellBox(nearestContainer);
      const toneNumberElement = upsellBox.querySelector(
        ".ai-comment-tone-number"
      );
      if (toneNumberElement) {
        toneNumberElement.textContent = `${this.requestCounter} / ${this.maxRequestCounter} generations`;
      }
    }
  }

  abstract findNearestContainer(event: MouseEvent): Element | null;

  findOrCreateUpsellBox(container: Element): HTMLDivElement {
    let upsellBox = container.querySelector(
      ".ai-comment-upsell-box"
    ) as HTMLDivElement;
    if (!upsellBox) {
      upsellBox = this.createUpsellBox();
      container.appendChild(upsellBox);
    }
    return upsellBox;
  }

  protected disableButtons(container: HTMLElement): void {
    const buttons = container.querySelectorAll("button");
    buttons.forEach((button) => {
      button.disabled = true;
      button.style.opacity = "0.5";
      button.style.cursor = "not-allowed";
    });
  }

  protected getEmoji(tone: string): string {
    const emojiMap: { [key: string]: string } = {
      positive: "👍",
      negative: "👎",
      supportive: "🤝",
      instructive: "👩‍🏫",
      enthusiastic: "🎉",
      empathetic: "🤗",
      encouraging: "👏",
      congratulatory: "🎊",
      appreciative: "🙌",
      informative: "ℹ️",
      motivational: "🚀",
      inspirational: "🌟",
      viral: "🔥",
      professional: "👔",
      friendly: "😊",
      calm: "🧘‍♀️",
      polite: "🙏",
      humorous: "😂",
      idea: "💡",
      questioning: "❓",
    };
    return emojiMap[tone] || "";
  }

  protected capitalize(str: string): string {
    return str.charAt(0).toUpperCase() + str.slice(1);
  }
}
