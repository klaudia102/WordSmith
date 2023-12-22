// Get references to elements
var input = document.querySelector('#word-input');
var wordMeaningBox = document.querySelector('#textArea');
var searchBtn = document.querySelector('#searchButton');

// Listen for click events on searchBtn
// Make API when searchBtn is clicked
searchBtn.addEventListener('click', getDefinition);

// Function to fetch data
function getDefinition() {
  // Get user input
  var word = input.value;
  // Remove whitespace from input string
  word.trim();
  var queryURL = 'https://api.dictionaryapi.dev/api/v2/entries/en/' + word;

  fetch(queryURL)
    .then(function (response) {
      return response.json();
    })
    .then(function (data) {
      // Display word definition in div
      //   wordMeaningBox.textContent = '';
      wordMeaningBox.textContent =
        data[0].meanings[0].definitions[0].definition;
    });
}
