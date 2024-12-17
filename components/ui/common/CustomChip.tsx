import React from "react";

export function CustomChip({ label, width }: { label: string; width: number }) {
  return (
    <div
      style={{ width: width }}
      className="flex h-[33px] shrink-0 items-center justify-center rounded-[64px] bg-primary/[.10] p-3 text-sm text-primary"
    >
      {label}
    </div>
  );
}
