export function getCache(key: string){

if(typeof window === "undefined") return null

try{

const cache = localStorage.getItem("ai-cache")
if(!cache) return null

const parsed = JSON.parse(cache)

/* normalize */
const normalizedKey = key.trim().toLowerCase()

const data = parsed[normalizedKey]

if(!data) return null

/* expire check */
const CACHE_TIME = 24 * 60 * 60 * 1000

if(Date.now() - data.time > CACHE_TIME){
delete parsed[normalizedKey]
localStorage.setItem("ai-cache", JSON.stringify(parsed))
return null
}

return data.result

}catch{
return null
}

}

export function setCache(key: string, value: string){

if(typeof window === "undefined") return

try{

const cache = localStorage.getItem("ai-cache")
const parsed = cache ? JSON.parse(cache) : {}

const normalizedKey = key.trim().toLowerCase()

parsed[normalizedKey] = {
result: value,
time: Date.now()
}

localStorage.setItem("ai-cache", JSON.stringify(parsed))

}catch{}

}
