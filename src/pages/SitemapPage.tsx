import React from 'react';
import { Link } from 'react-router-dom';
import { tools, seoModifiers } from '../data/tools';
import { SEOHead } from '../components/SEOHead';

export function SitemapPage() {
  const generatedLinks = [];

  // Generate links for all tools + modifiers
  tools.forEach(tool => {
    // Core tool link
    generatedLinks.push({
      name: tool.name,
      path: tool.path,
      category: 'Core Tools'
    });

    // SEO modifier links
    const toolSlug = tool.id.replace('ai-', '');
    if (seoModifiers[toolSlug as keyof typeof seoModifiers]) {
      const modifiers = seoModifiers[toolSlug as keyof typeof seoModifiers];
      modifiers.forEach(mod => {
        generatedLinks.push({
          name: `${tool.name} for ${mod.name}`,
          path: `/ai-${toolSlug}-for-${mod.slug}`,
          category: 'Specialized Tools'
        });
      });
    }
  });

  // Static pages
  const staticPages = [
    { name: 'Home', path: '/' },
    { name: 'About Us', path: '/about' },
    { name: 'Contact Us', path: '/contact' },
    { name: 'Privacy Policy', path: '/privacy-policy' },
    { name: 'Terms and Conditions', path: '/terms-and-conditions' },
    { name: 'Disclaimer', path: '/disclaimer' },
  ];

  return (
    <>
      <SEOHead title="Sitemap" description="Complete list of all tools and pages on Free AI Tools Platform." />
      <div className="max-w-4xl mx-auto">
        <h1 className="text-3xl font-bold mb-8">Sitemap</h1>
        
        <div className="grid md:grid-cols-2 gap-12">
          <div>
            <h2 className="text-xl font-bold mb-4 text-indigo-600">Core Pages</h2>
            <ul className="space-y-2">
              {staticPages.map(page => (
                <li key={page.path}>
                  <Link to={page.path} className="text-slate-600 hover:text-indigo-600 hover:underline">
                    {page.name}
                  </Link>
                </li>
              ))}
            </ul>

            <h2 className="text-xl font-bold mt-8 mb-4 text-indigo-600">AI Tools</h2>
            <ul className="space-y-2">
              {generatedLinks.filter(l => l.category === 'Core Tools').map(link => (
                <li key={link.path}>
                  <Link to={link.path} className="text-slate-600 hover:text-indigo-600 hover:underline">
                    {link.name}
                  </Link>
                </li>
              ))}
            </ul>
          </div>

          <div>
            <h2 className="text-xl font-bold mb-4 text-indigo-600">Specialized Generators</h2>
            <ul className="space-y-2">
              {generatedLinks.filter(l => l.category === 'Specialized Tools').map(link => (
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
