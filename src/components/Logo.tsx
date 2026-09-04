import { cn } from "@/lib/utils";

interface LogoProps {
  className?: string;
}

const LETTERS = ["A", "D", "H", "I", "V", "E", "X"] as const;
const ACCENT_LETTERS = new Set(["A", "V"]);

/**
 * ADHIVEX logotype. Only the A and V render in the brand accent color, per
 * the locked design system — the rest of the wordmark stays currentColor.
 * Rendered as one <text> with <tspan>s so the browser handles real kerning
 * instead of hand-tuned x offsets.
 */
export function Logo({ className }: LogoProps) {
  return (
    <svg
      viewBox="0 0 168 32"
      role="img"
      aria-label="ADHIVEX"
      className={cn("h-6 w-auto overflow-visible text-foreground", className)}
      xmlns="http://www.w3.org/2000/svg"
    >
      <title>ADHIVEX</title>
      <text
        x="0"
        y="24"
        fontFamily="var(--font-unbounded), sans-serif"
        fontWeight={600}
        fontSize="26"
        letterSpacing="0.5"
      >
        {LETTERS.map((letter, i) => (
          <tspan key={i} fill={ACCENT_LETTERS.has(letter) ? "var(--accent)" : "currentColor"}>
            {letter}
          </tspan>
        ))}
      </text>
    </svg>
  );
}
