import { useState, useEffect } from 'react';
import reactLogo from './assets/react.svg';
import viteLogo from '/vite.svg';
import './App.css';
import DOMPurify from 'dompurify';
import { marked } from 'marked';

function App() {
  const [count, setCount] = useState(0);

  useEffect(() => {
    const inputPrompt = document.getElementById('input-prompt');
    const buttonPrompt = document.getElementById('button-prompt');
    const buttonReset = document.getElementById('button-reset');
    const elementResponse = document.getElementById('response');
    const elementLoading = document.getElementById('loading');
    const elementError = document.getElementById('error');
    const sliderTemperature = document.getElementById('temperature');
    const sliderTopK = document.getElementById('top-k');
    const labelTemperature = document.getElementById('label-temperature');
    const labelTopK = document.getElementById('label-top-k');

    let session;

    async function runPrompt(prompt, params) {
      try {
        if (!session) {
          session = await chrome.aiOriginTrial.languageModel.create(params);
        }
        return session.prompt(prompt);
      } catch (e) {
        console.error('Prompt failed', e);
        reset();
        throw e;
      }
    }

    async function reset() {
      if (session) {
        session.destroy();
      }
      session = null;
    }

    async function initDefaults() {
      if (!('aiOriginTrial' in chrome)) {
        showResponse('Error: chrome.aiOriginTrial not supported in this browser');
        return;
      }
      const defaults = await chrome.aiOriginTrial.languageModel.capabilities();
      if (defaults.available !== 'readily') {
        showResponse(`Model not yet available (current state: "${defaults.available}")`);
        return;
      }
      sliderTemperature.value = defaults.defaultTemperature;
      sliderTopK.value = Math.min(defaults.defaultTopK, 3);
      labelTopK.textContent = sliderTopK.value;
      sliderTopK.max = defaults.maxTopK;
      labelTemperature.textContent = defaults.defaultTemperature;
    }

    initDefaults();

    buttonReset.addEventListener('click', () => {
      hide(elementLoading);
      hide(elementError);
      hide(elementResponse);
      reset();
      buttonReset.setAttribute('disabled', '');
    });

    sliderTemperature.addEventListener('input', (event) => {
      labelTemperature.textContent = event.target.value;
      reset();
    });

    sliderTopK.addEventListener('input', (event) => {
      labelTopK.textContent = event.target.value;
      reset();
    });

    inputPrompt.addEventListener('input', () => {
      buttonPrompt.disabled = !inputPrompt.value.trim();
    });

    buttonPrompt.addEventListener('click', async () => {
      const prompt = inputPrompt.value.trim();
      showLoading();
      try {
        const params = {
          systemPrompt: 'You are a helpful and friendly assistant.',
          temperature: sliderTemperature.value,
          topK: sliderTopK.value
        };
        const response = await runPrompt(prompt, params);
        showResponse(response);
      } catch (e) {
        showError(e);
      }
    });

    function showLoading() {
      buttonReset.removeAttribute('disabled');
      hide(elementResponse);
      hide(elementError);
      show(elementLoading);
    }

    function showResponse(response) {
      hide(elementLoading);
      show(elementResponse);
      elementResponse.innerHTML = DOMPurify.sanitize(marked.parse(response));
    }

    function showError(error) {
      show(elementError);
      hide(elementResponse);
      hide(elementLoading);
      elementError.textContent = error;
    }

    function show(element) {
      element.removeAttribute('hidden');
    }

    function hide(element) {
      element.setAttribute('hidden', '');
    }
  }, []);

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
      <h1>Gemini On Device</h1>
      <div id="gemini-on-device">
        <textarea id="input-prompt" placeholder='Type something, e.g. "Write a Twitter Post about Chrome Extensions"' cols="30" rows="5"></textarea>
        <div>
          <input type="range" id="temperature" name="temperature" min="0" max="2" step="0.01" />
          <label htmlFor="temperature">Temperature: <span id="label-temperature"></span></label>
        </div>
        <div>
          <input type="range" id="top-k" name="top-k" min="1" max="8" step="1" />
          <label htmlFor="top-k">Top-k: <span id="label-top-k"></span></label>
        </div>
        <div className="card">
          <button id="button-prompt" className="primary" disabled>Run</button>
          <button id="button-reset" className="secondary" disabled>Reset</button>
        </div>
        <div id="response" className="text" hidden></div>
        <div id="loading" className="text" hidden><span className="blink">...</span></div>
        <div id="error" className="text" hidden></div>
      </div>
      <h1>Gemini In The Cloud</h1>
      <textarea id="input-prompt" placeholder='Type something, e.g. "Write a Twitter Post about Chrome Extensions"' cols="30" rows="5"></textarea>
      <div>
        <input type="range" id="temperature" name="temperature" min="0" max="2" step="0.01" defaultValue="1" />
        <label htmlFor="temperature">Temperature: <span id="label-temperature">1</span></label>
      </div>
      <button id="button-prompt" className="primary" disabled>Run</button>
      <div id="response" className="text" hidden></div>
      <div id="loading" className="text" hidden><span className="blink">...</span></div>
      <div id="error" className="text" hidden></div>
    </>
  )
}

export default App;
