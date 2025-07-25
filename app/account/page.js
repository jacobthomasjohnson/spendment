"use client";

import { Save, Check } from "lucide-react";
import { useState } from "react";
import { motion } from "framer-motion";
import { ToggleSlider } from "@/components/ToggleSlider";

export default function AccountPage() {
  const [signOutEverywhere, setSignOutEverywhere] = useState(false);
  const [saved, setSaved] = useState(false);

  const handleSave = () => {
    setSaved(true);

    if (signOutEverywhere) {
      setSignOutEverywhere(false);
    }

    setTimeout(() => {
      setSaved(false);
    }, 2000);
  };

  return (
    <motion.div
      initial={{ opacity: 0, y: 40, height: 0 }}
      animate={{ opacity: 1, y: 0, height: "auto" }}
      exit={{ opacity: 0, y: 40, height: 0 }}
    >
      <div className="text-sm text-neutral-400 mb-2">Account</div>
      <h1 className="mb-6 font-semibold text-3xl">Your Account</h1>

      <div className="flex flex-col sm:flex-row gap-8 mb-8 items-start">
        <div className="border border-neutral-300 rounded-lg px-6 py-4 w-[260px]">
          <div className="text-xs text-neutral-500 mb-1">Your Email</div>
          <div className="text-lg font-medium text-black tracking-tight">
            me@jtj.com
          </div>
          <div className="text-sm text-neutral-400 mt-1">Confirmed</div>
        </div>
      </div>

      <div className="flex items-center gap-4 text-sm mb-8">
        <span>Sign Out Everywhere</span>
        <ToggleSlider
          defaultChecked={false}
          onToggle={() => setSignOutEverywhere((prev) => !prev)}
          checked={signOutEverywhere}
        />
      </div>

      <button
        onClick={handleSave}
        className={`flex gap-2 items-center px-4 py-3 rounded-md text-sm transition-all duration-200 ${
          saved
            ? "bg-green-600 text-white"
            : "bg-primary text-white hover:bg-primary-light"
        }`}
      >
        {saved ? <Check width={14} height={14} /> : <Save width={14} height={14} />}
        {saved ? "Saved" : "Save"}
      </button>
    </motion.div>
  );
}
