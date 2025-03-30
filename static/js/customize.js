// Define the color options
const colors = [
  "aqua",
  "black",
  "blue",
  "fuchsia",
  "gray",
  "green",
  "lime",
  "maroon",
  "navy",
  "olive",
  "purple",
  "red",
  "silver",
  "teal",
  "yellow",
];

const badgeData = localStorage.getItem("badgeData");

if (badgeData) {
  const badgeList = badgeData.split("\n");

  const tableBody = document
    .getElementById("badge-table")
    .getElementsByTagName("tbody")[0];
  const headerRow = document
    .getElementById("badge-table")
    .getElementsByTagName("thead")[0].rows[0];

  // Add color columns to the header dynamically
  colors.forEach((color) => {
    const headerColor = document.createElement("th");
    headerColor.textContent = color.charAt(0).toUpperCase() + color.slice(1);
    headerRow.appendChild(headerColor);
  });

  // Loop through each badge and create a row in the table
  badgeList.forEach((badge) => {
    const tr = document.createElement("tr");

    // Regex to extract the name and URL from the markdown ![name](url)
    const regex = /!\[(.*?)\]\((.*?)\)/;
    const match = badge.match(regex);

    if (match && match[1] && match[2]) {
      // First column: Badge Name
      const nameCell = document.createElement("td");
      nameCell.textContent = match[1];
      tr.appendChild(nameCell);

      // Create a column for each color variant
      colors.forEach((color) => {
        const urlWithColor = match[2].replace(
          /&logoColor=[^&]*/,
          `&logoColor=${color}`
        );

        const colorCell = document.createElement("td");

        const img = document.createElement("img");
        img.src = urlWithColor;
        img.alt = `${match[1]} Badge (${color})`;

        colorCell.appendChild(img);

        tr.appendChild(colorCell);
      });

      // Append the row to the table body
      tableBody.appendChild(tr);
    }
  });
} else {
  document.getElementById("badge-container").innerHTML =
    "<h2>No badge data available.</h2>";
}
