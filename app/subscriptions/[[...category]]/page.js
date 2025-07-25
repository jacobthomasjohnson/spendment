"use client";

import { useState, useEffect } from "react";
import { useRouter, useParams } from "next/navigation";
import { ToggleSlider } from "@/components/ToggleSlider";
import { AnimatePresence, motion } from "framer-motion";
import { subscriptionsHeaders } from "@/data/subscriptionsHeaders";
import Link from "next/link";

import { supabase } from "@/lib/db";

export default function Subscriptions() {
  const router = useRouter();
  const params = useParams();
  const category = Array.isArray(params.category) ? params.category[0] : null;

  const [sortKey, setSortKey] = useState(null);
  const [sortDirection, setSortDirection] = useState("asc");
  const [subscriptionsData, setSubscriptionsData] = useState([]);
  const subscriptionsKeys = ["tool", "amount", "category", null, "date"];
  const [showInactive, setShowInactive] = useState(false);

  const getSubscriptions = async () => {
    const { data, error } = await supabase.from("subscriptions").select();
    await supabase.from("subscriptions").select("*");
    setSubscriptionsData(data);
  };

  useEffect(() => {
    getSubscriptions();
  }, []);

  const filteredItems = category
    ? subscriptionsData.filter(
        (item) => item.category.toLowerCase() === category.toLowerCase()
      )
    : subscriptionsData;

  const activeRows = filteredItems.filter((row) => row.active === true);
  const inactiveRows = filteredItems.filter((row) => row.active === false);

  const visibleRows = showInactive
    ? filteredItems
    : filteredItems.filter((row) => row.active === true);

  const getStatusDotColor = (renewsIn) => {
    if (renewsIn === "-" || isNaN(parseInt(renewsIn))) return "bg-gray-300";
    const days = parseInt(renewsIn);
    if (days <= 7) return "bg-red-400";
    if (days <= 14) return "bg-orange-400";
    if (days <= 21) return "bg-blue-400";
    return "bg-green-400";
  };

  const sortedActiveRows = [...activeRows].sort((a, b) => {
    if (!sortKey) return 0;

    let aValue = a[sortKey];
    let bValue = b[sortKey];

    if (sortKey === "amount") {
      aValue = parseFloat(aValue.replace(/[^0-9.]/g, ""));
      bValue = parseFloat(bValue.replace(/[^0-9.]/g, ""));
    }

    if (sortKey === "date") {
      aValue = parseInt(aValue);
      bValue = parseInt(bValue);
    }

    if (aValue < bValue) return sortDirection === "asc" ? -1 : 1;
    if (aValue > bValue) return sortDirection === "asc" ? 1 : -1;
    return 0;
  });

  useEffect(() => {
    console.log(`Router is ${router.query}`);
  }, [router.query]);

  const doCancelSubscription = async (tool) => {
    const { error } = await supabase
      .from("subscriptions")
      .update({ active: false })
      .match({ tool });

    if (error) {
      console.error("Update to inactive failed:", error);
    } else {
      console.log(`Subscription for ${tool} set to inactive.`);
      await getSubscriptions(); // refresh data
    }
  };

  return (
    <motion.div
      initial={{ opacity: 0, y: 40, height: 0 }}
      animate={{ opacity: 1, y: 0, height: "auto" }}
      exit={{ opacity: 0, y: 40, height: 0 }}
    >
      <h1 className="font-semibold text-3xl">Your Active Subscriptions</h1>
      <div className="mt-0">
        <div className="inline-block w-full max-w-6xl text-sm overflow-hidden rounded-lg border border-neutral-300 mt-8">
          <table className="min-w-full table-fixed">
            <thead className="bg-[#FCFCFC] text-neutral-400">
              <tr>
                {subscriptionsHeaders.map((header, i) => {
                  const key = subscriptionsKeys[i];
                  const isSortable = key !== null;

                  return (
                    <th
                      key={i}
                      onClick={() => {
                        if (!isSortable) return;
                        if (sortKey === key) {
                          setSortDirection((prev) =>
                            prev === "asc" ? "desc" : "asc"
                          );
                        } else {
                          setSortKey(key);
                          setSortDirection("asc");
                        }
                      }}
                      className={`w-1/5 px-5 py-3 border-b border-neutral-300 font-medium text-left text-black select-none ${
                        isSortable ? "cursor-pointer hover:underline" : ""
                      }`}
                    >
                      {header}
                      {sortKey === key
                        ? sortDirection === "asc"
                          ? " ↑"
                          : " ↓"
                        : ""}
                    </th>
                  );
                })}
              </tr>
            </thead>
            <tbody>
              {sortedActiveRows.map((row) => {
                const baseCell =
                  "w-1/5 px-5 py-3 whitespace-nowrap border-b border-neutral-300 text-left text-neutral-900 truncate";
                return (
                  <tr
                    key={row.tool}
                    className="group hover:bg-[#FBFBFB] transition-colors"
                  >
                    <td className={`${baseCell} font-medium`}>
                      <Link
                        className="hover:underline"
                        href={`/tools/${row.tool
                          .toLowerCase()
                          .replace(/\s+/g, "-")}`}
                      >
                        {row.tool}
                      </Link>
                    </td>
                    <td className={baseCell}>{row.amount}</td>
                    <td className={baseCell}>
                      <Link
                        className="hover:underline"
                        href={`/subscriptions/${row.category.toLowerCase()}`}
                      >
                        {row.category}
                      </Link>
                    </td>
                    <td className={baseCell}>
                      <span
                        className="text-red-500 font-medium hover:underline hover:cursor-pointer"
                        onClick={() => doCancelSubscription(row.tool)}
                      >
                        Cancel
                      </span>
                    </td>
                    <td
                      className={`${baseCell} flex w-full items-center justify-between`}
                    >
                      {row.date} day(s)
                      <span
                        className={`ml-2 w-2 h-2 rounded-full ${getStatusDotColor(
                          row.date
                        )}`}
                      />
                    </td>
                  </tr>
                );
              })}
            </tbody>
          </table>
        </div>
      </div>
      <div className="flex flex-col gap-2 w-full max-w-6xl my-6">
        <div className="flex justify-between w-full items-center">
          Show Inactive Subscriptions
          <ToggleSlider
            defaultChecked={false}
            onToggle={() => setShowInactive((prev) => !prev)}
          />
        </div>
      </div>
      <AnimatePresence>
        {showInactive && (
          <motion.div
            layout
            initial={{ height: 0 }}
            animate={{ height: "auto" }}
            exit={{ height: 0 }}
            transition={{ duration: 0.2, ease: "easeInOut" }}
            className="overflow-hidden"
          >
            <div className="inline-block w-full max-w-6xl text-sm overflow-hidden rounded-lg border border-neutral-300">
              <table className="min-w-full table-fixed">
                <thead className="bg-[#FAFAFA] text-neutral-400">
                  <tr>
                    {subscriptionsHeaders.map((header, i) => (
                      <th
                        key={i}
                        className="w-1/5 px-5 py-3 text-sm border-b text-black border-neutral-300 font-medium text-left whitespace-nowrap"
                      >
                        {header}
                      </th>
                    ))}
                  </tr>
                </thead>
                <tbody>
                  {inactiveRows
                    .filter((r) => !r.active) // Only show inactive subscriptions
                    .map((row) => {
                      const baseCell =
                        "w-1/5 px-5 py-3 whitespace-nowrap border-b border-neutral-300 text-left text-neutral-400 truncate";
                      return (
                        <tr key={row.tool} className="bg-white">
                          <td className={`${baseCell} font-light`}>
                            {row.tool}
                          </td>
                          <td className={baseCell}>{row.amount}</td>
                          <td className={baseCell}>{row.category}</td>
                          <td className={baseCell}>Inactive</td>
                          <td className={baseCell}>{row.date}</td>
                        </tr>
                      );
                    })}
                </tbody>
              </table>
            </div>
          </motion.div>
        )}
      </AnimatePresence>
    </motion.div>
  );
}
