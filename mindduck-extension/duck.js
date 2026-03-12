const duck = document.createElement("div")

duck.id = "mindduck"
duck.innerText = "🦆"

duck.style.position = "fixed"
duck.style.fontSize = "32px"
duck.style.zIndex = "999999"
duck.style.cursor = "pointer"

document.body.appendChild(duck)

let x = window.innerWidth - 100
let y = window.innerHeight - 100

duck.style.left = x + "px"
duck.style.top = y + "px"

function walk(){

const dx = (Math.random()*200) - 100
const dy = (Math.random()*200) - 100

x += dx
y += dy

x = Math.max(0, Math.min(window.innerWidth - 60, x))
y = Math.max(0, Math.min(window.innerHeight - 60, y))

duck.style.left = x + "px"
duck.style.top = y + "px"

}

setInterval(walk, 4000)

// 클릭 이벤트

duck.onclick = () => {

chrome.storage.local.get(["last_context"], (data)=>{

if(!data.last_context){

alert("🦆 Drag some text first!")
return

}

duckSpeak("Thinking...")

chrome.runtime.sendMessage({
type:"ASK_AI",
text:data.last_context
},(response)=>{

if(response.error){

duckSpeak("AI error 🦆")

}else{

duckSpeak(JSON.stringify(response))

}

})

})

}



// 말풍선

function duckSpeak(text){

let bubble = document.getElementById("duckbubble")

if(!bubble){

bubble = document.createElement("div")
bubble.id="duckbubble"

bubble.style.position="fixed"
bubble.style.bottom="120px"
bubble.style.right="40px"
bubble.style.background="white"
bubble.style.padding="10px"
bubble.style.borderRadius="10px"
bubble.style.boxShadow="0 0 10px rgba(0,0,0,0.2)"
bubble.style.maxWidth="300px"
bubble.style.zIndex="999999"

document.body.appendChild(bubble)

}

bubble.innerText=text

}