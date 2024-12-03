function addButtonToDiv() {
    const div = document.querySelector('.share-creation-state__footer');

    if (div) {
        if (!document.querySelector('#AI-action-button')) {
            const button = document.createElement("button");
            button.id = "AI-action-button";
            button.innerText = "Write with AI";
            button.style.padding = "8px 15px";
            button.style.fontSize = "14px";
            button.style.color = "#fff";
            button.style.backgroundColor = "#1DA1F2";
            button.style.border = "none";
            button.style.borderRadius = "5px";
            button.style.cursor = "pointer";
            button.style.zIndex = "10000";
            button.style.marginLeft = "10px";

            button.addEventListener("mouseenter", () => {
                button.style.backgroundColor = "#0d8cd2";
            });

            button.addEventListener("mouseleave", () => {
                button.style.backgroundColor = "#1DA1F2";
            });

            // Button click event
            button.addEventListener("click", async () => {
                const editor = document.querySelector('.ql-editor');
                if (editor) {
                    const pTag = editor.querySelector('p');
                    if (pTag) {
                        // Capture the user input from the editor
                        const userInput = pTag.textContent.trim();
                        console.log("User Input:", userInput);

                        // Call Gemini On Device model to generate content
                        try {
                            const params = {
                                systemPrompt: 'You are a professional content writer. Rewrite the given text for a LinkedIn post.',
                                temperature: 1,  // Adjust the temperature as needed
                                topK: 3  // Adjust the value based on your needs
                            };

                            const generatedContent = await runPrompt(userInput, params);
                            console.log("Generated Content:", generatedContent);

                            // Replace the content in the editor with the generated content
                            while (pTag.firstChild) {
                                pTag.removeChild(pTag.firstChild);
                            }
                            const newContent = document.createTextNode(generatedContent);
                            pTag.appendChild(newContent);
                        } catch (e) {
                            console.error("Error generating content:", e);
                            pTag.textContent = "Error generating content.";
                        }
                    } else {
                        console.log("p tag not found!");
                    }
                } else {
                    console.log("Editor was not found!");
                }
            });

            div.appendChild(button);
            console.log("Button added to the div");
        }
    } else {
        console.log("Div not found");
    }
}

// MutationObserver to watch for DOM changes (like dynamic content loading)
const observer = new MutationObserver((mutationsList, observer) => {
    for (const mutation of mutationsList) {
        if (mutation.type === "childList") {
            addButtonToDiv();
        }
    }
});

observer.observe(document.body, { childList: true, subtree: true });
