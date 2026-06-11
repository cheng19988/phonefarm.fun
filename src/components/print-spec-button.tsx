"use client";

export function PrintSpecButton() {
  return (
    <button type="button" onClick={() => window.print()} className="btn-primary text-sm py-2.5 px-5">
      Save as PDF / Print
    </button>
  );
}
