import React from "react";

export default function FileToolUI({
title,
description,
accept,
onFileChange,
onConvert,
downloadUrl,
multiple
}: any){

return(

<div className="bg-white rounded-xl border border-slate-200 shadow-sm p-8">

<h1 className="text-3xl font-bold text-slate-900 mb-2">
{title}
</h1>

<p className="text-slate-500 mb-6">
{description}
</p>

<input
type="file"
accept={accept}
multiple={multiple}
onChange={onFileChange}
className="block mb-6"
/>

{onConvert && (

<button
onClick={onConvert}
className="bg-indigo-600 text-white px-6 py-3 rounded-lg"
>

Convert

</button>

)}

{downloadUrl && (

<a
href={downloadUrl}
download
className="ml-4 bg-green-600 text-white px-6 py-3 rounded-lg"
>

Download

</a>

)}

</div>

)

}
