import React, { useState, useEffect } from "react";
import { GoogleGenerativeAI, HarmBlockThreshold, HarmCategory } from "@google/generative-ai";
import "./index.css";

const GeminiInCloud = () => {
  const [inputPrompt, setInputPrompt] = useState("");
  const [temperature, setTemperature] = useState(1);
  const [response, setResponse] = useState("");
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState("");
  const apiKey = "...";

  const initModel = (generationConfig) => {
    const safetySettings = [
      {
        category: HarmCategory.HARM_CATEGORY_DANGEROUS_CONTENT,
        threshold: HarmBlockThreshold.BLOCK_NONE
      }
    ];
    const genAI = new GoogleGenerativeAI(apiKey);
    return genAI.getGenerativeModel({
      model: "gemini-1.5-flash",
      safetySettings,
      generationConfig
    });
  };

  const handleRunPrompt = async () => {
    if (!inputPrompt.trim()) return;

    setLoading(true);
    setError("");
    setResponse("");

    const generationConfig = { temperature };
    const model = initModel(generationConfig);

    try {
      const result = await model.generateContent(inputPrompt);
      const resultResponse = await result.response;
      setResponse(resultResponse.text());
    } catch (e) {
      console.error("Prompt failed:", e);
      setError("An error occurred while generating the response.");
    } finally {
      setLoading(false);
    }
  };

  return (
    <div>
      <h1>Gemini In The Cloud</h1>
      <div className="gemini-in-cloud">
        <textarea id="input-prompt" placeholder='Type something, e.g. "Write a Twitter Post about Chrome Extensions"' value={inputPrompt} onChange={(e) => setInputPrompt(e.target.value)} cols="30" rows="5"></textarea>
        <div>
          <input type="range" id="temperature" name="temperature" min="0" max="2" step="0.01" value={temperature} onChange={(e) => setTemperature(Number(e.target.value))} />
          <label htmlFor="temperature"> Temperature: <span id="label-temperature">{temperature}</span> </label>
        </div>
        <div className="card">
          <button id="button-prompt" className="primary" disabled={!inputPrompt.trim()} onClick={handleRunPrompt} >
            Run
          </button>
        </div>
        {loading && (
          <div id="loading" className="text">
            <span className="blink">...</span>
          </div>
        )}
        {response && (
          <div id="response" className="text">
            {response.split(/\r?\n/).map((paragraph, index) => (
              <React.Fragment key={index}>
                {paragraph}
                <br />
              </React.Fragment>
            ))}
          </div>
        )}
        {error && (
          <div id="error" className="text">
            {error}
          </div>
        )}
      </div>
    </div>
  );
};

export default GeminiInCloud;