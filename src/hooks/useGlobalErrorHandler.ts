// src/hooks/useGlobalErrorHandler.ts

import { useEffect } from 'react';

const useGlobalErrorHandler = () => {
  useEffect(() => {
    const globalWindow = window;
    let errorTrapping = "none"; // Set as needed
    const ourConsole = console; // Or a custom console

    if (
      "none" !== errorTrapping &&
      typeof globalWindow === "object" &&
      typeof globalWindow.addEventListener === "function"
    ) {
      const handleError = (event: ErrorEvent) => {
        event.preventDefault();
        ourConsole.error("Global Error Caught:", event.error);
        if (errorTrapping === "exit" || errorTrapping === "abort") {
          globalWindow.location.href = "about:blank";
        }
      };

      globalWindow.addEventListener("error", handleError);

      // Cleanup on unmount
      return () => {
        globalWindow.removeEventListener("error", handleError);
      };
    }
  }, []);
};

export default useGlobalErrorHandler;
