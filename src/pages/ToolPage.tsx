import React, { useState } from "react";
import { Loader2 } from "lucide-react";

export default function ToolPage() {

const [formData, setFormData] = useState({});
const [loading, setLoading] = useState(false);

// dummy tool data
const tool = {
inputs: [
{ name: "text", type: "text", label: "Enter Text" },
{ name: "type", type: "select", label: "Type", options: ["Short", "Long"] }
]
};

const isValid = true;

function submit(e) {
e.preventDefault();
setLoading(true);

 
setTimeout(() => {
  setLoading(false);
  alert("Generated ✅");
}, 1000);
 

}

return ( <div className="max-w-3xl mx-auto px-4 py-10">

 
  {/* CARD */}
  <div className="bg-white border border-slate-200 rounded-2xl shadow-sm p-6 md:p-8">

    <h1 className="text-2xl font-semibold mb-6 text-center">
      Tool Page
    </h1>

    <form onSubmit={submit} className="space-y-5">

      {tool.inputs?.map((input) => {

        if (input.type === "select") {
          return (
            <select
              key={input.name}
              className="w-full border border-slate-300 rounded-xl px-4 py-3 focus:outline-none focus:ring-2 focus:ring-indigo-500"
              value={formData[input.name] || ""}
              onChange={(e) =>
                setFormData((prev) => ({
                  ...prev,
                  [input.name]: e.target.value
                }))
              }
            >
              <option value="">Select {input.label}</option>
              {input.options?.map((opt) => (
                <option key={opt} value={opt}>{opt}</option>
              ))}
            </select>
          );
        }

        if (input.type === "text") {
          return (
            <input
              key={input.name}
              type="text"
              placeholder={input.label}
              className="w-full border border-slate-300 rounded-xl px-4 py-3 focus:outline-none focus:ring-2 focus:ring-indigo-500"
              value={formData[input.name] || ""}
              onChange={(e) =>
                setFormData((prev) => ({
                  ...prev,
                  [input.name]: e.target.value
                }))
              }
            />
          );
        }

        return (
          <textarea
            key={input.name}
            placeholder={input.label}
            className="w-full border border-slate-300 rounded-xl px-4 py-3 min-h-[120px] focus:outline-none focus:ring-2 focus:ring-indigo-500"
            value={formData[input.name] || ""}
            onChange={(e) =>
              setFormData((prev) => ({
                ...prev,
                [input.name]: e.target.value
              }))
            }
          />
        );

      })}

      {tool.inputs?.length > 0 ? (
        <button
          type="submit"
          disabled={!isValid || loading}
          className="w-full bg-indigo-600 hover:bg-indigo-700 text-white py-3 rounded-xl flex justify-center items-center gap-2 disabled:opacity-50 transition"
        >
          {loading ? (
            <>
              <Loader2 className="animate-spin w-5 h-5" />
              Generating...
            </>
          ) : (
            "Generate"
          )}
        </button>
      ) : (
        <div className="text-center text-slate-500 text-sm py-4">
          ⚙️ This tool works differently. Feature coming soon.
        </div>
      )}

    </form>

  </div>

</div>
 

);
}
