import { motion, AnimatePresence } from "framer-motion";

export function Card({ title, monthly, yearly, text, showActive, isYearly }) {
  return (
    <div className="flex gap-2 p-8 w-full border border-neutral-400 rounded-lg transition-all duration-200 group hover:border-primary hover:cursor-pointer hover:px-10 overflow-hidden">
      <div className="flex flex-col">
        {title}
        <motion.div
          key={isYearly ? "yearly" : "monthly"}
          initial={{ opacity: 0, y: 10, filter: "blur(12px)" }}
          animate={{ opacity: 1, y: 0, filter: "blur(0px)" }}
          exit={{ opacity: 0, y: -10, filter: "blur(12px)" }}
          transition={{ duration: 0.2, ease: [0.33, 1, 0.68, 1] }} // easeOutBack
          className="text-4xl font-semibold"
        >
          {isYearly ? yearly : monthly}
        </motion.div>
      </div>
      <div className="grow flex items-center justify-end">
        <AnimatePresence>
          {showActive && (
            <motion.div
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              exit={{ opacity: 0 }}
              className="text-sm text-neutral-600"
            >
              {text}
            </motion.div>
          )}
        </AnimatePresence>
      </div>
    </div>
  );
}
