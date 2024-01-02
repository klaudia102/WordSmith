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
var dictionaryApiUrl = "https://api.dictionaryapi.dev/api/v2/entries/en/"

var newsApiUrl = "https://gnews.io/api/v4/search?";
// API key for news Api
var key = "&country=us&max=10&token=d06b56befd778f95afde57c26ebc9890";

// Query Urls
var wordQueryURL;
var newsQueryURL;

//Search string

var searchString = "";

// Function to fetch data from dictionary API
function getDefinition() {
	
// Get user input
searchString = input.value;
	
// Remove whitespace from search string
searchString.trim();
	
wordQueryURL = dictionaryApiUrl + searchString;
	
// Request dictionary data
fetch(wordQueryURL)
	.then(function (response) {
	return response.json();
	}).then(function (data) { 
    		
// Display word definition in div
	dataDisplayArea.textContent = "";
        dataDisplayArea.textContent = data[0].meanings[0].definitions[0].definition;
        
    })
    
}

// Function to fetch news article from Google news API
function getWordInContext(){
		if (searchString == false) {
		return
	} else {
		
	newsQueryURL = newsApiUrl + "q=" + searchString + key;

// Request news data
	fetch(newsQueryURL)
	.then(function (response) {
		return response.json();
	}).then(function (data) {

// Loop through data 
		for (var i = 0; i < data.articles.length; i++){
			var newsDescription = data.articles[i].description;
			
// If news description contain the searchString
		if (newsDescription.indexOf(searchString) > -1) {
						
// Display news description in div				
		dataDisplayArea.textContent = "";
		dataDisplayArea.textContent = data.articles[i].description
			}
		}
  
    })
	}
}
