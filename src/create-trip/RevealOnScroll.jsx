import { useEffect, useRef } from "react";

export default function RevealOnScroll() {
  const ref = useRef(null); // useRef pt nu declanseaza re-render 

  //apelez <div ref={heroRef}
  useEffect(() => {
    const el = ref.current;  //aici ia practic div-ul
    if (!el) return;
    el.style.opacity = "0"; //initial este invizibil
    el.style.transform = "translateY(60px)"; //si il mut mai jos ca sa vina cumva de jos
    el.style.transition ="opacity 0.9s ease-out, transform 0.9s ease-out";

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
  }, []); // lista goala deci ruleaza o sigura data 

  return ref;
}
