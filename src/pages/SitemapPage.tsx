import React from 'react';
import { Link } from 'react-router-dom';
import { tools, seoModifiers } from '../data/tools';
import { SEOHead } from '../components/SEOHead';

export function SitemapPage() {

  const generatedLinks:any[] = [];

  /* ---------- TOOL LINKS ---------- */
  tools.forEach(tool => {

    // Core tool
    generatedLinks.push({
      name: tool.name,
      path: tool.path,
      type: 'tool'
    });

    // SEO modifier pages
    const toolSlug = tool.id.replace('ai-', '');
    const modifiers = seoModifiers[toolSlug as keyof typeof seoModifiers];

    if (modifiers) {
      modifiers.forEach(mod => {
        generatedLinks.push({
          name: `${tool.name} for ${mod.name}`,
          path: `/ai-${toolSlug}-for-${mod.slug}`,
          type: 'seo'
        });
      });
    }
  });

  /* ---------- STATIC ---------- */
  const staticPages = [
    { name: 'Home', path: '/' },
    { name: 'Categories', path: '/categories' },
    { name: 'Search Tools', path: '/search' },
    { name: 'About Us', path: '/about' },
    { name: 'Contact Us', path: '/contact' },
    { name: 'Privacy Policy', path: '/privacy-policy' },
    { name: 'Terms and Conditions', path: '/terms-and-conditions' },
    { name: 'Disclaimer', path: '/disclaimer' },
  ];

  /* ---------- CATEGORY ---------- */
  const categories = [
    { name: 'Social Tools', path: '/category/social' },
    { name: 'Business Tools', path: '/category/business' },
    { name: 'Writing Tools', path: '/category/writing' },
    { name: 'General Tools', path: '/category/general' },
  ];

  /* ---------- BLOG (AUTO SEO) ---------- */
  const blogPages = [
    { name: 'AI Tools for Students', path: '/blog/ai-tools-for-students' },
    { name: 'Best Free AI Tools', path: '/blog/best-free-ai-tools' },
    { name: 'AI Tools for Instagram', path: '/blog/ai-tools-for-instagram' },
    { name: 'Free AI Content Generator', path: '/blog/free-ai-content-generator' },
  ];

  return (
    <>
      <SEOHead
        title="Sitemap - Free AI Tools Platform"
        description="Explore all AI tools, blog guides, and pages available on Free AI Tools Platform."
        canonicalUrl="https://free-ai-tools-lac.vercel.app/sitemap"
      />

      <div className="max-w-5xl mx-auto p-6">

        <h1 className="text-3xl font-bold mb-8">Sitemap</h1>

        <div className="grid md:grid-cols-2 gap-12">

          {/* LEFT */}
          <div>

            {/* STATIC */}
            <h2 className="text-xl font-bold mb-4 text-indigo-600">Core Pages</h2>
            <ul className="space-y-2">
              {staticPages.map(p => (
                <li key={p.path}>
                  <Link to={p.path} className="text-slate-600 hover:text-indigo-600 hover:underline">
                    {p.name}
                  </Link>
                </li>
              ))}
            </ul>

            {/* CATEGORY */}
            <h2 className="text-xl font-bold mt-8 mb-4 text-indigo-600">Categories</h2>
            <ul className="space-y-2">
              {categories.map(c => (
                <li key={c.path}>
                  <Link to={c.path} className="text-slate-600 hover:text-indigo-600 hover:underline">
                    {c.name}
                  </Link>
                </li>
              ))}
            </ul>

            {/* BLOG */}
            <h2 className="text-xl font-bold mt-8 mb-4 text-indigo-600">Blog Guides</h2>
            <ul className="space-y-2">
              {blogPages.map(b => (
                <li key={b.path}>
                  <Link to={b.path} className="text-slate-600 hover:text-indigo-600 hover:underline">
                    {b.name}
                  </Link>
                </li>
              ))}
            </ul>

          </div>

          {/* RIGHT */}
          <div>

            {/* TOOLS */}
            <h2 className="text-xl font-bold mb-4 text-indigo-600">AI Tools</h2>
            <ul className="space-y-2">
              {generatedLinks.filter(l => l.type === 'tool').map(link => (
                <li key={link.path}>
                  <Link to={link.path} className="text-slate-600 hover:text-indigo-600 hover:underline">
                    {link.name}
                  </Link>
                </li>
              ))}
            </ul>

            {/* SEO PAGES */}
            <h2 className="text-xl font-bold mt-8 mb-4 text-indigo-600">Specialized Pages</h2>
            <ul className="space-y-2">
              {generatedLinks.filter(l => l.type === 'seo').map(link => (
                <li key={link.path}>
                  <Link to={link.path} className="text-slate-600 hover:text-indigo-600 hover:underline">
                    {link.name}
                  </Link>
                </li>
              ))}
            </ul>

          </div>

        </div>

      </div>
    </>
  );
}
