"use client";

import { cn } from "@/lib/utils";
import {
  useEffect,
  useRef,
  useState,
  type CSSProperties,
  type ElementType,
  type ReactNode,
} from "react";

export type RevealVariant = "up" | "down" | "left" | "right" | "scale" | "fade";
export type StaggerVariant = "up" | "scale" | "left";

type AnimateInProps = {
  as?: ElementType;
  children: ReactNode;
  className?: string;
  delay?: number;
  variant?: RevealVariant;
  /** Stagger fade-in on direct children (e.g. card grids) */
  stagger?: boolean;
  staggerVariant?: StaggerVariant;
  /** Animate on mount without waiting for scroll (hero, above-the-fold) */
  immediate?: boolean;
};

const variantClass: Record<RevealVariant, string> = {
  up: "website-reveal-up",
  down: "website-reveal-down",
  left: "website-reveal-left",
  right: "website-reveal-right",
  scale: "website-reveal-scale",
  fade: "website-reveal-fade",
};

const staggerClass: Record<StaggerVariant, string> = {
  up: "website-reveal-stagger-up",
  scale: "website-reveal-stagger-scale",
  left: "website-reveal-stagger-left",
};

export function AnimateIn({
  as: Component = "div",
  children,
  className,
  delay = 0,
  variant = "up",
  stagger = false,
  staggerVariant = "scale",
  immediate = false,
}: AnimateInProps) {
  const ref = useRef<HTMLElement>(null);
  const [visible, setVisible] = useState(immediate);

  useEffect(() => {
    if (immediate) return;

    const element = ref.current;
    if (!element) return;

    if (window.matchMedia("(prefers-reduced-motion: reduce)").matches) {
      setVisible(true);
      return;
    }

    const observer = new IntersectionObserver(
      ([entry]) => {
        if (entry?.isIntersecting) {
          setVisible(true);
          observer.disconnect();
        }
      },
      { threshold: 0.12, rootMargin: "0px 0px -10% 0px" },
    );

    observer.observe(element);
    return () => observer.disconnect();
  }, [immediate]);

  return (
    <Component
      ref={ref}
      className={cn(
        "website-reveal",
        stagger ? staggerClass[staggerVariant] : variantClass[variant],
        visible && "website-reveal--visible",
        className,
      )}
      style={
        delay > 0
          ? ({ "--website-reveal-delay": `${delay}ms` } as CSSProperties)
          : undefined
      }
    >
      {children}
    </Component>
  );
}
