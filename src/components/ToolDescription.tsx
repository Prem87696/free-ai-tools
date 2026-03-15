import React from "react";

type Props = {
name: string;
};

export default function ToolDescription({ name }: Props) {
return (

<section className="mt-12 bg-white border rounded-2xl p-8 space-y-6">

<h2 className="text-2xl font-bold text-slate-900">
About {name}
</h2>

<p className="text-slate-600 leading-relaxed">
{name} is an advanced online tool designed to simplify digital
tasks using fast browser-based processing. This tool allows users
to convert, compress, or process files instantly without installing
any software or plugins.
</p>

<p className="text-slate-600 leading-relaxed">
Our platform focuses on speed, simplicity, and reliability so that
students, designers, developers, freelancers, and professionals can
complete their work quickly using modern web technology.
</p>

<h3 className="text-xl font-semibold text-slate-900">
How to Use
</h3>

<ul className="list-disc pl-6 text-slate-600 space-y-2">
<li>Upload your file or enter the required input.</li>
<li>Click the convert or process button.</li>
<li>The system processes your request instantly.</li>
<li>Download or copy the generated result.</li>
</ul>

<h3 className="text-xl font-semibold text-slate-900">
Frequently Asked Questions
</h3>

<p>
<strong>Is this tool free?</strong><br/>
Yes, this tool is completely free to use and accessible from any browser.
</p>

<p>
<strong>Do I need to install software?</strong><br/>
No installation is required. Everything works directly in your browser.
</p>

<p>
<strong>Is my data secure?</strong><br/>
Your files are processed temporarily and are not permanently stored.
</p>

</section>

);
}
