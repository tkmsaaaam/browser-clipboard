const setOption = () => {
  const notes = document.getElementsByTagName('input')
  const contents = []
  for (const i in notes) {
    if (notes[i].value) contents.push(notes[i].value)
  }
  chrome.storage.sync
    .set({
      text: contents
    })
    .then()
}
const createField = (value: string, i: number) => {
  return `<label><input type="text" value="${value}" class="${i}"></label><button class="${i}">copy</button><br>`
}
const getOption = async () => {
  const notes = await chrome.storage.sync.get()
  const contents = notes.text || []
  let html = ''
  for (const i in contents) {
    if (!contents[i]) continue
    html += createField(contents[i], parseInt(i))
  }
  html += createField('', contents.length)
  document.getElementById('form')?.insertAdjacentHTML('afterbegin', html)
};

(async () => {
  await getOption()
  document.addEventListener('click', (e: MouseEvent) => {
    const target = e.target as HTMLInputElement
    if (target.tagName !== 'BUTTON') return
    setOption()
    if (target.id !== 'submit') return
    const element = document.getElementsByClassName(
      target.className
    )[0] as HTMLInputElement
    navigator.clipboard.writeText(element.value).then()
  })
})()
