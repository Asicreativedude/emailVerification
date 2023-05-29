document.querySelector('#fake-submit').addEventListener('click', (e) => {
	let email = document.querySelector('#workEmail').value;
	if (email === '' || email.includes('@business')) {
		document.querySelector('#fake-submit').textContent = 'Submit';
		document.querySelector('#submit').click();
		return;
	}

	document.querySelector('#fake-submit').textContent = 'Please wait...';
	const url = `https://emailvalidation.abstractapi.com/v1/?api_key=cc0186cda5944c59a1fc70c81c11a1b9&email=${email}`;
	function httpGetAsync(url, callback) {
		const xmlHttp = new XMLHttpRequest();
		xmlHttp.onreadystatechange = function () {
			if (xmlHttp.readyState === 4 && xmlHttp.status === 200)
				callback(xmlHttp.responseText);
		};
		xmlHttp.open('GET', url, true); // true for asynchronous
		xmlHttp.send(null);
	}
	httpGetAsync(url, function (response) {
		document.querySelector('#fake-submit').textContent = 'Submit';
		response = JSON.parse(response);
		if (
			response.deliverability === 'DELIVERABLE' &&
			response.quality_score > 0.9
		) {
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
