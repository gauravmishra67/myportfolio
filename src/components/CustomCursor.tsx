import { useEffect, useState, useRef } from "react";

export default function CustomCursor() {
  const cursorRef = useRef<HTMLDivElement>(null);
  const dotRef = useRef<HTMLDivElement>(null);
  const [hovering, setHovering] = useState(false);
  const [visible, setVisible] = useState(false);
  const pos = useRef({ x: 0, y: 0 });
  const target = useRef({ x: 0, y: 0 });

  useEffect(() => {
    const isTouchDevice = "ontouchstart" in window || navigator.maxTouchPoints > 0;
    if (isTouchDevice) return;

    setVisible(true);

    const move = (e: MouseEvent) => {
      target.current = { x: e.clientX, y: e.clientY };
    };

    const over = (e: MouseEvent) => {
      const t = e.target as HTMLElement;
      if (
        t.closest("a") ||
        t.closest("button") ||
        t.closest("[data-cursor-hover]") ||
        t.tagName === "A" ||
        t.tagName === "BUTTON"
      ) {
        setHovering(true);
      } else {
        setHovering(false);
      }
    };

    window.addEventListener("mousemove", move);
    window.addEventListener("mouseover", over);

    let raf: number;
    const animate = () => {
      pos.current.x += (target.current.x - pos.current.x) * 0.15;
      pos.current.y += (target.current.y - pos.current.y) * 0.15;
      if (cursorRef.current) {
        cursorRef.current.style.transform = `translate(${pos.current.x - 20}px, ${pos.current.y - 20}px)`;
      }
      if (dotRef.current) {
        dotRef.current.style.transform = `translate(${target.current.x - 3}px, ${target.current.y - 3}px)`;
      }
      raf = requestAnimationFrame(animate);
    };
    raf = requestAnimationFrame(animate);

    return () => {
      window.removeEventListener("mousemove", move);
      window.removeEventListener("mouseover", over);
      cancelAnimationFrame(raf);
    };
  }, []);

  if (!visible) return null;

  return (
    <>
      <div
        ref={cursorRef}
        className="fixed top-0 left-0 pointer-events-none z-[9999] mix-blend-difference"
        style={{ willChange: "transform" }}
      >
        <div
          className="rounded-full border transition-all duration-300"
          style={{
            width: hovering ? 56 : 40,
            height: hovering ? 56 : 40,
            borderColor: "rgba(0,0,0,0.25)",
            borderWidth: 1,
            marginLeft: hovering ? -8 : 0,
            marginTop: hovering ? -8 : 0,
          }}
        />
      </div>
      <div
        ref={dotRef}
        className="fixed top-0 left-0 pointer-events-none z-[9999]"
        style={{ willChange: "transform" }}
      >
        <div
          className="w-1.5 h-1.5 rounded-full bg-neutral-800"
          style={{ opacity: hovering ? 0 : 1, transition: "opacity 0.2s" }}
        />
      </div>
    </>
  );
}
