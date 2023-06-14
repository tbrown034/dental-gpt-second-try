"use client";
import Link from "next/link.js";
import { motion } from "framer-motion";
import { useState } from "react";
import { getAIResponse } from "./utils/gtpAPI.jsx";

export default function Home() {
  const [question, setQuestion] = useState("");
  const [isSubmitted, setIsSubmitted] = useState(false);
  const [aiResponse, setAIResponse] = useState("");

  const handleChange = (e) => {
    setQuestion(e.target.value);
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    const response = await getAIResponse(question);
    setAIResponse(response);
    setIsSubmitted(true);
  };

  const handleKeyPress = (e) => {
    if (e.key === "Enter" && !e.shiftKey) {
      e.preventDefault();
      handleSubmit(e);
    }
  };

  const handleReset = () => {
    setQuestion("");
    setIsSubmitted(false);
  };

  return (
    <main className="flex flex-col p-6 text-white bg-gradient-to-r from-teal-800 to-sky-800">
      <section className="flex flex-col justify-center min-h-screen gap-14">
        <motion.div
          className="flex flex-col gap-2"
          initial={{ opacity: 0, y: -100 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 2 }}
        >
          <h1 className="text-5xl font-extrabold leading-relaxed tracking-wider text-teal-200 md:text-8xl">
            Dental GPT
          </h1>
          <h3 className="font-mono text-lg text-teal-300 sm:text-2xl">
            An <span className="text-white">AI-powered</span> chatbox designed
            to answer all your <span className="text-white">dental</span>{" "}
            questions
          </h3>
        </motion.div>

        {!isSubmitted && (
          <form onSubmit={handleSubmit} className="flex flex-col text-xl">
            <textarea
              placeholder="Ask your dental question here ..."
              className="w-full h-40 p-4 text-3xl font-semibold text-teal-600 bg-teal-100 rounded-lg shadow-md focus:outline-none focus:ring-2 focus:ring-teal-300"
              value={question}
              onChange={handleChange}
              onKeyPress={handleKeyPress}
            />
            <button className="py-2 mt-8 transition-all duration-200 ease-in-out bg-teal-700 rounded-lg shadow-lg text-teal-50 hover:bg-teal-600 focus:outline-none focus:ring-2 focus:ring-teal-200">
              Send Question
            </button>
          </form>
        )}

        {isSubmitted && (
          <motion.div
            className="flex flex-col gap-4 text-xl"
            initial={{ opacity: 0, y: -100 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 2 }}
          >
            <div className="p-4 text-teal-100 bg-teal-700 rounded-lg shadow-lg">
              <p className="font-bold">You</p>
              <p>{question}</p>
            </div>
            <div className="flex flex-col items-end p-4 bg-teal-600 rounded-lg shadow-lg text-teal-50">
              <p className="font-bold">Dental GPT</p>
              <p>{aiResponse}</p>
            </div>
            <button
              onClick={handleReset}
              className="w-full py-2 mt-8 transition-all duration-200 ease-in-out bg-teal-700 rounded-lg shadow-lg text-teal-50 hover:bg-teal-600 focus:outline-none focus:ring-2 focus:ring-teal-200"
            >
              Ask Another Question
            </button>
          </motion.div>
        )}
      </section>
      <div className="py-2 mt-8 text-xs text-teal-400 border-t-2 border-white">
        <p>
          This website was created by Trevor Brown using a tech stack that
          includes Node.js, Next.js, Tailwind CSS, and the GPT-3.5 but when API
          from Open AI. Thanks for visiting!
        </p>
        <div className="flex justify-center py-4">
          <Link
            className="p-2 mt-8 transition-all duration-200 ease-in-out bg-teal-700 rounded-lg shadow-lg text-teal-50 hover:bg-teal-600 focus:outline-none focus:ring-2 focus:ring-teal-200"
            href="/contact"
          >
            Contact Me
          </Link>
        </div>
      </div>
    </main>
  );
}
