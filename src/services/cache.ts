const cache = new Map<string, {data:string,expiry:number}>()

export function getCache(prompt:string){

const item = cache.get(prompt)

if(!item) return null

if(Date.now() > item.expiry){

cache.delete(prompt)

return null

}

return item.data

}

export function setCache(prompt:string,data:string){

cache.set(prompt,{
data,
expiry:Date.now()+86400000
})

}
