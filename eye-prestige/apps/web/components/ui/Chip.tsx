"use client";

interface ChipProps {
  label: string;
  active?: boolean;
  onClick?: () => void;
}

export default function Chip({ label, active = false, onClick }: ChipProps) {
  return (
    <button
      onClick={onClick}
      className={`flex-none whitespace-nowrap rounded-pill border px-4 py-2.5 text-[11.5px] font-semibold tracking-[0.02em] transition-colors ${
        active
          ? "border-ink bg-ink text-white"
          : "border-hairline bg-white text-ink"
      }`}
    >
      {label}
    </button>
  );
}
