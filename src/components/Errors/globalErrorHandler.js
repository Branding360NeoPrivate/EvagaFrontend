import axios from "axios";

// Function to send logs to the server
const logErrorToServer = (logData) => {
  axios
    .post(`${process.env.REACT_APP_API_BASE_URL}logerror/log-error`, logData)
    .catch((err) => {
      console.error("Error logging failed:", err);
    });
};

// Helper function to check if the error is from Google Analytics
const isGoogleAnalyticsError = (url) => {
  return (
    typeof url === "string" && url.includes("https://www.google-analytics.com")
  );
};

// Capture global errors
window.onerror = function (message, source, lineno, colno, error) {
  if (isGoogleAnalyticsError(source)) {
    return; // Skip logging for Google Analytics errors
  }

  logErrorToServer({
    type: "Global Error",
    message,
    source,
    lineno,
    colno,
    error: error ? error.toString() : null,
  });
};

// Capture unhandled promise rejections
window.addEventListener("unhandledrejection", (event) => {
  const url = event.reason?.config?.url || event.reason?.request?.responseURL;

  if (isGoogleAnalyticsError(url)) {
    return; // Skip logging for Google Analytics errors
  }

  logErrorToServer({
    type: "Unhandled Rejection",
    message: event.reason ? event.reason.toString() : "Unhandled rejection",
  });
});

// Capture network errors (e.g., fetch errors)
const originalFetch = window.fetch;
window.fetch = async (...args) => {
  const url = args[0];

  // Skip logging for Google Analytics URLs
  if (isGoogleAnalyticsError(url)) {
    return originalFetch(...args); // Skip logging and proceed with the original fetch
  }

  try {
    const response = await originalFetch(...args);
    if (!response.ok) {
      logErrorToServer({
        type: "Network Error",
        message: `Fetch failed with status: ${response.status}`,
        url: args[0],
      });
    }
    return response;
  } catch (error) {
    logErrorToServer({
      type: "Network Error",
      message: error.toString(),
      url: args[0],
    });
    throw error; // Re-throw to avoid altering behavior
  }
};
