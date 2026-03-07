export async function generateImage(prompt:string){

const response = await fetch("https://api.replicate.com/v1/predictions",{

method:"POST",

headers:{
"Content-Type":"application/json",
"Authorization":"Token YOUR_API_KEY"
},

body:JSON.stringify({

version:"stability-ai/sdxl",

input:{
prompt:prompt
}

})

});

const data = await response.json();

return data;

}
