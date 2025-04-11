import { PopupInterface } from "./interfaces";

export abstract class BasePopup implements PopupInterface {
  protected apiKeyInput: HTMLInputElement;
  protected logoLink: HTMLAnchorElement;
  protected upsellLink: HTMLAnchorElement;
  protected submitButton: HTMLButtonElement;
  protected errorMessage: HTMLElement;
  protected connectedStatus: HTMLElement;
  protected disconnectedStatus: HTMLElement;
  protected systemPromptInput: HTMLTextAreaElement;
  protected useCustomPromptCheckbox: HTMLInputElement;

  constructor() {
    this.apiKeyInput = document.querySelector(
      'input[name="api-key"]'
    ) as HTMLInputElement;
    this.logoLink = document.getElementById("logo") as HTMLAnchorElement;
    this.upsellLink = document.getElementById(
      "get-license"
    ) as HTMLAnchorElement;
    this.submitButton = document.querySelector(
      'button[type="submit"]'
    ) as HTMLButtonElement;
    this.errorMessage = document.getElementById("error") as HTMLElement;
    this.connectedStatus = document.getElementById("connected") as HTMLElement;
    this.disconnectedStatus = document.getElementById(
      "disconnected"
    ) as HTMLElement;
    this.systemPromptInput = document.getElementById(
      "system-prompt"
    ) as HTMLTextAreaElement;
    this.useCustomPromptCheckbox = document.getElementById(
      "use-custom-prompt"
    ) as HTMLInputElement;
  }

  init(): void {
    this.loadApiKey();
    this.setLogoLink();
    this.setUpsellLink();
    this.loadConnectionStatus();
    this.submitButton.addEventListener("click", this.handleSubmit.bind(this));
    this.loadSystemPrompt();
    this.systemPromptInput.addEventListener(
      "input",
      this.saveSystemPrompt.bind(this)
    );
    this.useCustomPromptCheckbox.addEventListener(
      "change",
      this.saveSystemPrompt.bind(this)
    );
  }

  async loadApiKey(): Promise<void> {
    const result = await chrome.storage.sync.get(["apiKey"]);
    this.apiKeyInput.value = result.apiKey || "";
  }

  async setLogoLink(): Promise<void> {
    this.logoLink.href = `${
      import.meta.env.VITE_WXT_SITE_URL
    }?utm_source=extension&utm_medium=popup`;
  }

  async setUpsellLink(): Promise<void> {
    this.upsellLink.href = `${
      import.meta.env.VITE_WXT_SITE_URL
    }?utm_source=extension&utm_medium=popup#pricing`;
  }

  async loadConnectionStatus(): Promise<void> {
    const result = await chrome.storage.sync.get(["connectStatus"]);
    this.updateConnectionStatus(
      result.connectStatus === "connected" ? "connected" : "disconnected"
    );
  }

  abstract handleSubmit(e: Event): void;

  async loadSystemPrompt(): Promise<void> {
    const result = await chrome.storage.sync.get([
      "systemPrompt",
      "useCustomPrompt",
    ]);
    this.systemPromptInput.value = result.systemPrompt || "";
    this.useCustomPromptCheckbox.checked = result.useCustomPrompt || false;
  }

  async saveSystemPrompt(): Promise<void> {
    await chrome.storage.sync.set({
      systemPrompt: this.systemPromptInput.value,
      useCustomPrompt: this.useCustomPromptCheckbox.checked,
    });
  }

  updateConnectionStatus(status: "connected" | "disconnected"): void {
    if (status === "connected") {
      this.connectedStatus.classList.remove("hidden");
      this.disconnectedStatus.classList.add("hidden");
    } else {
      this.connectedStatus.classList.add("hidden");
      this.disconnectedStatus.classList.remove("hidden");
    }
  }

  showError(message: string): void {
    this.errorMessage.classList.remove("hidden");
    this.errorMessage.textContent = message;
  }

  hideError(): void {
    this.errorMessage.classList.add("hidden");
  }
}
