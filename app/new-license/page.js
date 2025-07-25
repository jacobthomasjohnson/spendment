"use client";

import { useState } from "react";
import { motion } from "framer-motion";
import { PlusCircle } from "lucide-react";
import { supabase } from "@/lib/db";

export default function NewLicense() {
  const [form, setForm] = useState({
    tool: "",
    key: "",
    category: "",
  });

  const [submitting, setSubmitting] = useState(false);
  const [submitted, setSubmitted] = useState(false);

  const handleChange = (e) => {
    const { name, value } = e.target;
    setForm((prev) => ({ ...prev, [name]: value }));
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    setSubmitting(true);

    const { error } = await supabase.from("licenses").insert([form]);

    setSubmitting(false);

    if (error) {
      console.error("Insert failed:", error);
      return;
    }

    setSubmitted(true);
    setForm({
      tool: "",
      key: "",
      category: "",
    });

    setTimeout(() => setSubmitted(false), 2000);
  };

  return (
    <motion.div
      initial={{ opacity: 0, y: 40, height: 0 }}
      animate={{ opacity: 1, y: 0, height: "auto" }}
      exit={{ opacity: 0, y: 40, height: 0 }}
    >
      <h1 className="mb-6 font-semibold text-3xl">Add License</h1>

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
          <label htmlFor="key" className="block mb-1 text-neutral-700">
            License Key
          </label>
          <input
            required
            name="key"
            value={form.key}
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
          {submitted ? "Added!" : submitting ? "Saving..." : "Add License"}
        </button>
      </form>
    </motion.div>
  );
}
