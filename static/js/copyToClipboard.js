function copyToClipboard() {
  const selectedBadgesTextarea = document.getElementById("selectedBadges");
  if (selectedBadgesTextarea.value) {
    navigator.clipboard
      .writeText(selectedBadgesTextarea.value)
      .then(() => {
        console.log("Content copied to clipboard!");
        showModal();
      })
      .catch((error) => {
        alert("Failed to copy content: " + error);
      });
  }
}

function showModal() {
  const modal = document.getElementById("popupModal");
  modal.style.display = "block";

  const closeModalButton = document.getElementById("closeModal");
  closeModalButton.addEventListener("click", () => {
    modal.style.display = "none";
  });

  setTimeout(() => {
    modal.style.display = "none";
  }, 3000);
}

const copyButton = document.getElementById("copyButton");
copyButton.addEventListener("click", copyToClipboard);
