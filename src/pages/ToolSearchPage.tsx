import React, { useState } from "react";
import { searchTools } from "../engine/toolSearch";
import { Link } from "react-router-dom";

export function ToolSearchPage(){

const [query,setQuery] = useState("");

const results = query ? searchTools(query) : [];

return(

<div className="max-w-4xl mx-auto p-6">

<h1 className="text-3xl font-bold mb-6">
Search Tools
</h1>

<input
type="text"
placeholder="Search AI tools..."
value={query}
onChange={(e)=>setQuery(e.target.value)}
className="w-full border px-4 py-3 rounded-lg mb-6"
/>

<div className="space-y-4">

{results.map(tool => (

<Link
key={tool.id}
to={tool.path}
className="block border p-4 rounded-lg hover:bg-slate-50"
>

<h3 className="font-semibold">{tool.name}</h3>

<p className="text-sm text-slate-600">
{tool.description}
</p>

</Link>

))}

</div>

</div>

)

}
