// src/components/ToggleButtons.jsx
import React from "react";

export default function ToggleButtons({ active, onChange }) {
  return (
    <div className="flex bg-white border border-black rounded-full p-1 w-fit shadow-sm">
      <button
        type="button"
        onClick={() => onChange(false)}
        className={`px-3 py-1 text-sm rounded-full transition-all ${!active ? "bg-black text-white" : "text-black"}`}
      >
        Today
      </button>
      <button
        type="button"
        onClick={() => onChange(true)}
        className={`px-3 py-1 text-sm rounded-full transition-all ${active ? "bg-black text-white" : "text-black"}`}
      >
        This Week
      </button>
    </div>
  );
}
