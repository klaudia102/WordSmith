// Get references to elements
var input = document.querySelector('#word-input');
var wordMeaningBox = document.querySelector('#textArea');
var searchBtn = document.querySelector('#searchButton');

// Listen for click events on searchBtn
// Make API when searchBtn is clicked
searchBtn.addEventListener('click', getDefinition);

var contextBtn = document.querySelector('#contextButton');

// API URLs
var dictionaryApiUrl = "https://api.dictionaryapi.dev/api/v2/entries/en/"

var newsApiUrl = "https://gnews.io/api/v4/search?";
// API key for news Api
var key = "&country=us&max=10&token=d06b56befd778f95afde57c26ebc9890";

// Query Urls
var wordQueryURL;
var newsQueryURL;

//Search string

var word = "";

// Listen for click events on searchBtn
// Make API call to Free Dictionary API when searchBtn is clicked
searchBtn.addEventListener('click', getDefinition);

// Listen for click events on contextBtn
// Make API call to Google News API when contextBtn is clicked
contextBtn.addEventListener('click',getWordInContext)


// Function to fetch data
function getDefinition() {
// Get user input
var word = input.value;
// Remove whitespace from input string
word.trim();
var queryURL = "https://api.dictionaryapi.dev/api/v2/entries/en/" + word;

fetch(queryURL)
	.then(function (response) {
		return response.json();
	}).then(function (data) { 
    		
	// Display word definition in div
	wordMeaningBox.textContent = "";
        wordMeaningBox.textContent = data[0].meanings[0].definitions[0].definition;
        
    })
    
}
