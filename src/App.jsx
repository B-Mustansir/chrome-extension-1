import { useState, useEffect, React } from 'react';
import reactLogo from './assets/react.svg';
import viteLogo from '/vite.svg';
import './App.css';
import DOMPurify from 'dompurify';
import { marked } from 'marked';
import GeminiInCloud from "./components/gemini-in-cloud";
import GeminiOnDevice from './components/gemini-on-device';

function App() {
  const [count, setCount] = useState(0);

  return (
    <>
      <div>
        <a href="https://vite.dev" target="_blank">
          <img src={viteLogo} className="logo" alt="Vite logo" />
        </a>
        <a href="https://react.dev" target="_blank">
          <img src={reactLogo} className="logo react" alt="React logo" />
        </a>
      </div>
      <h1>Vite + React</h1>
      <div className="card">
        <button onClick={() => setCount((count) => count + 1)}>
          count is {count}
        </button>
        <p>
          Edit <code>src/App.jsx</code> and save to test HMR
        </p>
      </div>
      <GeminiOnDevice />
      <GeminiInCloud />
      {/* <h1>Gemini In The Cloud</h1>
      <textarea id="input-prompt" placeholder='Type something, e.g. "Write a Twitter Post about Chrome Extensions"' cols="30" rows="5"></textarea>
      <div>
        <input type="range" id="temperature" name="temperature" min="0" max="2" step="0.01" defaultValue="1" />
        <label htmlFor="temperature">Temperature: <span id="label-temperature">1</span></label>
      </div>
      <button id="button-prompt" className="primary" disabled>Run</button>
      <div id="response" className="text" hidden></div>
      <div id="loading" className="text" hidden><span className="blink">...</span></div>
      <div id="error" className="text" hidden></div> */}
    </>
  )
}

export default App;
