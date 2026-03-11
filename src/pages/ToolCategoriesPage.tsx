import React from "react";
import { tools } from "../data/tools";
import { Link } from "react-router-dom";

export function ToolCategoriesPage(){

const categories = [...new Set(tools.map(t=>t.category))];

return(

<div className="max-w-4xl mx-auto p-6">

<h1 className="text-3xl font-bold mb-8">
Tool Categories
</h1>

<div className="grid grid-cols-2 md:grid-cols-3 gap-6">

{categories.map(cat => (

<Link
key={cat}
to={`/category/${cat}`}
className="border p-6 rounded-xl text-center hover:bg-slate-50"
>

<h3 className="font-semibold capitalize">
{cat}
</h3>

</Link>

))}

</div>

</div>

)

}
