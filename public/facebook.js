function facebook() {
    const div = document.querySelector('.xqmpxtq.x13fuv20.x178xt8z.x78zum5.x1a02dak.x1vqgdyp.x1l1ennw.x14vqqas.x6ikm8r.x10wlt62.x1y1aw1k.xh8yej3');

    if (div) {
        if(!div.querySelector('#AI-action-button')) {
            const button = document.createElement('button');
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

            button.addEventListener("click", () => {
                chrome.runtime.sendMessage({ action: "open_sidebar" }, (response) => {
                    if (chrome.runtime.lastError) {
                        console.error("Error communicating with the extension:", chrome.runtime.lastError);
                    } else {
                        console.log("Sidebar action response:", response);
                    }
                });
            });

            div.appendChild(button);
            console.log("Button was added!");
        }
    }else {
        console.log("Can't find the div");
    }
}

const observer = new MutationObserver((mutationlist, observer) => {
    for(const mutation of mutationlist) {
        if ( mutation.type === 'childList') {
            facebook();
        }
    }
});

observer.observe(document.body, {childList:true, subtree:true});