export interface PopupInterface {
  init(): void;
  loadApiKey(): Promise<void>;
  loadConnectionStatus(): Promise<void>;
  handleSubmit(e: Event): void;
  updateConnectionStatus(status: "connected" | "disconnected"): void;
  showError(message: string): void;
  hideError(): void;
  loadSystemPrompt(): Promise<void>;
  saveSystemPrompt(): Promise<void>;
}
