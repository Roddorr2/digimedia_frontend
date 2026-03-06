"use client"

import { useState } from "react"
import { motion, AnimatePresence } from "framer-motion"

export default function Pregunta({ question, answer }) {
  const [isOpen, setIsOpen] = useState(false)

  return (
    <motion.div
      className={[
        "rounded-xl overflow-hidden transition-all duration-300",
        isOpen
          ? "bg-[#f5a000] shadow-md"
          : "bg-white shadow-sm hover:shadow-md",
      ].join(" ")}
      initial={{ opacity: 0, y: 20 }}
      animate={{ opacity: 1, y: 0 }}
      transition={{ duration: 0.4 }}
    >
      <button
        type="button"
        onClick={() => setIsOpen(!isOpen)}
        className="w-full text-left p-6 flex justify-between items-start"
      >
        <h3
          className={[
            "font-medium text-lg sm:text-xl pr-8 transition-colors",
            isOpen ? "text-white" : "text-slate-800",
          ].join(" ")}
        >
          {question}
        </h3>

        <div
          className={[
            "transition-transform duration-300",
            isOpen ? "rotate-180 text-white" : "text-[#b525fe]",
          ].join(" ")}
        >
          <svg
            xmlns="http://www.w3.org/2000/svg"
            width="24"
            height="24"
            viewBox="0 0 24 24"
            fill="none"
            stroke="currentColor"
            strokeWidth="2"
            strokeLinecap="round"
            strokeLinejoin="round"
          >
            <polyline points="6 9 12 15 18 9"></polyline>
          </svg>
        </div>
      </button>

      <AnimatePresence>
        {isOpen && (
          <motion.div
            initial={{ height: 0, opacity: 0 }}
            animate={{ height: "auto", opacity: 1 }}
            exit={{ height: 0, opacity: 0 }}
            transition={{ duration: 0.3 }}
          >
            <div
              className={[
                "px-6 pb-6 pt-4",
                isOpen
                  ? "text-white/95 border-t border-white/30"
                  : "text-slate-600 border-t border-[#b525fe]/20",
              ].join(" ")}
            >
              <p>{answer}</p>
            </div>
          </motion.div>
        )}
      </AnimatePresence>
    </motion.div>
  )
}
