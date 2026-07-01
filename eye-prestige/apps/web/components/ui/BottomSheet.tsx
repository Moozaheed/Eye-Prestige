"use client";

import { useEffect, useRef } from "react";
import { X } from "lucide-react";

interface BottomSheetProps {
  open: boolean;
  onClose: () => void;
  title: string;
  children: React.ReactNode;
  footer?: React.ReactNode;
}

export default function BottomSheet({
  open,
  onClose,
  title,
  children,
  footer,
}: BottomSheetProps) {
  const sheetRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    if (open) {
      document.body.style.overflow = "hidden";
    } else {
      document.body.style.overflow = "";
    }
    return () => {
      document.body.style.overflow = "";
    };
  }, [open]);

  return (
    <>
      <div
        className={cn(
          "fixed inset-0 z-[105] mx-auto max-w-screen-xl sheet-backdrop transition-opacity duration-300",
          open ? "pointer-events-auto opacity-100" : "pointer-events-none opacity-0"
        )}
        onClick={onClose}
      />
      <div
        ref={sheetRef}
        className={cn(
          "fixed inset-x-0 bottom-0 z-[110] mx-auto flex max-h-[84vh] max-w-screen-xl flex-col rounded-t-[20px] bg-white transition-transform duration-[360ms] ease-[cubic-bezier(0.65,0,0.35,1)]",
          open ? "translate-y-0" : "translate-y-full"
        )}
      >
        <div className="mx-auto mt-2.5 mb-0.5 h-1 w-9 rounded-full bg-hairline" />
        <div className="flex items-center justify-between px-[18px] pb-3 pt-2.5">
          <h4 className="display text-[19px] font-[480]">{title}</h4>
          <button onClick={onClose} aria-label="Close">
            <X size={20} strokeWidth={1.6} />
          </button>
        </div>
        <div className="overflow-y-auto px-[18px]">{children}</div>
        {footer && (
          <div className="sticky bottom-0 flex items-center justify-between gap-3 border-t border-hairline bg-white px-[18px] py-3.5">
            {footer}
          </div>
        )}
      </div>
    </>
  );
}

function cn(...classes: (string | boolean | undefined)[]) {
  return classes.filter(Boolean).join(" ");
}
