import { useEffect, useRef } from "react";

export default function RevealOnScroll() {
  const ref = useRef(null);

  useEffect(() => {
    const el = ref.current;
    if (!el) return;

    // starea inițială (ascuns)
    el.style.opacity = "0";
    el.style.transform = "translateY(60px)";
    el.style.transition =
      "opacity 0.9s ease-out, transform 0.9s ease-out";

    const observer = new IntersectionObserver(
      ([entry]) => {
        if (entry.isIntersecting) {
          el.style.opacity = "1";
          el.style.transform = "translateY(0)";
          observer.unobserve(el);
        }
      },
      { threshold: 0.15 }
    );

    observer.observe(el);

    return () => observer.disconnect();
  }, []);

  return ref;
}
