function addbuttonToDiv() {
    const div = document.querySelector('share-creation-state__footer');

    if(div) {
        if(!document.querySelector('#AI-action-button')) {
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
              alert("Custom button clicked!");
            });
        
            nav.appendChild(button);
            console.log("Button added to nav");
        }
    } else {
        console.log("Div not found");
    }
}

//Mutation for dynamic
const observer = new MutationObserver((mutationsList, observer) => {
    for (const mutation of mutationsList) {
        if(mutation.type === "chlidList") {
            addbuttonToDiv();
        }
    }
});

observer.observe(document.body, { childList: true, subtree: true});