"use client";
import { useState } from "react";
import { getAIResponse } from "./utils/gtpAPI.jsx";

export default function Home() {
  const [question, setQuestion] = useState("");
  const [isSubmitted, setIsSubmitted] = useState(false);
  const [aiResponse, setAIResponse] = useState(""); // Add a new state variable for the AI response

  const handleChange = (e) => {
    setQuestion(e.target.value);
    console.log("target", e.target.value);
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    console.log("submitted question", question);
    const response = await getAIResponse(question); // Get the AI response
    setAIResponse(response); // Set the AI response
    setIsSubmitted(true); // Set isSubmitted to true when the form is submitted
  };

  const handleKeyPress = (e) => {
    if (e.key === "Enter" && !e.shiftKey) {
      // Check if the Enter key was pressed without the Shift key
      e.preventDefault(); // Prevent the default behavior (creating a new line in the textarea)
      handleSubmit(e); // Submit the form
    }
  };

  const handleReset = () => {
    setQuestion("");
    setIsSubmitted(false);
  };

  return (
    <main className="flex flex-col min-h-screen px-6 text-white bg-teal-900 ">
      <section className="flex flex-col justify-center min-h-screen text-white bg-teal-900 gap-14 ">
        <div className="flex flex-col gap-2 ">
          <h1 className="text-5xl font-extrabold ">Dental GPT</h1>
          <h3 className="font-mono text-xl ">
            An <span className="text-teal-200">AI-powered</span> chatbox
            designed to answer all your{" "}
            <span className="text-teal-200">dental questions</span>
          </h3>
        </div>
        {!isSubmitted && (
          <form
            onSubmit={handleSubmit}
            className="flex flex-col justify-center text-2xl"
          >
            <textarea
              placeholder="Ask your dental question here ..."
              className="w-full h-40 p-2 text-teal-800 bg-teal-50"
              value={question}
              onChange={handleChange}
              onKeyPress={handleKeyPress}
            />
            <button className="py-2 mt-8 bg-teal-700 rounded-lg hover:bg-teal-50 hover:text-teal-700">
              Send Question
            </button>
          </form>
        )}

        {isSubmitted && (
          <div className="flex flex-col gap-4 text-2xl">
            <div className="p-2 bg-teal-700 rounded-lg">
              <p className="font-bold text-teal-50">You</p>
              <p className="text-white">{question}</p>
            </div>
            <div className="flex flex-col items-end p-2 bg-teal-500 rounded-lg">
              <p className="font-bold text-teal-50">Dental GPT</p>
              <p className="text-white">{aiResponse}</p>
            </div>
            <button
              onClick={handleReset}
              className="w-full py-2 mt-8 bg-teal-700 rounded-lg hover:bg-teal-50 hover:text-teal-700"
            >
              Ask Another Question
            </button>
          </div>
        )}
      </section>
      <div>
        <p className="py-2 text-sm border-t-2 border-white">
          This website was created by Trevor Brown using a tech stack that
          includes Node.js, Next.js., tailwind and Open AI's Chat GPT-3 API.
          Thanks for visiting!
        </p>
      </div>
    </main>
  );
}
