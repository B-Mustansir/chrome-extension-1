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

            // Button click event to replace <p> tag content
            button.addEventListener("click", () => {
                const editor = document.querySelector('.ql-editor');

                if(editor) {
                    const pTag = editor.querySelector('p');

                    if(pTag) {
                        while(pTag.firstChild) {
                            pTag.removeChild(pTag.firstChild);
                        }

                        const newcontent = document.createTextNode("It works well");
                        pTag.appendChild(newcontent);
                    }
                }else {
                    console.log("editor was not found!");
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
