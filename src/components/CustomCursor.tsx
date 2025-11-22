import { useEffect } from "react";

export default function CustomCursor() {
  useEffect(() => {
    // If touch device (no hover), do nothing
    if (window.matchMedia && window.matchMedia("(hover: none)").matches) return;

    document.body.classList.add("custom-cursor-enabled");

    return () => {
      document.body.classList.remove("custom-cursor-enabled");
    };
  }, []);

  return null;
}
