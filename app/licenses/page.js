"use client";

import { motion } from "framer-motion";
import { useState, useEffect } from "react";
import { Copy } from "lucide-react";
import { fakeSupabase } from "@/lib/fakeSupabaseClient"; // make sure this path is correct

export default function LicensesPage() {
  const [licenses, setLicenses] = useState([]); // start with empty array
  const [loading, setLoading] = useState(true);
  const [revealed, setRevealed] = useState({});
  const [copied, setCopied] = useState({});

  useEffect(() => {
    const fetchLicenses = async () => {
      const { data, error } = await fakeSupabase.from("licenses").select();
      if (!error && Array.isArray(data)) {
        setLicenses(data);
      } else {
        setLicenses([]);
      }
      setLoading(false);
    };

    fetchLicenses();
  }, []);

  const handleReveal = (tool) => {
    setRevealed((prev) => ({ ...prev, [tool]: true }));
    setTimeout(() => {
      setRevealed((prev) => ({ ...prev, [tool]: false }));
    }, 3000);
  };

  const handleCopy = async (tool, key) => {
    await navigator.clipboard.writeText(key);
    setCopied((prev) => ({ ...prev, [tool]: true }));
    setTimeout(() => {
      setCopied((prev) => ({ ...prev, [tool]: false }));
    }, 3000);
  };

  return (
    <motion.div
      initial={{ opacity: 0, y: 40, height: 0 }}
      animate={{ opacity: 1, y: 0, height: "auto" }}
      exit={{ opacity: 0, y: 40, height: 0 }}
    >
      <h1 className="mb-6 font-semibold text-3xl">Your Keys</h1>

      {loading ? (
        <p className="text-neutral-600 text-sm">Loading licenses...</p>
      ) : licenses.length === 0 ? (
        <p className="text-neutral-600 text-sm">No licenses found.</p>
      ) : (
        <div className="inline-block w-full max-w-6xl text-sm overflow-hidden rounded-lg border border-neutral-300">
          <table className="min-w-full table-fixed">
            <thead className="bg-[#FCFCFC] text-neutral-400">
              <tr>
                <th className="w-1/3 px-5 py-3 text-sm border-b border-neutral-300 font-medium text-left">
                  Tool
                </th>
                <th className="w-1/3 px-5 py-3 text-sm border-b border-neutral-300 font-medium text-left">
                  Category
                </th>
                <th className="w-1/3 px-5 py-3 text-sm border-b border-neutral-300 font-medium text-left">
                  Key
                </th>
              </tr>
            </thead>
            <tbody>
              {licenses.map((license, i) => {
                const isLast = i === licenses.length - 1;
                const baseCell = `w-1/3 px-5 py-3 text-left ${
                  isLast ? "" : "border-b border-neutral-300"
                }`;

                return (
                  <tr key={license.tool} className="group transition-colors">
                    <td className={`${baseCell} font-medium text-neutral-900`}>
                      {license.tool}
                    </td>
                    <td className={`${baseCell} text-neutral-700`}>
                      {license.category}
                    </td>
                    <td className={baseCell}>
                      {revealed[license.tool] ? (
                        <div className="flex items-center gap-3">
                          <button
                            onClick={() =>
                              handleCopy(license.tool, license.key)
                            }
                            className="text-blue-600 hover:underline text-sm"
                          >
                            {copied[license.tool] ? "Copied!" : <Copy size={16} />}
                          </button>
                          <span className="text-neutral-800 font-mono">
                            {license.key}
                          </span>
                        </div>
                      ) : (
                        <button
                          className="text-blue-600 hover:underline hover:cursor-pointer"
                          onClick={() => handleReveal(license.tool)}
                        >
                          Reveal Key
                        </button>
                      )}
                    </td>
                  </tr>
                );
              })}
            </tbody>
          </table>
        </div>
      )}
    </motion.div>
  );
}
