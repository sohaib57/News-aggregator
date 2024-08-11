export const handleApiError = (error) => {
  
    console.error("API Error:", error.message);
    return error.message;
  };
  