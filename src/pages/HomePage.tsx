import React from 'react';
import { Link } from 'react-router-dom';
import { tools } from '../data/tools';
import { SEOHead } from '../components/SEOHead';
import { ArrowRight, Sparkles } from 'lucide-react';

export function HomePage() {
  const categories = ['All', 'Social', 'Business', 'Writing', 'General'];
  const [activeCategory, setActiveCategory] = React.useState('All');

  const filteredTools = activeCategory === 'All' 
    ? tools 
    : tools.filter(t => t.category.toLowerCase() === activeCategory.toLowerCase());

  return (
    <>
      <SEOHead 
        title="Free AI Tools Platform - Generate Content Instantly"
        description="Access a suite of free AI tools for writing, social media, business, and more. No sign-up required."
      />

      {/* Hero Section */}
      <section className="text-center py-12 md:py-20">
        <div className="inline-flex items-center gap-2 bg-indigo-50 text-indigo-700 px-4 py-2 rounded-full text-sm font-medium mb-6">
          <Sparkles className="w-4 h-4" />
          <span>Powered by Advanced AI Models</span>
        </div>
        <h1 className="text-4xl md:text-6xl font-extrabold text-slate-900 mb-6 tracking-tight">
          Free AI Tools for <span className="text-indigo-600">Everyone</span>
        </h1>
        <p className="text-lg md:text-xl text-slate-600 max-w-2xl mx-auto mb-10">
          Boost your productivity with our collection of free AI generators. 
          Create content, write emails, and solve problems in seconds.
        </p>
      </section>

      {/* Category Filter */}
      <div className="flex flex-wrap justify-center gap-2 mb-12">
        {categories.map((cat) => (
          <button
            key={cat}
            onClick={() => setActiveCategory(cat)}
            className={`px-6 py-2 rounded-full text-sm font-medium transition-all ${
              activeCategory === cat
                ? 'bg-indigo-600 text-white shadow-lg shadow-indigo-200'
                : 'bg-white text-slate-600 border border-slate-200 hover:bg-slate-50'
            }`}
          >
            {cat}
          </button>
        ))}
      </div>

      {/* Tools Grid */}
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
        {filteredTools.map((tool) => (
          <Link 
            key={tool.id} 
            to={tool.path}
            className="group bg-white p-6 rounded-2xl border border-slate-200 shadow-sm hover:shadow-md hover:border-indigo-200 transition-all duration-300 flex flex-col h-full"
          >
            <div className="flex items-start justify-between mb-4">
              <div className="p-3 bg-indigo-50 text-indigo-600 rounded-xl group-hover:bg-indigo-600 group-hover:text-white transition-colors">
                <tool.icon className="w-6 h-6" />
              </div>
              <span className="bg-slate-100 text-slate-500 text-xs font-semibold px-2 py-1 rounded uppercase tracking-wide">
                {tool.category}
              </span>
            </div>
            <h3 className="text-xl font-bold text-slate-900 mb-2 group-hover:text-indigo-600 transition-colors">
              {tool.name}
            </h3>
            <p className="text-slate-500 text-sm mb-6 flex-grow">
              {tool.description}
            </p>
            <div className="flex items-center text-indigo-600 font-medium text-sm mt-auto">
              Try Tool <ArrowRight className="w-4 h-4 ml-1 group-hover:translate-x-1 transition-transform" />
            </div>
          </Link>
        ))}
      </div>

      {/* SEO Content */}
      <section className="mt-20 prose prose-slate max-w-none bg-white p-8 rounded-2xl border border-slate-100">
        <h2>Why Use Our Free AI Tools?</h2>
        <p>
          Artificial Intelligence has revolutionized how we work. Our platform provides accessible, 
          easy-to-use tools that leverage this technology to help you save time and improve quality.
        </p>
        <div className="grid md:grid-cols-3 gap-8 not-prose mt-8">
          <div>
            <h3 className="font-bold text-lg mb-2">100% Free</h3>
            <p className="text-slate-600 text-sm">No credit cards, no subscriptions. Just free tools accessible to everyone.</p>
          </div>
          <div>
            <h3 className="font-bold text-lg mb-2">No Sign-up</h3>
            <p className="text-slate-600 text-sm">Start generating content immediately without creating an account.</p>
          </div>
          <div>
            <h3 className="font-bold text-lg mb-2">Secure & Private</h3>
            <p className="text-slate-600 text-sm">We don't store your inputs or generated content. Your privacy is priority.</p>
          </div>
        </div>
      </section>
    </>
  );
}
