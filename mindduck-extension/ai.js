chrome.runtime.onMessage.addListener((msg, sender, sendResponse)=>{

if(msg.type==="AI_QUERY"){

handleAI(msg.text).then(res=>{
sendResponse(res)
})

return true

}

})

async function handleAI(text){

const data = await chrome.storage.local.get([
"api_key",
"api_url",
"model"
])

try{

const response = await fetch(data.api_url,{
method:"POST",
headers:{
"Content-Type":"application/json",
"Authorization":"Bearer "+data.api_key
},
body:JSON.stringify({
model:data.model,
messages:[
{
role:"user",
content:text
}
]
})
})

const json = await response.json()

if(json.choices){
return json.choices[0].message.content
}

return JSON.stringify(json)

}catch(e){

return "AI error 🦆"

}

}