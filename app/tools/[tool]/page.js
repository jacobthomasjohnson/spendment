"use client";

import { useParams } from "next/navigation";
import { useEffect } from "react";
import { motion } from "framer-motion";

export default function ToolPage() {
  const params = useParams();
  useEffect(() => {
    console.log(params);
  }, []);

  return (
    <motion.div
      initial={{ opacity: 0, y: 40 }}
      animate={{ opacity: 1, y: 0 }}
      exit={{ opacity: 0, y: 40 }}
    >
      <>You are viewing {params.tool}</>
    </motion.div>
  );
}
