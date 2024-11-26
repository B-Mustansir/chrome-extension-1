import React, { useEffect } from 'react';
import DOMPurify from 'dompurify';
import { marked } from 'marked';
import './index.css';

function GeminiOnDevice() {
    useEffect(() => {
        const inputPrompt = document.getElementById('gemini-input-prompt');
        const buttonPrompt = document.getElementById('gemini-button-prompt');
        const buttonReset = document.getElementById('gemini-button-reset');
        const elementResponse = document.getElementById('gemini-response');
        const elementLoading = document.getElementById('gemini-loading');
        const elementError = document.getElementById('gemini-error');
        const sliderTemperature = document.getElementById('gemini-temperature');
        const sliderTopK = document.getElementById('gemini-top-k');
        const labelTemperature = document.getElementById('gemini-label-temperature');
        const labelTopK = document.getElementById('gemini-label-top-k');

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
                    topK: sliderTopK.value,
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
        <div>
            <h1>Gemini On Device</h1>
            <div id="gemini-on-device">
                <textarea id="gemini-input-prompt" placeholder='Type something, e.g. "Write a Twitter Post about SpaceX"' cols="30" rows="5" ></textarea>
                <div>
                    <input type="range" id="gemini-temperature" min="0" max="2" step="0.01" />
                    <label> Temperature: <span id="gemini-label-temperature"></span> </label>
                </div>
                <div>
                    <input type="range" id="gemini-top-k" min="1" max="8" step="1" />
                    <label> Top-k: <span id="gemini-label-top-k"></span> </label>
                </div>
                <div className="card">
                    <button id="gemini-button-prompt" disabled>Run</button>
                    <button id="gemini-button-reset" disabled>Reset</button>
                </div>
                <div id="gemini-response" hidden></div>
                <div id="gemini-loading" hidden>
                    <span className="blink">...</span>
                </div>
                <div id="gemini-error" hidden></div>
            </div>
        </div >
    );
}

export default GeminiOnDevice;
