<form onSubmit={submit} className="space-y-6">

{tool.inputs?.map(input=>(

input.type==="select" ? (

<select
key={input.name}
className="w-full border rounded-lg px-4 py-3"
value={formData[input.name] || ""}
onChange={(e)=>setFormData(prev=>({...prev,[input.name]:e.target.value}))}
>
<option value="">Select {input.label}</option>
{input.options?.map(opt=>(
<option key={opt} value={opt}>{opt}</option>
))}
</select>

) : input.type==="text" ? (

<input
key={input.name}
type="text"
placeholder={input.label}
className="w-full border rounded-lg px-4 py-3"
value={formData[input.name] || ""}
onChange={(e)=>setFormData(prev=>({...prev,[input.name]:e.target.value}))}
/>

) : (

<textarea
key={input.name}
placeholder={input.label}
className="w-full border rounded-lg px-4 py-3"
value={formData[input.name] || ""}
onChange={(e)=>setFormData(prev=>({...prev,[input.name]:e.target.value}))}
/>

)

))}

{/* ✅ SHOW BUTTON ONLY IF INPUT EXISTS */}
{tool.inputs?.length > 0 && (

<button
disabled={!isValid || loading}
className="w-full bg-indigo-600 text-white py-3 rounded-lg flex justify-center items-center gap-2 disabled:opacity-50"
>

{loading ? (
<>
<Loader2 className="animate-spin w-5 h-5"/>
Generating...
</>
) : "Generate"}

</button>

)}

{/* ✅ NO INPUT TOOL MESSAGE */}
{tool.inputs?.length === 0 && (

<div className="text-center text-slate-500 text-sm py-4">
⚙️ This tool works differently. Feature coming soon.
</div>

)}

</form>
