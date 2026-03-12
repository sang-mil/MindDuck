document.addEventListener("mouseup", () => {

const text = window.getSelection().toString().trim()

if(text && text.length > 40){

chrome.storage.local.set({
last_context: text
})

console.log("🦆 MindDuck saved context:", text)

}

})