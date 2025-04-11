interface GenerateTextRequest {
  type: string;
  src: string;
  tone: string;
  actor: string;
  description: string;
  comment?: { name: string; headline: string; description: string };
  apiKey?: string;
  systemPrompt?: string;
  useCustomPrompt?: boolean;
}

export default defineBackground(() => {
  chrome.runtime.onMessage.addListener(
    (request: GenerateTextRequest, sender, sendResponse) => {
      if (request.type === "SET_API_KEY") {
        handleSetApiKey(request, sendResponse);
        return true; // Indicates that the response is sent asynchronously
      }

      if (request.type === "GENERATE_TEXT") {
        handleGenerateText(request, sendResponse);
        return true; // Indicates that the response is sent asynchronously
      }

      return false;
    }
  );
});

function isValidBase64(str: string) {
  try {
    // Remove hyphens from the string before validation
    const cleanStr = str.replace(/-/g, '');
    // Attempt to decode and validate the cleaned string
    const decoded = atob(cleanStr);
    // Ensure the decoded string is not empty and re-encoding matches
    return decoded.length > 0 && btoa(decoded) === cleanStr;
  } catch (e) {
    return false;
  }
}

function handleSetApiKey(
  request: GenerateTextRequest,
  sendResponse: (response: any) => void
) {
  // Validate Base64 format
  if (!request.apiKey || !isValidBase64(request.apiKey)) {
    sendResponse({
      success: false,
      error: {
        message: "oda key format. Please provide a valid Base64 encoded key.",
        details: "Invalid key format"
      }
    });
    return;
  }

  fetch(`${import.meta.env.VITE_WXT_SITE_URL}/api/generate`, {
    method: "POST",
    headers: {
      "Content-Type": "application/json",
      Authorization: `Bearer ${request.apiKey}`,
    },
    body: JSON.stringify({
      type: "SET_API_KEY",
    }),
  })
    .then(async (response) => {
      if (!response.ok) {
        const errorData = await response.json().catch(() => ({}));
        let errorMessage = "License key validation failed. ";
        
        if (response.status === 401) {
          errorMessage += "Invalid or expired license key. Please check your key and try again.";
        } else if (response.status === 403) {
          errorMessage += "License key has been revoked or is inactive. Please contact support.";
        } else {
          errorMessage += `Server error (${response.status}). Please try again later.`;
        }

        sendResponse({
          success: false,
          error: {
            message: errorMessage,
            details: errorData.error || response.statusText
          },
        });
        throw new Error(errorMessage);
      }

      return response.json();
    })
    .then((data) => {
      chrome.storage.sync.set({
        apiKey: request.apiKey,
        systemPrompt: request.systemPrompt,
        useCustomPrompt: request.useCustomPrompt,
        connectStatus: "connected",
        lastValidated: new Date().toISOString()
      });

      sendResponse({ 
        success: true, 
        message: "License key validated successfully",
        data: data.message 
      });
    })
    .catch((e) => {
      console.error("License validation error:", e);

      sendResponse({ 
        success: false, 
        error: { 
          message: e.message || "Failed to validate license key. Please try again.",
          details: e.error 
        } 
      });
      chrome.storage.sync.set({ 
        connectStatus: "disconnected",
        lastError: e.message
      });
    });
}

function handleGenerateText(
  request: GenerateTextRequest,
  sendResponse: (response: any) => void
) {
  chrome.storage.sync.get(
    ["apiKey", "systemPrompt", "useCustomPrompt"],
    (result: {
      apiKey?: string;
      systemPrompt?: string;
      useCustomPrompt?: boolean;
    }) => {
      if (!result.apiKey) {
        chrome.storage.sync.get(["aiCommentRequestCounter"], (result) => {
          const requestCounter = result.aiCommentRequestCounter || 0;

          if (requestCounter <= import.meta.env.VITE_WXT_MAX_REQUEST) {
            // console.log({ ...request });
            // sleep for 2 seconds
            // setTimeout(() => {
            //   sendResponse({ success: false, message: "API key not found" });
            // }, 2000);
            // sendResponse({ success: false, message: "API key not found" });
            // return;

            fetch(`${import.meta.env.VITE_WXT_SITE_URL}/api/generate`, {
              method: "POST",
              headers: {
                "Content-Type": "application/json",
                Authorization: `Bearer ${
                  import.meta.env.VITE_WXT_ADMIN_LICENSE
                }`,
              },
              body: JSON.stringify({
                ...request,
                customPrompt: result.useCustomPrompt as boolean,
                userPrompt: result.systemPrompt as string,
              }),
            })
              .then((response) => {
                if (!response.ok)
                  throw new Error(
                    `HTTP error! ${response.status}, ${response.statusText}`
                  );

                return response.json();
              })
              .then((data) => {
                sendResponse({ success: true, message: data.generate });
              })
              .catch((e) => {
                console.error(e);

                sendResponse({ success: false, message: e.error });
              });
          } else {
            sendResponse({ success: false, message: "API key not found" });
          }
        });

        return;
      }

      fetch(`${import.meta.env.VITE_WXT_SITE_URL}/api/generate`, {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
          Authorization: `Bearer ${result.apiKey}`,
        },
        body: JSON.stringify({
          ...request,
          customPrompt: result.useCustomPrompt as boolean,
          userPrompt: result.systemPrompt as string,
        }),
      })
        .then((response) => {
          if (!response.ok)
            throw new Error(
              `HTTP error! ${response.status}, ${response.statusText}`
            );

          return response.json();
        })
        .then((data) => {
          sendResponse({ success: true, message: data.generate });
        })
        .catch((e) => {
          console.error(e);

          sendResponse({ success: false, message: e.error });
        });
    }
  );
}
