const note = document.getElementById("note")
const result = document.getElementById("result")

// API 저장
document.getElementById("savekey").onclick = () => {

const key = document.getElementById("apikey").value.trim()
const url = document.getElementById("apiurl").value.trim()
const model = document.getElementById("model").value.trim()

chrome.storage.local.set({
api_key:key,
api_url:url,
model:model
})

alert("Saved 🦆")

}

// AI 분석
document.getElementById("analyze").onclick = async () => {

const text = note.value.trim()

if(!text){
result.innerText = "Write something first."
return
}

result.innerText = "🦆 Thinking..."

try{

const response = await chrome.runtime.sendMessage({
type:"AI_QUERY",
text:text
})

result.innerText = response

}catch(e){

result.innerText = "AI request failed."

}

}