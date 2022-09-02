(async () => {
	const data = await chrome.storage.sync.get();
	const contents = data['text'];
	let html = '';
	for (let i in contents) {
		if (!contents[i]) continue;
		html += `<a class="${i}">${contents[i]}</a><button class="${i}">copy</button><br>`;
	}
	document
		.getElementsByClassName('text')[0]
		.insertAdjacentHTML('afterbegin', html);
	document.addEventListener('click', e => {
		if (!e) return;
		const text = document.getElementsByClassName(e.target.className)[0]
			.textContent;
		navigator.clipboard.writeText(text).then();
	});
})();
