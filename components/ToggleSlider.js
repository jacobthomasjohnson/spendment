import { useState, useEffect } from "react";

export function ToggleSlider({
  checked,
  defaultChecked = false,
  onToggle,
  label,
}) {
  const isControlled = typeof checked === "boolean";
  const [internalChecked, setInternalChecked] = useState(defaultChecked);

  const actualChecked = isControlled ? checked : internalChecked;

  const handleToggle = () => {
    const newChecked = !actualChecked;

    if (!isControlled) {
      setInternalChecked(newChecked);
    }

    if (onToggle) {
      onToggle(newChecked);
    }
  };

  return (
    <div className="flex items-center space-x-2">
      {label && <span className="text-sm text-neutral-700">{label}</span>}
      <div
        onClick={handleToggle}
        className={`relative w-14 h-8 rounded-full cursor-pointer transition-all duration-200 ${
          actualChecked ? "bg-primary" : "bg-neutral-200"
        }`}
      >
        <div
          className={`absolute top-1 left-1 w-6 h-6 bg-white rounded-full transition-transform duration-200 ${
            actualChecked ? "transform translate-x-6" : ""
          }`}
        />
      </div>
    </div>
  );
}
