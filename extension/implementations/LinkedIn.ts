import { BaseSocialPlatform } from "./BaseSocialPlatform";
import { PostInfo } from "./interfaces";

export class LinkedIn extends BaseSocialPlatform {
  constructor() {
    super("LinkedIn", "linkedin.com/feed");
  }

  async injectPlatformCSS(): Promise<void> {
    await this.injectCSS("assets/linkedin.css");
  }

  processNewElements(): void {
    const formCommentBoxes = document.querySelectorAll(
      "form.comments-comment-box__form"
    );
    formCommentBoxes.forEach(async (formCommentBox) => {
      if (!formCommentBox.querySelector("div.ai-comment-tones")) {
        this.createCommentTones(formCommentBox as HTMLElement);

        if (!(await this.isConnected())) {
          this.findOrCreateUpsellBox(formCommentBox);
        }
      }
    });
  }

  extractPostInfo(event: MouseEvent): PostInfo {
    const card = (event.target as HTMLElement).closest(".artdeco-card");
    const actor =
      card?.querySelector(
        ".update-components-actor__name .text-view-model, .update-components-actor__name span span"
      )?.textContent ?? "";
    const description =
      card?.querySelector(
        ".feed-shared-update-v2__description-wrapper .text-view-model, .feed-shared-update-v2__description .text-view-model, .feed-shared-update-v2__description .update-components-text span, .feed-shared-update-v2__description .update-components-text > span > span"
      )?.textContent ?? "";

    // Check if we're replying to a comment
    const commentItem = (event.target as HTMLElement).closest(
      ".comments-comment-item, .reply-item"
    );
    if (commentItem) {
      const commentText =
        commentItem.querySelector(
          ".comments-highlighted-comment-item-content-body span span, .comments-comment-item-content-body span span, .comments-reply-item-content-body span span"
        )?.textContent || "";

      const commenterName =
        commentItem.querySelector(
          ".comments-post-meta .comments-post-meta__name-text, .comments-post-meta .comments-post-meta__name-text"
        )?.children[0]?.children[0]?.textContent || "";

      const commenterHeadline =
        commentItem.querySelector(
          ".comments-post-meta .comments-post-meta__headline"
        )?.textContent || "";

      return {
        actor,
        description,
        comment: {
          name: commenterName,
          headline: commenterHeadline,
          description: commentText,
        },
      };
    }

    return { actor, description };
  }

  getCommentField(event: MouseEvent): HTMLElement {
    const formElement = (event.target as HTMLElement).closest("form");
    return formElement?.querySelector(
      '.ql-editor[contenteditable="true"]'
    ) as HTMLElement;
  }

  showProgressIndicator(): void {
    // LinkedIn doesn't have a built-in progress indicator, so we'll skip this
  }

  hideProgressIndicator(): void {
    // LinkedIn doesn't have a built-in progress indicator, so we'll skip this
  }

  findNearestContainer(event: MouseEvent): Element | null {
    return (event.target as HTMLElement).closest(
      "form.comments-comment-box__form"
    );
  }
}
