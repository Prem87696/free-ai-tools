import React from 'react';
import { Link, Outlet } from 'react-router-dom';
import { Menu, X, Bot, FileText, Mail, PenTool, Hash, User } from 'lucide-react';
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
                <Link
                  key={link.name}
                  to={link.path}
                  className="text-slate-600 hover:text-indigo-600 font-medium transition-colors"
                >
                  {link.name}
                </Link>
              ))}
              <Link
                to="/tools"
                className="bg-indigo-600 text-white px-4 py-2 rounded-lg hover:bg-indigo-700 transition-colors font-medium"
              >
                Get Started
              </Link>
            </nav>

            {/* Mobile Menu Button */}
            <button
              onClick={toggleMenu}
              className="md:hidden p-2 text-slate-600 hover:bg-slate-100 rounded-lg"
            >
              {isMenuOpen ? <X /> : <Menu />}
            </button>

          </div>

          {/* Mobile Nav */}
          {isMenuOpen && (
            <div className="md:hidden bg-white border-t border-slate-200 p-4 absolute w-full shadow-lg">
              <nav className="flex flex-col gap-4">

                {navLinks.map((link) => (
                  <Link
                    key={link.name}
                    to={link.path}
                    className="text-slate-600 hover:text-indigo-600 font-medium py-2 border-b border-slate-100 last:border-0"
                    onClick={() => setIsMenuOpen(false)}
                  >
                    {link.name}
                  </Link>
                ))}

                <div className="pt-2">
                  <p className="text-xs font-semibold text-slate-400 uppercase tracking-wider mb-2">
                    Popular Tools
                  </p>

                  <div className="grid grid-cols-2 gap-2">
                    {tools.slice(0, 4).map((tool) => (
                      <Link
                        key={tool.name}
                        to={tool.path}
                        className="flex items-center gap-2 text-sm text-slate-600 hover:text-indigo-600 p-2 rounded hover:bg-slate-50"
                        onClick={() => setIsMenuOpen(false)}
                      >
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
                <h3 className="font-bold text-lg mb-4 text-slate-800">
                  Popular Tools
                </h3>

                <ul className="space-y-3">
                  {tools.map((tool) => (
                    <li key={tool.name}>
                      <Link
                        to={tool.path}
                        className="flex items-center gap-3 text-slate-600 hover:text-indigo-600 group"
                      >
                        <div className="p-2 bg-slate-100 rounded-lg group-hover:bg-indigo-50 group-hover:text-indigo-600 transition-colors">
                          <tool.icon className="w-4 h-4" />
                        </div>
                        <span className="font-medium text-sm">
                          {tool.name}
                        </span>
                      </Link>
                    </li>
                  ))}
                </ul>
              </div>

              <AdPlaceholder slot="sidebar" />

              <div className="bg-indigo-50 p-6 rounded-xl border border-indigo-100">
                <h3 className="font-bold text-lg mb-2 text-indigo-900">
                  Need Custom AI?
                </h3>
                <p className="text-indigo-700 text-sm mb-4">
                  Contact us for enterprise solutions and custom AI tool development.
                </p>

                <Link
                  to="/contact"
                  className="block w-full text-center bg-indigo-600 text-white py-2 rounded-lg hover:bg-indigo-700 transition-colors text-sm font-medium"
                >
                  Contact Sales
                </Link>
              </div>

            </aside>

          </div>

        </main>

        {/* Footer Ad */}
        <div className="container mx-auto px-4">
          <AdPlaceholder slot="footer" />
        </div>

        {/* Footer */}
        <footer className="bg-white border-t border-slate-200 py-12 mt-8">
          <div className="container mx-auto px-4">

            <div className="grid grid-cols-1 md:grid-cols-4 gap-8 mb-8">

              <div className="col-span-1 md:col-span-2">

                <Link
                  to="/"
                  className="flex items-center gap-2 font-bold text-xl text-indigo-600 mb-4"
                >
                  <Bot className="w-6 h-6" />
                  <span>AI Tools Platform</span>
                </Link>

                <p className="text-slate-500 text-sm leading-relaxed max-w-md">
                  Free AI Tools Platform provides cutting-edge artificial intelligence utilities for content creators, students, and professionals.
                </p>

              </div>

              <div>
                <h4 className="font-bold text-slate-900 mb-4">Tools</h4>
                <ul className="space-y-2 text-sm text-slate-500">
                  <li><Link to="/tools/ai-caption-generator">Caption Generator</Link></li>
                  <li><Link to="/tools/ai-resume-builder">Resume Builder</Link></li>
                  <li><Link to="/tools/ai-email-writer">Email Writer</Link></li>
                  <li><Link to="/tools/ai-blog-writer">Blog Writer</Link></li>
                </ul>
              </div>

              <div>
                <h4 className="font-bold text-slate-900 mb-4">Legal</h4>
                <ul className="space-y-2 text-sm text-slate-500">
                  <li><Link to="/privacy-policy">Privacy Policy</Link></li>
                  <li><Link to="/terms-and-conditions">Terms & Conditions</Link></li>
                  <li><Link to="/disclaimer">Disclaimer</Link></li>
                  <li><Link to="/contact">Contact Us</Link></li>
                  <li><Link to="/sitemap">Sitemap</Link></li>
                </ul>
              </div>

            </div>

            <div className="border-t border-slate-100 pt-8 text-center text-slate-400 text-sm">
              © {new Date().getFullYear()} AI Tools Platform. All rights reserved.
            </div>

          </div>
        </footer>

      </div>
    </>
  );
}
