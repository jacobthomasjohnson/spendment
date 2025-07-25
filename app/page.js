"use client";

import { useState } from "react";
import { ToggleSlider } from "@/components/ToggleSlider";
import { Card } from "@/components/Card";
import { motion, AnimatePresence } from "framer-motion";
import Link from "next/link";

export default function Home() {
  const headers = ["Tool", "Amount", "Renews In"];

  const rows = [
    { tool: "Notion", amount: "$8/mo", renewsIn: "5 Days", status: "red" },
    { tool: "Figma", amount: "$15/mo", renewsIn: "12 Days", status: "amber" },
    { tool: "Dropbox", amount: "$12/mo", renewsIn: "18 Days", status: "green" },
  ];

  const [showActive, setShowActive] = useState(false);
  const [isYearly, setIsYearly] = useState(false);

  const toggleActive = () => {
    setShowActive(!showActive);
  };

  return (
    <motion.div
      initial={{ opacity: 0, y: 40 }}
      animate={{ opacity: 1, y: 0 }}
      exit={{ opacity: 0, y: 40 }}
    >
      <h1 className="mb-6 font-semibold text-3xl">Spending Overview</h1>
      <div className="flex gap-2 max-w-6xl">
        <Card
          title="All Subscriptions"
          monthly="$144/mo"
          yearly="$1728/yr"
          text="12 Active"
          showActive={showActive}
          isYearly={isYearly}
        />
        <Card
          title="Entertainment"
          monthly="$44/mo"
          yearly="$528/yr"
          text="3 Active"
          showActive={showActive}
          isYearly={isYearly}
        />
        <Card
          title="Productivity"
          monthly="$100/mo"
          yearly="$1200/yr"
          text="9 Active"
          showActive={showActive}
          isYearly={isYearly}
        />
      </div>

      <div className="my-6">
        <div className="flex flex-col gap-2 w-full max-w-6xl">
          <div className="flex justify-between w-full items-center">
            Monthly/Yearly
            <ToggleSlider
              defaultChecked={false}
              onToggle={() => setIsYearly((prev) => !prev)}
            />
          </div>
          <div className="flex justify-between w-full items-center">
            Show Active
            <ToggleSlider defaultChecked={false} onToggle={toggleActive} />
          </div>
        </div>
        <h1 className="mb-6 mt-16 font-semibold text-3xl">Upcoming Renewals</h1>

        <div className="inline-block w-full max-w-6xl text-sm overflow-hidden rounded-lg border border-neutral-400">
          <table className="min-w-full table-auto">
            <thead className="bg-gray-[#FCFCFC]">
              <tr>
                {headers.map((header, i) => (
                  <th
                    key={i}
                    className="px-5 py-3 text-sm border-b border-neutral-400 text-neutral-950 font-semibold text-left"
                  >
                    {header}
                  </th>
                ))}
              </tr>
            </thead>
            <tbody>
              {rows.map((row, i) => {
                const isLast = i === rows.length - 1;
                const cellClass = `px-5 py-3 transition-all duration-75 ${
                  isLast ? "" : "border-b border-neutral-400"
                } text-left text-neutral-900`;

                return (
                  <tr
                    key={i}
                    className="hover:bg-[#FFFFFF] hover:cursor-pointer transition-all duration-75 hover:text-primary-light group"
                  >
                    <td
                      className={`${cellClass} w-1/3 group-hover:font-semibold`}
                    >
                      {row.tool}
                    </td>
                    <td
                      className={`${cellClass} w-1/3 group-hover:font-semibold`}
                    >
                      {row.amount}
                    </td>
                    <td
                      className={`${cellClass} w-full group-hover:font-semibold flex items-center justify-between`}
                    >
                      {row.renewsIn}
                      <span
                        className={`ml-2 w-1 h-1 rounded-full ${
                          row.status === "red"
                            ? "bg-red-500"
                            : row.status === "amber"
                            ? "bg-amber-500"
                            : "bg-green-400"
                        }`}
                      />
                    </td>
                  </tr>
                );
              })}
            </tbody>
          </table>
        </div>
        <div className="mt-4">
          <Link className="underline hover:no-underline" href="/subscriptions">
            View All Subscriptions
          </Link>
        </div>
        <h1 className="mb-6 mt-16 font-semibold text-3xl">View by Category</h1>
        <div className="flex gap-2">
          <Link href="/subscriptions/productivity">
            <div className="p-4  text-primary rounded-md hover:bg-primary hover:text-white border border-primary transition-all duration-200">
              Productivity
            </div>
          </Link>
          <Link href="/subscriptions/entertainment">
            <div className="p-4 text-purple-900 rounded-md hover:bg-purple-900 border border-purple-900 transition-all duration-200 hover:text-white">
              Entertainment
            </div>
          </Link>
        </div>
      </div>
    </motion.div>
  );
}
