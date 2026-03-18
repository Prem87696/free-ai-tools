 const serverCache = new Map<string, { result: string; time: number }>()

const CACHE_TIME = 24 * 60 * 60 * 1000
const MAX_CACHE_ITEMS = 50

/* 🔐 SAFE ENCODE (UNICODE FIX) */
function safeKey(key:string){
try{
return btoa(unescape(encodeURIComponent(key.trim().toLowerCase())))
}catch{
return key
}
}

/* 🧹 CLEAN OLD CACHE */
function cleanCache(obj:any){
const entries = Object.entries(obj)

if(entries.length <= MAX_CACHE_ITEMS) return obj

/* remove oldest */
const sorted = entries.sort((a:any,b:any)=>a[1].time - b[1].time)

const trimmed = sorted.slice(-MAX_CACHE_ITEMS)

return Object.fromEntries(trimmed)
}

/* 🔍 GET CACHE */
export function getCache(key:string){

const normalizedKey = safeKey(key)

/* 1️⃣ SERVER CACHE */
const serverData = serverCache.get(normalizedKey)

if(serverData){

if(Date.now() - serverData.time < CACHE_TIME){
console.log("✅ SERVER CACHE HIT")
return serverData.result
}else{
serverCache.delete(normalizedKey)
}

}

/* 2️⃣ BROWSER CACHE */
if(typeof window !== "undefined"){

try{

const raw = localStorage.getItem("ai-cache")

if(!raw) return null

const parsed = JSON.parse(raw)

const data = parsed[normalizedKey]

if(data && Date.now() - data.time < CACHE_TIME){
console.log("✅ BROWSER CACHE HIT")
return data.result
}

}catch(err){
console.error("Cache Read Error:", err)
}

}

return null
}

/* 💾 SET CACHE */
export function setCache(key:string, value:string){

const normalizedKey = safeKey(key)

/* SERVER CACHE */
serverCache.set(normalizedKey,{
result:value,
time:Date.now()
})

/* BROWSER CACHE */
if(typeof window !== "undefined"){

try{

const raw = localStorage.getItem("ai-cache")
const parsed = raw ? JSON.parse(raw) : {}

parsed[normalizedKey] = {
result:value,
time:Date.now()
}

/* LIMIT SIZE */
const cleaned = cleanCache(parsed)

localStorage.setItem("ai-cache", JSON.stringify(cleaned))

}catch(err){
console.error("Cache Save Error:", err)
}

}

}
