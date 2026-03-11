import { tools } from "../data/tools";

export function generateSitemap(){

const base = "https://yourdomain.com";

return tools.map(tool => `${base}${tool.path}`);

}
