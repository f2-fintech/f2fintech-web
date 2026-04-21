import React, { useState, useEffect, useCallback } from "react";
import ErrorStatusPage from "./ErrorStatusPage";

const NetworkManager = ({ children }) => {
  const [isOffline, setIsOffline] = useState(!navigator.onLine);
  const [serverDown, setServerDown] = useState(false);

  const checkTrueConnectivity = useCallback(() => {
    // 1. Check navigator first
    if (!navigator.onLine) {
      console.log("[NetworkManager] Navigator reports OFFLINE.");
      setIsOffline(true);
      return;
    }

    // 2. Performance-friendly "True" Probe using an external image
    // This works on localhost because it targets a public domain
    const img = new Image();
    const startTime = Date.now();

    img.onload = () => {
      // console.log(`[NetworkManager] Connectivity Check: OK (${Date.now() - startTime}ms)`);
      setIsOffline(false);
      setServerDown(false);
    };

    img.onerror = () => {
      console.warn("[NetworkManager] Actual Internet Access: NO (Image failed to load)");
      setIsOffline(true);
    };

    // Using a reliable public resource with a cache-buster
    img.src = `https://www.google.com/favicon.ico?v=${startTime}`;
  }, []);

  useEffect(() => {
    // 1. Initial Check
    checkTrueConnectivity();

    // 2. Event Listeners (for immediate response)
    const handleOnline = () => {
      console.log("[NetworkManager] Browser event: Online. Verifying...");
      checkTrueConnectivity();
    };

    const handleOffline = () => {
      console.log("[NetworkManager] Browser event: Offline.");
      setIsOffline(true);
    };

    window.addEventListener("online", handleOnline);
    window.addEventListener("offline", handleOffline);

    // 3. Catch Resource Errors (Chunk/Asset Loading)
    const handleError = (event) => {
      if (
        event?.target?.tagName === "SCRIPT" || 
        event?.target?.tagName === "LINK" ||
        (event?.message && event.message.includes("ChunkLoadError"))
      ) {
        setServerDown(true);
      }
    };

    const handleRejection = (event) => {
      if (event?.reason?.name === "ChunkLoadError" || 
          event?.reason?.message?.includes("loading chunk") ||
          event?.reason?.message?.includes("Failed to fetch")) {
        setServerDown(true);
      }
    };

    window.addEventListener("error", handleError, true);
    window.addEventListener("unhandledrejection", handleRejection);

    // 4. Heartbeat (Every 10 seconds for faster testing)
    const interval = setInterval(checkTrueConnectivity, 10000);

    return () => {
      window.removeEventListener("online", handleOnline);
      window.removeEventListener("offline", handleOffline);
      window.removeEventListener("error", handleError, true);
      window.removeEventListener("unhandledrejection", handleRejection);
      clearInterval(interval);
    };
  }, [checkTrueConnectivity]);

  // Show error page if offline or if server assets fail to load
  if (isOffline || serverDown) {
    return <ErrorStatusPage type={isOffline ? "offline" : "server"} />;
  }

  return children;
};

export default NetworkManager;
