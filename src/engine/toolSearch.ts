import { tools } from "../data/tools";

export function searchTools(query: string) {

const q = query.toLowerCase().trim();

if (!q) return [];

return tools
.filter(tool => {

const nameMatch =
tool.name.toLowerCase().includes(q);

const descriptionMatch =
tool.description.toLowerCase().includes(q);

const categoryMatch =
tool.category?.toLowerCase().includes(q);

const tagMatch =
tool.tags?.some(tag =>
tag.toLowerCase().includes(q)
);

return (
nameMatch ||
descriptionMatch ||
categoryMatch ||
tagMatch
);

})
.sort((a,b)=>{

const score = (tool:any)=>{

let s = 0;

if(tool.name.toLowerCase().includes(q)) s+=3;
if(tool.tags?.some((t:string)=>t.includes(q))) s+=2;
if(tool.description.toLowerCase().includes(q)) s+=1;

return s;

}

return score(b)-score(a);

});

}
