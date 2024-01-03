// Get references to elements
var searchHistory = document.querySelector("#search-history");
var clearBtn = document.querySelector("#clear");

// Variable to store saved searches
var savedSearches = "";

// Get saved searches from localstorage and add to list
for (let j = 0; j < localStorage.length; j++) {
  var savedSearchItem = document.createElement("li");
  var definitionKey = localStorage.key(j);
  savedSearchItem.textContent += definitionKey.toUpperCase();
  savedSearchItem.textContent += " : " + localStorage.getItem(definitionKey);
  searchHistory.appendChild(savedSearchItem);
}

// Listen for click event on clear button
// Clear saved searches from list
// Clear localstorage
clearBtn.addEventListener("click", function () {
 
    if (searchHistory.childElementCount > 0) {
        searchHistory.textContent = "";
    }
});
