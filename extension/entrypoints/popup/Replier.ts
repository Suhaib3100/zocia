import { BasePopup } from "./BasePopup";

export class Replier extends BasePopup {
  private customPromptContainer: HTMLElement;

  constructor() {
    super();
    this.customPromptContainer = document.querySelector(
      ".custom-prompt-container"
    ) as HTMLElement;
    this.useCustomPromptCheckbox.addEventListener(
      "change",
      this.handleCustomPromptToggle.bind(this)
    );
  }

  init(): void {
    super.init();
    this.handleCustomPromptToggle(); // Set initial state
  }

  private handleCustomPromptToggle(): void {
    const isChecked = this.useCustomPromptCheckbox.checked;
    this.systemPromptInput.disabled = !isChecked;
    this.customPromptContainer.style.display = isChecked ? "block" : "none";
  }

  async loadSystemPrompt(): Promise<void> {
    const result = await chrome.storage.sync.get([
      "systemPrompt",
      "useCustomPrompt",
    ]);
    this.systemPromptInput.value = result.systemPrompt || "";
    this.useCustomPromptCheckbox.checked = result.useCustomPrompt || false;
    this.handleCustomPromptToggle(); // Update visibility based on loaded state
  }

  handleSubmit(e: Event): void {
    e.preventDefault();

    if (!this.apiKeyInput.value) {
      this.showError("API Key is required.");
      return;
    }

    this.hideError();

    chrome.runtime.sendMessage(
      {
        type: "SET_API_KEY",
        apiKey: this.apiKeyInput.value,
        systemPrompt: this.useCustomPromptCheckbox.checked
          ? this.systemPromptInput.value
          : "",
        useCustomPrompt: this.useCustomPromptCheckbox.checked,
      },
      (response) => {
        if (response?.success) {
          this.updateConnectionStatus("connected");
        } else {
          this.showError(response?.error?.message || "An error occurred.");
          this.updateConnectionStatus("disconnected");
        }
      }
    );
  }
}
