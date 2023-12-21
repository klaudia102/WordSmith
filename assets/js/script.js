// Get references to elements
var input = document.querySelector('input');
var wordMeaningBox = document.querySelector('textarea');
var parentContainer = document.querySelector('.containerSearch');
var searchBtn = parentContainer.children[2];

// Listen for click events on searchBtn
// Make API when searchBtn is clicked
searchBtn.addEventListener('click', getDefinition)


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
    
	// Display word definition in console to test
	console.log(data[0].meanings[0].definitions[0].definition)
		
	   // Display word definition in textarea  	
        wordMeaningBox.value = data[0].meanings[0].definitions[0].definition;
        
    })
    
}
