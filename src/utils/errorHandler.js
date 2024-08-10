// src/utils/errorHandler.js
export const handleApiError = (error) => {
    // Customize error handling logic
    console.error("API Error:", error.message);
    return error.message;
  };
  