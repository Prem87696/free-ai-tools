import { tools } from "../data/tools";

export function searchTools(query:string){

const q = query.toLowerCase();

return tools.filter(t =>

t.name.toLowerCase().includes(q) ||
t.description.toLowerCase().includes(q)

);

}
