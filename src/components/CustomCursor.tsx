import { useEffect, useRef } from "react";

export default function CustomCursor() {
  const cursorRef = useRef<HTMLDivElement | null>(null);
  const mouse = useRef({ x: 0, y: 0 });
  const pos = useRef({ x: 0, y: 0 });

  useEffect(() => {
    // Disable on touch devices
    if (window.matchMedia && window.matchMedia("(hover: none)").matches) return;

    const el = document.createElement("div");
    el.className = "custom-cursor";

    // inner dot + ring for nicer visuals
    el.innerHTML = `<div class=\"custom-cursor-ring\"></div><div class=\"custom-cursor-dot\"></div>`;
    document.body.appendChild(el);
    cursorRef.current = el;
    document.body.classList.add("custom-cursor-enabled");

    function onMove(e: MouseEvent) {
      mouse.current.x = e.clientX;
      mouse.current.y = e.clientY;
    }

    window.addEventListener("mousemove", onMove);

    // Smooth follow using requestAnimationFrame
    let raf = 0;
    const loop = () => {
      pos.current.x += (mouse.current.x - pos.current.x) * 0.18;
      pos.current.y += (mouse.current.y - pos.current.y) * 0.18;
      const x = Math.round(pos.current.x);
      const y = Math.round(pos.current.y);
      if (cursorRef.current) {
        // use transform for GPU acceleration
        cursorRef.current.style.transform = `translate3d(${x}px, ${y}px, 0)`;
      }
      raf = requestAnimationFrame(loop);
    };
    raf = requestAnimationFrame(loop);

    // Add hover handlers for interactive elements
    const interactiveSelector = "a, button, input, textarea, select, [role=button], [data-cursor-hover]";
    const interactives = Array.from(document.querySelectorAll(interactiveSelector));
    const addHover = () => cursorRef.current?.classList.add("hovered");
    const removeHover = () => cursorRef.current?.classList.remove("hovered");
    interactives.forEach((el) => {
      el.addEventListener("mouseenter", addHover);
      el.addEventListener("mouseleave", removeHover);
    });

    return () => {
      cancelAnimationFrame(raf);
      window.removeEventListener("mousemove", onMove);
      interactives.forEach((el) => {
        el.removeEventListener("mouseenter", addHover);
        el.removeEventListener("mouseleave", removeHover);
      });
      document.body.classList.remove("custom-cursor-enabled");
      cursorRef.current?.remove();
      cursorRef.current = null;
    };
  }, []);

  return null;
}
