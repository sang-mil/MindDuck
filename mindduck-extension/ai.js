chrome.runtime.onMessage.addListener((msg,sender,sendResponse)=>{

if(msg.type==="AI_QUERY"){

handleAI(msg.text).then(sendResponse)

return true

}

})

async function handleAI(text){

const settings = await getSettings()

const res = await fetch(settings.url,{
method:"POST",
headers:{
"Content-Type":"application/json",
"Authorization":`Bearer ${settings.key}`
},
body:JSON.stringify({
model:settings.model,
messages:[
{
role:"system",
content:`You are MindDuck.

A curious helpful duck that helps users think.

Always answer shortly and sometimes start with 🦆`
},
{
role:"user",
content:text
}
]
})
})

const data = await res.json()

return data.choices?.[0]?.message?.content || "Duck found nothing."

}

function getSettings(){

return new Promise(resolve=>{

chrome.storage.local.get(
["api_key","api_url","model"],
(r)=>{

resolve({
key:r.api_key,
url:r.api_url,
model:r.model
})

})

})

}