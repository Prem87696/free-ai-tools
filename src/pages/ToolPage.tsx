import React, { useState } from "react";
import { useParams, Navigate } from "react-router-dom";
import { tools } from "../data/tools";
import { generateContent } from "../services/gemini";
import { SEOHead } from "../components/SEOHead";
import { AdPlaceholder } from "../components/AdPlaceholder";
import { Loader2, Copy, Check, AlertCircle, Sparkles } from "lucide-react";

export function ToolPage() {

  const { toolId } = useParams();

  const tool = tools.find((t) => t.id === toolId);

  const [formData, setFormData] = useState<Record<string, string>>({});
  const [result, setResult] = useState("");
  const [isLoading, setIsLoading] = useState(false);
  const [error, setError] = useState("");
  const [copied, setCopied] = useState(false);

  if (!tool) {
    return <Navigate to="/404" replace />;
  }

  const Icon = tool.icon;

  const handleInputChange = (name: string, value: string) => {
    setFormData((prev) => ({
      ...prev,
      [name]: value
    }));
  };

  const handleSubmit = async (e: React.FormEvent) => {

    e.preventDefault();

    setIsLoading(true);
    setError("");
    setResult("");

    try {

      let prompt = tool.promptTemplate;

      const missingFields: string[] = [];

      tool.inputs.forEach((input) => {

        const value = formData[input.name];

        if (!value || value.trim() === "") {
          missingFields.push(input.label);
        }

        const regex = new RegExp(`{{${input.name}}}`, "g");

        prompt = prompt.replace(regex, value || "");

      });

      if (missingFields.length > 0) {
        throw new Error(`Please fill in all fields: ${missingFields.join(", ")}`);
      }

      const generatedText = await generateContent(prompt);

      if (!generatedText) {
        throw new Error("AI failed to generate content");
      }

      setResult(generatedText);

    } catch (err: any) {

      setError(err?.message || "Something went wrong");

    } finally {

      setIsLoading(false);

    }

  };

  const copyToClipboard = async () => {

    try {

      await navigator.clipboard.writeText(result);

      setCopied(true);

      setTimeout(() => setCopied(false), 2000);

    } catch {

      setError("Failed to copy text");

    }

  };

  return (

    <>

      <SEOHead
        title={`${tool.name} - Free AI Tool`}
        description={tool.description}
        keywords={`ai tool, ${tool.name.toLowerCase()}, free ai generator`}
      />

      <div className="max-w-4xl mx-auto">

        {/* Header */}

        <div className="text-center mb-8">

          <div className="inline-flex items-center justify-center p-3 bg-indigo-100 rounded-xl mb-4 text-indigo-600">
            <Icon className="w-8 h-8" />
          </div>

          <h1 className="text-3xl md:text-4xl font-bold text-slate-900 mb-2">
            {tool.name}
          </h1>

          <p className="text-slate-600 text-lg max-w-2xl mx-auto">
            {tool.description}
          </p>

        </div>

        {/* Tool Form */}

        <div className="bg-white rounded-2xl shadow-sm border border-slate-200 overflow-hidden">

          <div className="p-6 md:p-8">

            <form onSubmit={handleSubmit} className="space-y-6">

              <div className="grid grid-cols-1 gap-6">

                {tool.inputs.map((input) => (

                  <div key={input.name}>

                    <label className="block text-sm font-medium text-slate-700 mb-2">
                      {input.label}
                    </label>

                    {input.type === "textarea" ? (

                      <textarea
                        className="w-full px-4 py-3 rounded-lg border border-slate-300 focus:ring-2 focus:ring-indigo-500 focus:border-indigo-500 transition-colors min-h-[120px]"
                        placeholder={input.placeholder}
                        value={formData[input.name] || ""}
                        onChange={(e) => handleInputChange(input.name, e.target.value)}
                      />

                    ) : input.type === "select" ? (

                      <select
                        className="w-full px-4 py-3 rounded-lg border border-slate-300 focus:ring-2 focus:ring-indigo-500 focus:border-indigo-500 transition-colors bg-white"
                        value={formData[input.name] || ""}
                        onChange={(e) => handleInputChange(input.name, e.target.value)}
                      >

                        <option value="">Select an option</option>

                        {input.options?.map((opt) => (
                          <option key={opt} value={opt}>
                            {opt}
                          </option>
                        ))}

                      </select>

                    ) : (

                      <input
                        type="text"
                        className="w-full px-4 py-3 rounded-lg border border-slate-300 focus:ring-2 focus:ring-indigo-500 focus:border-indigo-500 transition-colors"
                        placeholder={input.placeholder}
                        value={formData[input.name] || ""}
                        onChange={(e) => handleInputChange(input.name, e.target.value)}
                      />

                    )}

                  </div>

                ))}

              </div>

              {error && (

                <div className="bg-red-50 text-red-600 p-4 rounded-lg flex items-center gap-2 text-sm">
                  <AlertCircle className="w-4 h-4 flex-shrink-0" />
                  {error}
                </div>

              )}

              <button
                type="submit"
                disabled={isLoading}
                className="w-full bg-indigo-600 hover:bg-indigo-700 text-white font-semibold py-4 rounded-xl transition-all transform hover:scale-[1.01] active:scale-[0.99] flex items-center justify-center gap-2 shadow-lg shadow-indigo-200 disabled:opacity-70 disabled:cursor-not-allowed"
              >

                {isLoading ? (
                  <>
                    <Loader2 className="w-5 h-5 animate-spin" />
                    Generating...
                  </>
                ) : (
                  <>
                    <Sparkles className="w-5 h-5" />
                    Generate Content
                  </>
                )}

              </button>

            </form>

          </div>

          {/* Result */}

          {result && (

            <div className="border-t border-slate-100 bg-slate-50 p-6 md:p-8">

              <div className="flex items-center justify-between mb-4">

                <h3 className="font-bold text-slate-800 flex items-center gap-2">
                  <Check className="w-5 h-5 text-green-500" />
                  Generated Result
                </h3>

                <button
                  onClick={copyToClipboard}
                  className="text-slate-500 hover:text-indigo-600 flex items-center gap-1 text-sm font-medium transition-colors"
                >

                  {copied ? <Check className="w-4 h-4" /> : <Copy className="w-4 h-4" />}

                  {copied ? "Copied!" : "Copy Text"}

                </button>

              </div>

              <div className="bg-white p-6 rounded-xl border border-slate-200 shadow-sm whitespace-pre-wrap font-mono text-sm text-slate-700 leading-relaxed">
                {result}
              </div>

            </div>

          )}

        </div>

        <AdPlaceholder slot="content" className="mt-8" />

        {/* SEO Content */}

        <div className="mt-12 prose prose-slate max-w-none">

          <h2>How to use the {tool.name}</h2>

          <p>
            Our free <strong>{tool.name}</strong> allows you to generate high-quality content in seconds.
            Simply enter your requirements in the form above.
          </p>

          <h3>Why use this tool?</h3>

          <ul>
            <li><strong>Fast & Free:</strong> No registration required.</li>
            <li><strong>High Quality:</strong> Powered by advanced AI models.</li>
            <li><strong>Easy to Use:</strong> Simple interface for everyone.</li>
          </ul>

        </div>

      </div>

    </>

  );

}
