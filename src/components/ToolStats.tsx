import React from "react"
import { Star, Users, Zap, Shield } from "lucide-react"

export function ToolStats(){

return(

<div className="grid grid-cols-2 md:grid-cols-4 gap-4 mt-6">

<div className="bg-white border border-slate-200 rounded-xl p-4 text-center">

<Star className="mx-auto text-indigo-600 mb-2"/>

<p className="font-bold text-slate-900">4.8</p>

<p className="text-xs text-slate-500">Rating</p>

</div>

<div className="bg-white border border-slate-200 rounded-xl p-4 text-center">

<Users className="mx-auto text-indigo-600 mb-2"/>

<p className="font-bold text-slate-900">12k+</p>

<p className="text-xs text-slate-500">Users</p>

</div>

<div className="bg-white border border-slate-200 rounded-xl p-4 text-center">

<Zap className="mx-auto text-indigo-600 mb-2"/>

<p className="font-bold text-slate-900">Fast</p>

<p className="text-xs text-slate-500">Processing</p>

</div>

<div className="bg-white border border-slate-200 rounded-xl p-4 text-center">

<Shield className="mx-auto text-indigo-600 mb-2"/>

<p className="font-bold text-slate-900">Secure</p>

<p className="text-xs text-slate-500">Privacy Safe</p>

</div>

</div>

)

}
