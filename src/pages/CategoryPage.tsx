import React from "react";
import { useParams, Link } from "react-router-dom";
import { tools } from "../data/tools";

export function CategoryPage(){

const { category } = useParams();

const categoryTools = tools.filter(
t => t.category === category
);

return(

<div className="max-w-4xl mx-auto p-6">

<h1 className="text-3xl font-bold mb-6 capitalize">
{category} Tools
</h1>

<div className="space-y-4">

{categoryTools.map(tool => (

<Link
key={tool.id}
to={tool.path}
className="block border p-4 rounded-lg hover:bg-slate-50"
>

<h3 className="font-semibold">
{tool.name}
</h3>

<p className="text-sm text-slate-600">
{tool.description}
</p>

</Link>

))}

</div>

</div>

);

}
