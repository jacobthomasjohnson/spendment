"use client";

import { useState } from "react";
import { motion } from "framer-motion";
import { PlusCircle } from "lucide-react";
import { ToggleSlider } from "@/components/ToggleSlider"; // uses your standard toggle
import { supabase } from "@/lib/db"; // Adjust path if needed

export default function NewSubscription() {
  const [form, setForm] = useState({
    tool: "",
    amount: "",
    category: "",
    renewsIn: "",
  });

  const [isYearly, setIsYearly] = useState(false);
  const [submitting, setSubmitting] = useState(false);
  const [submitted, setSubmitted] = useState(false);

  const handleChange = (e) => {
    const { name, value } = e.target;
    setForm((prev) => ({ ...prev, [name]: value }));
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    setSubmitting(true);

    const newEntry = {
      ...form,
      active: true,
      isYearly,
    };

    const { error } = await supabase.from("subscriptions").insert([newEntry]);

    setSubmitting(false);

    if (error) {
      console.error("Insert failed:", error);
      return;
    }

    setSubmitted(true);
    setForm({
      tool: "",
      amount: "",
      category: "",
      renewsIn: "",
    });
    setIsYearly(false);

    setTimeout(() => setSubmitted(false), 2000);
  };

  return (
    <motion.div
      initial={{ opacity: 0, y: 40, height: 0 }}
      animate={{ opacity: 1, y: 0, height: "auto" }}
      exit={{ opacity: 0, y: 40, height: 0 }}
    >
      <h1 className="mb-6 font-semibold text-3xl">Add Subscription</h1>

      <form
        onSubmit={handleSubmit}
        className="max-w-md flex flex-col gap-4 text-sm"
      >
        <div>
          <label htmlFor="tool" className="block mb-1 text-neutral-700">
            Tool Name
          </label>
          <input
            required
            name="tool"
            value={form.tool}
            onChange={handleChange}
            className="w-full border border-neutral-300 px-4 py-4 rounded-md focus:outline-none focus:ring-1 focus:ring-neutral-300"
          />
        </div>

        <div>
          <label htmlFor="amount" className="block mb-1 text-neutral-700">
            Amount (e.g. $12/mo)
          </label>
          <input
            required
            name="amount"
            value={form.amount}
            onChange={handleChange}
            className="w-full border border-neutral-300 px-4 py-4 rounded-md focus:outline-none focus:ring-1 focus:ring-neutral-300"
          />
        </div>

        <div>
          <label htmlFor="category" className="block mb-1 text-neutral-700">
            Category
          </label>
          <input
            required
            name="category"
            value={form.category}
            onChange={handleChange}
            className="w-full border border-neutral-300 px-4 py-4 rounded-md focus:outline-none focus:ring-1 focus:ring-neutral-300"
          />
        </div>

        <div className="flex items-center justify-between mb-2">
          <label className="text-neutral-700">Yearly Subscription</label>
          <ToggleSlider
            checked={isYearly}
            onToggle={(val) => setIsYearly(val)}
          />
        </div>

        <div>
          <label htmlFor="renewsIn" className="block mb-1 text-neutral-700">
            {isYearly ? "Renewal Date" : "Renewal Day (Monthly)"}
          </label>
          <input
            required
            name="renewsIn"
            type={isYearly ? "date" : "number"}
            min={isYearly ? undefined : 1}
            max={isYearly ? undefined : 31}
            value={form.renewsIn}
            onChange={handleChange}
            className="w-full border border-neutral-300 px-4 py-4 rounded-md focus:outline-none focus:ring-1 focus:ring-neutral-300"
          />
        </div>

        <button
          type="submit"
          disabled={submitting}
          className={`flex items-center justify-center gap-2 text-white text-sm px-4 py-3 rounded-md transition-all duration-200 ${
            submitted
              ? "bg-green-600"
              : submitting
              ? "bg-primary/60 cursor-not-allowed"
              : "bg-primary hover:bg-primary-light"
          }`}
        >
          <PlusCircle size={16} />
          {submitted ? "Added!" : submitting ? "Saving..." : "Add Subscription"}
        </button>
      </form>
    </motion.div>
  );
}
