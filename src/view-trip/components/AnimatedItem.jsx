import RevealOnScroll from "@/create-trip/RevealOnScroll";

function AnimatedItem({ children, delay = 0 }) {
  const ref = RevealOnScroll();

  return (
    <div
      ref={ref}
      style={{ transitionDelay: `${delay}ms` }}
    >
      {children}
    </div>
  );
}

export default AnimatedItem;
