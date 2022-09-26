const setOption = () => {
	const notes = document.getElementsByTagName('input');
	const contents = [];
	for (let i in notes) {
		if (notes[i].value) {
			contents.push(notes[i].value);
		}
	}
	chrome.storage.sync
		.set({
			text: contents,
		})
		.then();
};
const createField = (value, i) => {
	return `<label><input type="text" value="${value}" class="${i}"></label><button class="${i}">copy</button><br>`;
};
const getOption = async () => {
	const notes = await chrome.storage.sync.get();
	const contents = notes['text'] || [];
	let html = '';
	for (let i in contents) {
		if (!contents[i]) continue;
		html += createField(contents[i], i);
	}
	html += createField('', contents.length);
	document.getElementById('form').insertAdjacentHTML('afterbegin', html);
};

(async () => {
	await getOption();
	document.addEventListener('click', e => {
		if (e.target.tagName !== 'BUTTON') return;
		setOption();
		if (e.target.id !== 'submit') {
			const text = document.getElementsByClassName(e.target.className)[0].value;
			navigator.clipboard.writeText(text).then();
		}
	});
})();
