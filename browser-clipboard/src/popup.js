const copy = () => {
	const text = document.getElementById('text').textContent;
	navigator.clipboard.writeText(text).then();
};

(async () => {
	const data = await chrome.storage.sync.get();
	const html = `<a id="text">${data.text.text}</a><button id="copy">copy</button>`;
	document
		.getElementsByClassName('text')[0]
		.insertAdjacentHTML('afterbegin', html);
	document.getElementById('copy').addEventListener('click', copy);
})();
