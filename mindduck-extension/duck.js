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

duck.onclick = () => {

chrome.storage.local.get(["last_context"], (data)=>{

if(data.last_context){

alert("🦆 I remember this:\n\n" + data.last_context)

}else{

alert("🦆 Drag some text first!")

}

})

}