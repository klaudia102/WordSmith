// Get references to elements
var searchHistory = document.querySelector("#search-history");
var clearBtn = document.querySelector("#clear");


// Get saved searches from localstorage and add to list
for (let j = 0; j < localStorage.length; j++) {
  var savedSearchItem = document.createElement("li");
  var definitionKey = localStorage.key(j);
  savedSearchItem.textContent += definitionKey.toUpperCase();
  savedSearchItem.textContent += " : " + localStorage.getItem(definitionKey);
  searchHistory.appendChild(savedSearchItem);
}

// Listen for click event on clear button
clearBtn.addEventListener("click", function () {
  
// Clear saved searches from list
    if (searchHistory.childElementCount > 0) {
        searchHistory.textContent = "";
    }
  // Clear localstorage
   localStorage.clear();
});
