import { Token } from './config.js';

document.querySelector('#fake-submit').addEventListener('click', (e) => {
	let email = document.querySelector('#workEmail').value;
	document.querySelector('#fake-submit').textContent = 'Please wait...';
	const url = `https://emailvalidation.abstractapi.com/v1/?api_key=${TOKEN}&email=${email}`;

	httpGetAsync(url, function (response) {
		document.querySelector('#fake-submit').textContent = 'Submit';
		response = JSON.parse(response);
		if (
			response.deliverability === 'DELIVERABLE' &&
			response.quality_score > 0.8
		) {
			console.log(response);
			document.querySelector('#submit').click();
		} else {
			alert('Please enter a valid email address');
		}
	});
});

function httpGetAsync(url, callback) {
	const xmlHttp = new XMLHttpRequest();
	xmlHttp.onreadystatechange = function () {
		if (xmlHttp.readyState === 4 && xmlHttp.status === 200)
			callback(xmlHttp.responseText);
	};
	xmlHttp.open('GET', url, true); // true for asynchronous
	xmlHttp.send(null);
}
