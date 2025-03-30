// Event listener for cell clicks
document.querySelectorAll("#badge-table td").forEach((cell) => {
  cell.addEventListener("click", function () {
    const textarea = document.getElementById("customizedBadges");
    const img = this.querySelector("img");
    const imgUrl = img.src;
    const altText = img.alt;

    // Toggle the highlight on the clicked cell
    this.classList.toggle("highlight");

    const formattedUrl = `![${altText}](${imgUrl})`;

    // Add or remove the URL from the textarea based on the highlight
    if (this.classList.contains("highlight")) {
      if (!textarea.value.includes(formattedUrl)) {
        textarea.value += formattedUrl + "\n";
      }
    } else {
      textarea.value = textarea.value
        .split("\n")
        .filter((url) => url !== formattedUrl)
        .join("\n");
    }

    // Check if there's content in the textarea
    checkTextareaContent();
  });
});

// Function to check textarea content and display the button
function checkTextareaContent() {
  const textarea = document.getElementById("customizedBadges");

  if (textarea.value.trim() !== "") {
    document.getElementById("copyButton").style.display = "inline-block";
  } else {
    document.getElementById("copyButton").style.display = "none";
  }
}