export async function generateImage(prompt:string){

const response = await fetch("https://api.replicate.com/v1/predictions",{

method:"POST",

headers:{
"Content-Type":"application/json",
"Authorization":`Token ${import.meta.env.VITE_REPLICATE_API_TOKEN}`
},

body:JSON.stringify({

version:"black-forest-labs/flux-1.1-pro",

input:{
prompt:prompt
}

})

});

const data = await response.json();

return data;

}
