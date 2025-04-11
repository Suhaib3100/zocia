export interface SocialPlatform {
  name: string;
  url: string;
  init(): Promise<void>;
  createCommentTones(element: HTMLElement): void;
  handleButtonClick(event: MouseEvent, tone: string): void;
  simulateTyping(text: string, element: HTMLElement): void;
  injectCommonCSS(): Promise<void>;
  injectPlatformCSS(): Promise<void>;
  processNewElements(): void;
  extractPostInfo(event: MouseEvent): PostInfo;
  getCommentField(event: MouseEvent): HTMLElement;
  showProgressIndicator(): void;
  hideProgressIndicator(): void;
  findNearestContainer(event: MouseEvent): Element | null;
}

export interface PostInfo {
  actor: string;
  description: string;
  comment?: CommentInfo;
}

export interface CommentInfo {
  name: string;
  headline: string;
  description: string;
}
