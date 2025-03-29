function copyToClipboard() {
  navigator.clipboard
    .writeText(selectedBadgesTextarea.value)
    .then(() => {
      console.log("Content copied to clipboard!");
    })
    .catch((error) => {
      alert("Failed to copy content: " + error);
    });
}

const copyButton = document.getElementById("copyButton");
copyButton.addEventListener("click", copyToClipboard);
