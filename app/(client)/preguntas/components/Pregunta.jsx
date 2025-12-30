"use client"

import { useState } from "react"
import { motion, AnimatePresence } from "framer-motion"

export default function Pregunta({ question, answer }) {
  const [isOpen, setIsOpen] = useState(false)

  return (
    <motion.div
      className="bg-white rounded-xl shadow-sm hover:shadow-md transition-all duration-300 overflow-hidden"
      initial={{ opacity: 0, y: 20 }}
      animate={{ opacity: 1, y: 0 }}
      transition={{ duration: 0.4 }}
    >
      <div
        className="p-6 cursor-pointer flex justify-between items-start"
        onClick={() => setIsOpen(!isOpen)}
      >
        {/* Pregunta como h3 */}
        <h3 className="font-medium text-lg sm:text-xl text-slate-800 pr-8">
          {question}
        </h3>

        <div
          className={`text-[#b525fe] transition-transform duration-300 ${
            isOpen ? "rotate-180" : ""
          }`}
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
      </div>

      <AnimatePresence>
        {isOpen && (
          <motion.div
            initial={{ height: 0, opacity: 0 }}
            animate={{ height: "auto", opacity: 1 }}
            exit={{ height: 0, opacity: 0 }}
            transition={{ duration: 0.3 }}
          >
            <div className="px-6 pb-6 text-slate-600 border-t border-[#b525fe]/20 pt-4">
              <p>{answer}</p>
            </div>
          </motion.div>
        )}
      </AnimatePresence>
    </motion.div>
  )
}