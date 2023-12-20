// Get references to elements
var input = $('input');
// var textBox = $('textarea');

// Store user input
var searchString = input.val();
searchString.trim();

// API URL with user input/ searchString
const url = 'https://wordsapiv1.p.rapidapi.com/words/' + searchString + '/definitions';

// Options object
const options = {
	method: 'GET',
	headers: {
		'X-RapidAPI-Key': '9e97ea1cf8msh73f0f19136d7aedp1f32d8jsn221463fc8414',
		'X-RapidAPI-Host': 'wordsapiv1.p.rapidapi.com'
	}
};

// Fetch data

try {
	const response = await fetch(url, options);
	const result = await response.text();
	console.log(result);
} catch (error) {
	console.error(error);
}
