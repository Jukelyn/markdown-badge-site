function checkTextareaContent() {
  const textarea = document.getElementById("selectedBadges");

  if (textarea.value.trim() == "") {
    console.log("The textarea is empty");
    document.getElementById("copyButton").style.display = "none";
    document.getElementById("checkButton").style.display = "none";
  } else {
    document.getElementById("copyButton").style.display = "inline-block";
    document.getElementById("checkButton").style.display = "inline-block";
  }
}

let previousContent = "";
setInterval(() => {
  const textarea = document.getElementById("selectedBadges");
  const currentContent = textarea.value.trim();

  // Check if the content has changed
  if (currentContent !== previousContent) {
    console.log("Content has changed:", currentContent);
    previousContent = currentContent;
    checkTextareaContent();
  }
}, 200); // Polling every 200ms

document
  .getElementById("checkButton")
  .addEventListener("click", async function () {
    const textarea = document.getElementById("selectedBadges");
    const data = textarea.value.trim();

    if (data) {
      console.log("Sending POST request with data:", data);

      fetch("/customize", {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify({ data: data }),
      })
        .then((response) => {
          if (response.ok) {
            console.log("POST request successful!");
            localStorage.setItem("badgeData", data);
            window.location.href = "/customize";
          } else {
            console.log("Error sending POST request:", response);
          }
        })
        .catch((error) => {
          console.log("Error sending POST request:", error);
        });
    } else {
      console.log("The textarea is empty");
    }
  });
