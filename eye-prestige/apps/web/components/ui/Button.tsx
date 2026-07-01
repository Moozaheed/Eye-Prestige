import { cn } from "@/lib/utils";
import type { ButtonHTMLAttributes } from "react";

type Variant = "pill" | "solid" | "outline";

interface ButtonProps extends ButtonHTMLAttributes<HTMLButtonElement> {
  variant?: Variant;
  icon?: React.ReactNode;
}

const variants: Record<Variant, string> = {
  pill: "bg-white text-ink",
  solid: "bg-ink text-white",
  outline: "bg-transparent text-ink border border-ink",
};

export default function Button({
  variant = "solid",
  icon,
  children,
  className,
  ...props
}: ButtonProps) {
  return (
    <button
      className={cn(
        "inline-flex items-center justify-center gap-2 rounded-pill px-6 py-3.5 text-[11.5px] font-bold uppercase tracking-button",
        variants[variant],
        className
      )}
      {...props}
    >
      {children}
      {icon}
    </button>
  );
}
