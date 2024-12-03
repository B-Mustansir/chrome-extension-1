import { useState } from 'react';
import './App.css';
import GeminiInCloud from "./components/gemini-in-cloud";
import GeminiOnDevice from './components/gemini-on-device';

function App() {
  const [prompt, setPrompt] = useState('');
  const [temperature, setTemperature] = useState(1);

  const handlePromptChange = (e) => {
    setPrompt(e.target.value);
  };

  const handleTemperatureChange = (e) => {
    setTemperature(e.target.value);
  };

  return (
    <div className="sidebar-container">
      <h1 className="sidebar-title">Content Assistant</h1>

      <div className="input-section">
        <textarea
          id="input-prompt"
          placeholder="Enter prompt here..."
          value={prompt}
          onChange={handlePromptChange}
          className="textarea"
        ></textarea>

        <div className="slider-container">
          <input
            type="range"
            id="temperature"
            min="0"
            max="2"
            step="0.01"
            value={temperature}
            onChange={handleTemperatureChange}
            className="slider"
          />
          <label htmlFor="temperature" className="slider-label">
            Temp: <span>{temperature}</span>
          </label>
        </div>

        <button id="button-prompt" className="primary-btn">
          Generate Content
        </button>
      </div>

      <div className="response-section">
        <GeminiOnDevice />
        <GeminiInCloud />
      </div>
    </div>
  );
}

export default App;
