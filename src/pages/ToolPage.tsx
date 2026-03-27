import React, { useState } from "react";
import { useParams } from "react-router-dom";
import { Loader2 } from "lucide-react";

export default function ToolPage() {

const { toolId } = useParams();

const [formData, setFormData] = useState({});
const [loading, setLoading] = useState(false);

// 🔥 ALL TOOLS CONFIG
const tools = {
"ai-writer": {
title: "AI Blog Writer",
color: "bg-indigo-600",
inputs: [
{ name: "topic", type: "text", label: "Enter Topic" },
{ name: "tone", type: "select", label: "Tone", options: ["Formal", "Casual"] }
]
},

 
"image-compressor": {
  title: "Image Compressor",
  color: "bg-green-600",
  inputs: [
    { name: "file", type: "text", label: "Upload Image URL" }
  ]
},

"email-writer": {
  title: "AI Email Writer",
  color: "bg-pink-600",
  inputs: [
    { name: "subject", type: "text", label: "Email Subject" },
    { name: "message", type: "textarea", label: "Message" }
  ]
}
 

};

// current tool
const tool = tools[toolId] || {
title: "Tool",
color: "bg-gray-600",
inputs: []
};

const isValid = true;

function submit(e) {
e.preventDefault();
setLoading(true);
 
setTimeout(() => {
  setLoading(false);
  alert(tool.title + " Generated ✅");
}, 1000);
 

}

return ( <div className="max-w-3xl mx-auto px-4 py-10">

 
  <div className="bg-white border border-slate-200 rounded-2xl shadow-sm p-6 md:p-8">

    {/* 🔥 Dynamic Title */}
    <h1 className="text-2xl font-semibold mb-6 text-center">
      {tool.title}
    </h1>

    <form onSubmit={submit} className="space-y-5">

      {tool.inputs.map((input) => {

        if (input.type === "select") {
          return (
            <select
              key={input.name}
              className="w-full border border-slate-300 rounded-xl px-4 py-3"
              value={formData[input.name] || ""}
              onChange={(e) =>
                setFormData(prev => ({
                  ...prev,
                  [input.name]: e.target.value
                }))
              }
            >
              <option value="">Select {input.label}</option>
              {input.options.map(opt => (
                <option key={opt}>{opt}</option>
              ))}
            </select>
          );
        }

        if (input.type === "textarea") {
          return (
            <textarea
              key={input.name}
              placeholder={input.label}
              className="w-full border border-slate-300 rounded-xl px-4 py-3 min-h-[120px]"
              value={formData[input.name] || ""}
              onChange={(e) =>
                setFormData(prev => ({
                  ...prev,
                  [input.name]: e.target.value
                }))
              }
            />
          );
        }

        return (
          <input
            key={input.name}
            type="text"
            placeholder={input.label}
            className="w-full border border-slate-300 rounded-xl px-4 py-3"
            value={formData[input.name] || ""}
            onChange={(e) =>
              setFormData(prev => ({
                ...prev,
                [input.name]: e.target.value
              }))
            }
          />
        );

      })}

      {tool.inputs.length > 0 ? (
        <button
          type="submit"
          disabled={loading}
          className={`w-full ${tool.color} text-white py-3 rounded-xl flex justify-center items-center gap-2`}
        >
          {loading ? (
            <>
              <Loader2 className="animate-spin w-5 h-5" />
              Processing...
            </>
          ) : (
            "Generate"
          )}
        </button>
      ) : (
        <div className="text-center text-slate-500 py-4">
          Tool coming soon ⚙️
        </div>
      )}

    </form>

  </div>

</div>
 

);
}
