"use client";

import { useState } from "react";
import { motion } from "framer-motion";
import { ToggleSlider } from "@/components/ToggleSlider";

export default function SettingsPage() {
  const [darkMode, setDarkMode] = useState(false);
  const [averagesAsPercent, setAveragesAsPercent] = useState(false);
  const [lockDownKeys, setLockDownKeys] = useState(false);

  return (
    <motion.div
      initial={{ opacity: 0, y: 40, height: 0 }}
      animate={{ opacity: 1, y: 0, height: "auto" }}
      exit={{ opacity: 0, y: 40, height: 0 }}
    >
      <h1 className="mb-6 font-semibold text-3xl">Account Settings</h1>

      <div className="flex flex-col gap-6 text-sm">
        <div className="flex items-center justify-between w-[320px]">
          <span>Dark Mode</span>
          <ToggleSlider checked={darkMode} onToggle={setDarkMode} />
        </div>

        <div className="flex items-center justify-between w-[320px]">
          <span>Averages in %</span>
          <ToggleSlider
            checked={averagesAsPercent}
            onToggle={setAveragesAsPercent}
          />
        </div>

        <div className="flex items-center justify-between w-[320px]">
          <span>Lock Down Keys</span>
          <ToggleSlider checked={lockDownKeys} onToggle={setLockDownKeys} />
        </div>
      </div>
    </motion.div>
  );
}
