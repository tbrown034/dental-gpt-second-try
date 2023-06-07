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
    <main className="flex flex-col justify-center min-h-screen gap-10 text-emerald-100 bg-emerald-900 ">
      <div className="flex flex-col items-center gap-4 px-8">
        <h1 className="text-5xl font-extrabold ">Dental GPT</h1>
        <h3 className="font-mono text-xl ">
          An <span className="text-yellow-600">AI-powered</span> chatbox
          designed to answer all your{" "}
          <span className="text-yellow-600">dental questions</span>.
        </h3>
      </div>
      {!isSubmitted && (
        <div className="flex justify-center">
          <form
            onSubmit={handleSubmit}
            className="flex flex-col items-center justify-center gap-2 px-4 text-2xl lg:w-2/3"
          >
            <label>Your Question:</label>
            <textarea
              placeholder="Ask here ..."
              className="w-full p-2 text-black h-28 lg:w-2/3"
              value={question}
              onChange={handleChange}
              onKeyPress={handleKeyPress}
            />
            <button className="px-3 py-2 mt-8 rounded-lg sm:w-1/2 bg-emerald-600">
              Send Question
            </button>
          </form>
        </div>
      )}

      {isSubmitted && (
        <div className="flex flex-col items-center gap-4 py-20 text-2xl">
          <p>
            Your question was:{" "}
            <span className="text-yellow-600">{question}</span>
          </p>
          <p>Dental GPT says:</p>{" "}
          <span className="text-yellow-600">{aiResponse}</span>
          <button
            onClick={handleReset}
            className="px-3 py-2 mt-8 rounded-lg sm:w-1/2 bg-emerald-600"
          >
            Start Over
          </button>
        </div>
      )}
    </main>
  );
}
