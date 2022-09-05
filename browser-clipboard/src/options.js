const MAX = 5;
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
const createField = value => {
	return `<label><input type="text" value="${value}"></label><br>`;
};
const getOption = async () => {
	const notes = await chrome.storage.sync.get();
	const contents = notes['text'];
	let html = '';
	for (let i in contents) {
		if (!contents[i]) continue;
		html += createField(contents[i]);
	}
	const diff = MAX - contents.length;
	for (let j = 0; j < diff; j++) {
		html += createField('');
	}
	document.getElementById('form').insertAdjacentHTML('afterbegin', html);
};

(async () => {
	await getOption();
	document.getElementById('submit').addEventListener('click', e => {
		setOption();
	});
})();
