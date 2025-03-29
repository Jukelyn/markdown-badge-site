// static/js/badges.js

const selectedBadges = []; // Array to store selected badges
const tbodyEl = document.querySelector("#selectedBadgesTable tbody");
const selectedBadgesTextarea = document.querySelector("#selectedBadges");

// Function to handle checkbox click and update the selected badges
function toggleCheckbox(row) {
  const checkbox = row.querySelector('input[type="checkbox"]');
  const badgeName = row.getAttribute("data-badge-name");
  const badgeURL = row.getAttribute("data-badge-url");

  // Add or remove the badge from the selectedBadges array
  if (checkbox.checked) {
    // Add the badge to the array (preserve order of selection)
    selectedBadges.push({ badgeName, badgeURL });
  } else {
    // Remove the badge from the array if unchecked
    const index = selectedBadges.findIndex(
      (item) => item.badgeURL === badgeURL
    );
    if (index !== -1) {
      selectedBadges.splice(index, 1);
    }
  }

  // Update content
  updateContent();
}

// Update textarea and selected badges table with selected badges
function updateContent() {
  // Update the textarea with selected badge URLs in order of selection
  selectedBadgesTextarea.value = selectedBadges
    .map((item) => item.badgeURL)
    .join("\n");

  // Update the selected badges table
  tbodyEl.innerHTML = ""; // Clear existing rows

  selectedBadges.forEach((item) => {
    const row = `
      <tr>
        <td><input type="checkbox" checked disabled /></td>
        <td>${item.badgeName}</td>
        <td><img src="${item.badgeURL}" loading="lazy" alt="${item.badgeName}" /></td>
        <td><a href="${item.badgeURL}" target="_blank">${item.badgeURL}</a></td>
      </tr>
    `;
    tbodyEl.innerHTML += row;
  });
}

const badgeTable = document.getElementById("badgeTable");
badgeTable.addEventListener("click", function (e) {
  if (e.target.type === "checkbox") {
    const row = e.target.closest("tr");
    toggleCheckbox(row);
  }
});

function copyToClipboard() {
  navigator.clipboard
    .writeText(selectedBadgesTextarea.value)
    .then(() => {
      alert("Content copied to clipboard!");
    })
    .catch((error) => {
      alert("Failed to copy content: " + error);
    });
}


const copyButton = document.getElementById("copyButton");
copyButton.addEventListener("click", copyToClipboard);
