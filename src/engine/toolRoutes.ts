import { tools } from "../data/tools";

export function getToolRoutes(){

return tools.map(tool => ({

path: tool.path,
id: tool.id,
name: tool.name

}));

}
