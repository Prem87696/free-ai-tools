/* 🔥 SERVER CACHE */
const serverCache = new Map<string, { result: string; time: number }>()

const CACHE_TIME = 24 * 60 * 60 * 1000

/* 🔍 GET CACHE */
export function getCache(key: string){

const normalizedKey = btoa(key.trim().toLowerCase())

/* 1️⃣ SERVER CACHE */
const serverData = serverCache.get(normalizedKey)

if(serverData){
if(Date.now() - serverData.time < CACHE_TIME){
console.log("SERVER CACHE HIT")
return serverData.result
}else{
serverCache.delete(normalizedKey)
}
}

/* 2️⃣ BROWSER CACHE */
if(typeof window !== "undefined"){

try{
const cache = localStorage.getItem("ai-cache")
if(cache){

const parsed = JSON.parse(cache)
const data = parsed[normalizedKey]

if(data && Date.now() - data.time < CACHE_TIME){
console.log("BROWSER CACHE HIT")
return data.result
}

}
}catch{}
}

return null
}

/* 💾 SET CACHE */
export function setCache(key: string, value: string){

const normalizedKey = btoa(key.trim().toLowerCase())

/* SERVER */
serverCache.set(normalizedKey,{
result:value,
time:Date.now()
})

/* BROWSER */
if(typeof window !== "undefined"){

try{

const cache = localStorage.getItem("ai-cache")
const parsed = cache ? JSON.parse(cache) : {}

parsed[normalizedKey] = {
result:value,
time:Date.now()
}

localStorage.setItem("ai-cache", JSON.stringify(parsed))

}catch{}
}

}
