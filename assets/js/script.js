// Get references to elements
var input = document.querySelector("#word-input");
var displayArea = document.querySelector("#display-area");
var modalBox = document.querySelector("#modal-box");
var modalTitle = document.querySelector(".modal-title");
var modalText = document.querySelector("#modal-body-text");
var closeBtn = document.querySelector("#close-btn");
var searchBtn = document.querySelector("#search-btn");

// Listen for click event on search button
searchBtn.addEventListener("click", getDefinition);

// Listen for input event on input
input.addEventListener("input", function () {
  displayArea.textContent = " ";
});

// Listen for click events on close (X) icon
closeBtn.addEventListener("click", hideModal);

// API URLs
var dictionaryApiUrl = "https://api.dictionaryapi.dev/api/v2/entries/en/";

var datamuseApiUrl = "https://api.datamuse.com/words?rel_syn=";

// Search count limit
var resultLimit = "&max=5";

// Query Urls
var wordQueryURL;
var synonymsQueryURL;

//Search string
var searchString = "";

// Character sets to validate searchString
// Special characters
var regSpec = /[!@#$%^&*()\-+={}[\]:;"'<>,.?\/|\\]/;
// Numeric characters
var regNum = /\d/;

// Function to fetch data from dictionary API
function getDefinition(event) {
  event.preventDefault();
  // Get user input
  searchString = input.value;

  // Change user input to lower case
  searchString = searchString.toLowerCase();

  // Variables for data
  var wordData = "";
  var synArr = [];
  var synNons = [];

  // If searchstring is empty
  if (searchString == "") {
    modalTitle.textContent = "";
    modalText.textContent = "Search area cannot be empty. Please enter a word.";
    showModal();
    // If search string contains content other than letters
  } else if (regSpec.test(searchString) || regNum.test(searchString)) {
    modalTitle.textContent = "";
    modalText.textContent = "Please enter a word using only letters";
    showModal();
  } else if (
    // If search string already exists in localstorage
    localStorage.getItem(searchString) !== null
  ) {
    // Retrieve from storage and display
    displayArea.textContent = localStorage.getItem(searchString);
    return;
    // If search string does not exist in localstorage
  } else if (localStorage.getItem(searchString) === null) {

    // Build word query URL
    wordQueryURL = dictionaryApiUrl + searchString;

    // Send a request to Free Dictionary API
    fetch(wordQueryURL)
      .then(function (response) {
        return response.json();
      })
      .then(function (data) {
        // Variable to save returned data 
        wordData = data;

        // If word definition exists
        if (!wordData.title) {
          // Variable to store word definition
          var wordDefinition =
            wordData[0].meanings[0].definitions[0].definition;

          // Display word definition in display area
          displayArea.textContent = wordDefinition;

          // Save word and definition to localstorage
          localStorage.setItem(searchString.toLowerCase(), wordDefinition);
        }
        // if no word definition exists
        else if (wordData.title) {

          // Build synonyms query url
          synonymsQueryURL = datamuseApiUrl + searchString + resultLimit;

          // Call Datamuse API
          fetch(synonymsQueryURL)
            .then(function (response) {
              return response.json();
            })
            .then(function (data) {
            // Store returned array of synonyms
              synArr = data;
              // If no synonyms returned 
              if (synArr.length == 0) {

                // Display not found message
                modalTitle.textContent = wordData.title;
                modalText.textContent = wordData.resolution;
                showModal();

                // Check for word
                // If word not in dictionary but in synonyms
              } else if (synArr.length > 0) {
                // Store synonyms in array
                for (var i = 0; i < synArr.length; i++) {
                  synNons.push(synArr[i].word);
                }
                // Display not found message 
                modalTitle.textContent =
                  "Sorry, we couldn't find the word you were looking for.";
                // Suggest words from synonyms
                modalText.textContent =
                  " You could try the following words with similar meaning:\n" +
                  synNons.join(" ,");
                showModal();
              }
            })
            // Handle any errors that occurred during the fetch
            .catch(console.error);
        }
      });
  }
}
