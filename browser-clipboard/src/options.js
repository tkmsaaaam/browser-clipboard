const setOption = () => {
	const text = document.getElementById('text').value;
	chrome.storage.sync
		.set({
			text: { text },
		})
		.then();
};
(() => {
	document.getElementById('submit').addEventListener('click', e => {
		e.preventDefault();
		setOption();
	});
})();
