const note = document.getElementById("note")
const result = document.getElementById("result")

document.getElementById("savekey").onclick = () => {

const key = document.getElementById("apikey").value
const url = document.getElementById("apiurl").value
const model = document.getElementById("model").value

chrome.storage.local.set({
api_key:key,
api_url:url,
model:model
})

alert("Saved")

}

document.getElementById("analyze").onclick = async () => {

const text = note.value

const response = await chrome.runtime.sendMessage({
type:"AI_QUERY",
text:text
})

result.innerText = response

}