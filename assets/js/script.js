// Get references to elements
var textBox = $('textarea');
var searchBtn = $('.containerSearch').children().eq(1)
searchBtn.on('click',getDefinition)

//  Function to fetch data
function getDefinition() {

//Get user input
	var searchString = $('input').val();
	
// Remove whitespace from string
searchString.trim()

// Add string to queryURL
var queryURL = "https://api.dictionaryapi.dev/api/v2/entries/en/" + searchString;

// Fetch data from API
	fetch(queryURL)
	.then(function (response) {
		return response.json();
	}).then(function (data) {
	// Display data in textarea
		textBox.text(data[0].meanings[0].definitions[0].definition)
	 })
}

