"use client";

import { useEffect } from "react";
import { usePathname } from "next/navigation";

/**
 * Enforces a "top-of-page" scroll position on every route change and refresh.
 * This ensures the cinematic hero experience is never bypassed by browser
 * scroll restoration or focused elements.
 */
export function ScrollToTop() {
  const pathname = usePathname();

  useEffect(() => {
    // Force immediate scroll to top without smooth animation to prevent
    // any flicker of the lower sections.
    if (typeof window !== "undefined") {
      window.scrollTo(0, 0);
      
      // Some browsers (Safari/iOS) require a slight delay or repeated call 
      // if they are aggressively restoring scroll position.
      const timer = setTimeout(() => {
        window.scrollTo(0, 0);
      }, 0);
      
      return () => clearTimeout(timer);
    }
  }, [pathname]);

  return null;
}
