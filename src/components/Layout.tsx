import React from 'react';
import { Link, Outlet } from 'react-router-dom';
import { Menu, X, Bot, FileText, Mail, PenTool, Hash, User, Image } from 'lucide-react';
import { AdPlaceholder } from './AdPlaceholder';
import ScrollToTop from './ScrollToTop';

export function Layout() {
  const [isMenuOpen, setIsMenuOpen] = React.useState(false);

  const toggleMenu = () => setIsMenuOpen(!isMenuOpen);

  const navLinks = [
    { name: 'Home', path: '/' },
    { name: 'Tools', path: '/tools' },
    { name: 'About', path: '/about' },
    { name: 'Contact', path: '/contact' },
  ];

  const tools = [
    { name: 'Chatbot', icon: Bot, path: '/tools/ai-chatbot' },
    { name: 'Caption Generator', icon: FileText, path: '/tools/ai-caption-generator' },
    { name: 'Resume Builder', icon: User, path: '/tools/ai-resume-builder' },
    { name: 'Email Writer', icon: Mail, path: '/tools/ai-email-writer' },
    { name: 'Blog Writer', icon: PenTool, path: '/tools/ai-blog-writer' },
    { name: 'Hashtag Generator', icon: Hash, path: '/tools/ai-hashtag-generator' },
    { name: 'Image Generator', icon: Image, path: '/tools/ai-image-generator' }
  ];

  return (
    <>
      <ScrollToTop />

      <div className="min-h-screen flex flex-col bg-slate-50 font-sans text-slate-900">

        {/* Header */}
        <header className="bg-white border-b border-slate-200 sticky top-0 z-50">
          <div className="container mx-auto px-4 h-16 flex items-center justify-between">

            <Link to="/" className="flex items-center gap-2 font-bold text-xl text-indigo-600">
              <Bot className="w-8 h-8" />
              <span>AI Tools Platform</span>
            </Link>

            {/* Desktop Nav */}
            <nav className="hidden md:flex items-center gap-6">
              {navLinks.map((link) => (
                <Link key={link.name} to={link.path} className="text-slate-600 hover:text-indigo-600 font-medium transition-colors">
                  {link.name}
                </Link>
              ))}
              <Link to="/tools" className="bg-indigo-600 text-white px-4 py-2 rounded-lg hover:bg-indigo-700 transition-colors font-medium">
                Get Started
              </Link>
            </nav>

            {/* Mobile Menu Button */}
            <button onClick={toggleMenu} className="md:hidden p-2 text-slate-600 hover:bg-slate-100 rounded-lg">
              {isMenuOpen ? <X /> : <Menu />}
            </button>

          </div>

          {/* Mobile Nav */}
          {isMenuOpen && (
            <div className="md:hidden bg-white border-t border-slate-200 p-4 absolute w-full shadow-lg">
              <nav className="flex flex-col gap-4">

                {navLinks.map((link) => (
                  <Link key={link.name} to={link.path} className="text-slate-600 hover:text-indigo-600 font-medium py-2 border-b border-slate-100 last:border-0" onClick={() => setIsMenuOpen(false)}>
                    {link.name}
                  </Link>
                ))}

                <div className="pt-2">
                  <p className="text-xs font-semibold text-slate-400 uppercase tracking-wider mb-2">Popular Tools</p>

                  <div className="grid grid-cols-2 gap-2">
                    {tools.slice(0, 4).map((tool) => (
                      <Link key={tool.name} to={tool.path} className="flex items-center gap-2 text-sm text-slate-600 hover:text-indigo-600 p-2 rounded hover:bg-slate-50" onClick={() => setIsMenuOpen(false)}>
                        <tool.icon className="w-4 h-4" />
                        {tool.name}
                      </Link>
                    ))}
                  </div>
                </div>

              </nav>
            </div>
          )}

        </header>

        {/* Header Ad */}
        <div className="container mx-auto px-4">
          <AdPlaceholder slot="header" />
        </div>

        {/* Main Content */}
        <main className="flex-grow container mx-auto px-4 py-8">

          <div className="grid grid-cols-1 lg:grid-cols-12 gap-8">

            <div className="lg:col-span-9">
              <Outlet />
            </div>

            {/* Sidebar */}
            <aside className="lg:col-span-3 space-y-8">

              <div className="bg-white p-6 rounded-xl border border-slate-200 shadow-sm">
                <h3 className="font-bold text-lg mb-4 text-slate-800">Popular Tools</h3>

                <ul className="space-y-3">
                  {tools.map((tool) => (
                    <li key={tool.name}>
                      <Link to={tool.path} className="flex items-center gap-3 text-slate-600 hover:text-indigo-600 group">
                        <div className="p-2 bg-slate-100 rounded-lg group-hover:bg-indigo-50 group-hover:text-indigo-600 transition-colors">
                          <tool.icon className="w-4 h-4" />
                        </div>
                        <span className="font-medium text-sm">{tool.name}</span>
                      </Link>
                    </li>
                  ))}
                </ul>
              </div>

              <AdPlaceholder slot="sidebar" />

            </aside>

          </div>

        </main>

        {/* Footer */}
        <footer className="bg-white border-t border-slate-200 py-12 mt-8">
          <div className="container mx-auto px-4">
            <div className="border-t border-slate-100 pt-8 text-center text-slate-400 text-sm">
              © {new Date().getFullYear()} AI Tools Platform. All rights reserved.
            </div>
          </div>
        </footer>

      </div>
    </>
  );
}
