import React from 'react';
import { useParams, Navigate, Link } from 'react-router-dom';
import { tools, seoModifiers } from '../data/tools';
import { generateContent } from '../services/gemini';
import { SEOHead } from '../components/SEOHead';
import { AdPlaceholder } from '../components/AdPlaceholder';
import { Loader2, Copy, Check, AlertCircle, Sparkles } from 'lucide-react';

export function DynamicSEOPage() {
  const { slug } = useParams();
  
  // Parse the slug to find matching tool and modifier
  // Expected format: ai-[tool]-for-[modifier]
  // e.g. ai-caption-generator-for-instagram
  
  let matchedTool = null;
  let matchedModifier = null;

  // This is a simple parser. In a real app, you might want a more robust routing map.
  if (slug && slug.startsWith('ai-')) {
    const parts = slug.replace('ai-', '').split('-for-');
    if (parts.length === 2) {
      const toolSlug = parts[0]; // e.g. caption-generator
      const modifierSlug = parts[1]; // e.g. instagram

      matchedTool = tools.find(t => t.id === `ai-${toolSlug}`);
      
      if (matchedTool && seoModifiers[toolSlug as keyof typeof seoModifiers]) {
        const modifiers = seoModifiers[toolSlug as keyof typeof seoModifiers];
        matchedModifier = modifiers.find(m => m.slug === modifierSlug);
      }
    }
  }

  if (!matchedTool || !matchedModifier) {
    // If not a valid SEO page, maybe it's a static page or 404
    // For now, redirect to 404
    return <Navigate to="/404" />;
  }

  const [formData, setFormData] = React.useState<Record<string, string>>({});
  const [result, setResult] = React.useState('');
  const [isLoading, setIsLoading] = React.useState(false);
  const [error, setError] = React.useState('');
  const [copied, setCopied] = React.useState(false);

  const pageTitle = `${matchedTool.name} for ${matchedModifier.name}`;
  const pageDescription = `Free AI ${matchedTool.name} specifically designed for ${matchedModifier.name}. Generate optimized content for ${matchedModifier.name} instantly.`;

  const handleInputChange = (name: string, value: string) => {
    setFormData(prev => ({ ...prev, [name]: value }));
  };

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setIsLoading(true);
    setError('');
    setResult('');

    try {
      // Construct prompt with modifier context
      let prompt = matchedTool!.promptTemplate;
      
      // Append context to prompt
      prompt += ` \n\nIMPORTANT: Optimize this content specifically ${matchedModifier!.context}.`;

      let missingFields = [];

      matchedTool!.inputs.forEach(input => {
        const value = formData[input.name];
        if (!value) {
          missingFields.push(input.label);
        }
        prompt = prompt.replace(`{{${input.name}}}`, value || '');
      });

      if (missingFields.length > 0) {
        throw new Error(`Please fill in all fields: ${missingFields.join(', ')}`);
      }

      const generatedText = await generateContent(prompt);
      setResult(generatedText);
    } catch (err: any) {
      setError(err.message || 'Something went wrong');
    } finally {
      setIsLoading(false);
    }
  };

  const copyToClipboard = () => {
    navigator.clipboard.writeText(result);
    setCopied(true);
    setTimeout(() => setCopied(false), 2000);
  };

  return (
    <>
      <SEOHead 
        title={`${pageTitle} - Free AI Tool`}
        description={pageDescription}
        keywords={`ai ${matchedTool.name.toLowerCase()}, ${matchedModifier.name.toLowerCase()}, free ai generator`}
        canonicalUrl={`/${slug}`}
      />

      <div className="max-w-4xl mx-auto">
        {/* Breadcrumbs */}
        <nav className="text-sm text-slate-500 mb-6">
          <Link to="/" className="hover:text-indigo-600">Home</Link>
          <span className="mx-2">/</span>
          <Link to="/tools" className="hover:text-indigo-600">Tools</Link>
          <span className="mx-2">/</span>
          <span className="text-slate-900 font-medium">{pageTitle}</span>
        </nav>

        <div className="text-center mb-8">
          <div className="inline-flex items-center justify-center p-3 bg-indigo-100 rounded-xl mb-4 text-indigo-600">
            <matchedTool.icon className="w-8 h-8" />
          </div>
          <h1 className="text-3xl md:text-4xl font-bold text-slate-900 mb-2">{pageTitle}</h1>
          <p className="text-slate-600 text-lg max-w-2xl mx-auto">
            Generate professional, optimized content for {matchedModifier.name} using our specialized AI tool.
          </p>
        </div>

        <div className="bg-white rounded-2xl shadow-sm border border-slate-200 overflow-hidden">
          <div className="p-6 md:p-8">
            <form onSubmit={handleSubmit} className="space-y-6">
              <div className="grid grid-cols-1 gap-6">
                {matchedTool.inputs.map((input) => (
                  <div key={input.name}>
                    <label className="block text-sm font-medium text-slate-700 mb-2">
                      {input.label}
                    </label>
                    {input.type === 'textarea' ? (
                      <textarea
                        className="w-full px-4 py-3 rounded-lg border border-slate-300 focus:ring-2 focus:ring-indigo-500 focus:border-indigo-500 transition-colors min-h-[120px]"
                        placeholder={input.placeholder}
                        value={formData[input.name] || ''}
                        onChange={(e) => handleInputChange(input.name, e.target.value)}
                      />
                    ) : input.type === 'select' ? (
                      <select
                        className="w-full px-4 py-3 rounded-lg border border-slate-300 focus:ring-2 focus:ring-indigo-500 focus:border-indigo-500 transition-colors bg-white"
                        value={formData[input.name] || ''}
                        onChange={(e) => handleInputChange(input.name, e.target.value)}
                      >
                        <option value="">Select an option</option>
                        {input.options?.map(opt => (
                          <option key={opt} value={opt}>{opt}</option>
                        ))}
                      </select>
                    ) : (
                      <input
                        type="text"
                        className="w-full px-4 py-3 rounded-lg border border-slate-300 focus:ring-2 focus:ring-indigo-500 focus:border-indigo-500 transition-colors"
                        placeholder={input.placeholder}
                        value={formData[input.name] || ''}
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
                    Generating for {matchedModifier.name}...
                  </>
                ) : (
                  <>
                    <Sparkles className="w-5 h-5" />
                    Generate Optimized Content
                  </>
                )}
              </button>
            </form>
          </div>
          
          {/* Result Section */}
          {result && (
            <div className="border-t border-slate-100 bg-slate-50 p-6 md:p-8 animate-in fade-in slide-in-from-bottom-4 duration-500">
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
                  {copied ? 'Copied!' : 'Copy Text'}
                </button>
              </div>
              <div className="bg-white p-6 rounded-xl border border-slate-200 shadow-sm whitespace-pre-wrap font-mono text-sm text-slate-700 leading-relaxed">
                {result}
              </div>
            </div>
          )}
        </div>

        <AdPlaceholder slot="content" className="mt-8" />

        {/* SEO Content Section - Programmatic */}
        <div className="mt-12 prose prose-slate max-w-none">
          <h2>Best {matchedTool.name} for {matchedModifier.name}</h2>
          <p>
            Are you looking for the best way to create content for <strong>{matchedModifier.name}</strong>? 
            Our {pageTitle} is designed to help you succeed. Whether you are a professional or just starting out, 
            using AI tools can significantly improve your workflow.
          </p>
          
          <h3>How to create content for {matchedModifier.name} with AI</h3>
          <ol>
            <li>Enter your specific topic or requirements in the form above.</li>
            <li>Our AI analyzes your request and applies optimization rules for {matchedModifier.name}.</li>
            <li>Copy the generated result and use it directly on your platform.</li>
          </ol>

          <h3>Benefits of using AI for {matchedModifier.name}</h3>
          <p>
            Creating high-quality content for {matchedModifier.name} requires consistency and creativity. 
            This tool helps you maintain both by providing endless ideas and polished drafts in seconds.
            It is specifically tuned to understand the nuances of {matchedModifier.name}, ensuring your content performs well.
          </p>
        </div>
      </div>
    </>
  );
}
