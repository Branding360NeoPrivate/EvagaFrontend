import axios from "axios";

// Function to send logs to the server
const logErrorToServer = (logData) => {
  axios.post(`${process.env.REACT_APP_API_BASE_URL}logerror/log-error`, logData).catch((err) => {
    console.error("Error logging failed:", err);
  });
};

// Capture global errors
window.onerror = function (message, source, lineno, colno, error) {
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
  if (typeof url === "string" && url.includes("https://www.google-analytics.com")) {
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
