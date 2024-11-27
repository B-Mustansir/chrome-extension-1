function addButtonToNav() {
  const nav = document.querySelector('nav[aria-live="polite"][role="navigation"].css-175oi2r.r-1awozwy.r-18u37iz.r-knv0ih.r-13awgt0.r-m5k245');

  if (nav) {
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

      button.addEventListener("click", () => {
        alert("Custom button clicked!");
      });

      nav.appendChild(button);
      console.log("Button added to nav");
    }
  } else {
    console.log("Navigation element not found.");
  }
}
// Mutation Code if the code changes
const observer = new MutationObserver((mutationsList, observer) => {
  for (const mutation of mutationsList) {
    if (mutation.type === "childList") {
      addButtonToNav();
    }
  }
});

// observing the document body for DOM changes
observer.observe(document.body, { childList: true, subtree: true });
  