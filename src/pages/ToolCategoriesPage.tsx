import React,{useMemo} from "react"
import { getAllTools, ToolConfig } from "../data/tools"
import {Link} from "react-router-dom"
import {Bot,Image,FileText,Sparkles} from "lucide-react"
import { SEOHead } from "../components/SEOHead"

export function ToolCategoriesPage(){

  const allTools:ToolConfig[] = getAllTools()

  /* ✅ UNIQUE CATEGORIES (optimized) */
  const categories = useMemo(()=>{

    return [...new Set(
      allTools
        .map(t=>t.category)
        .filter(Boolean)
    )].sort()

  },[allTools])

  /* ✅ ICON MAP */
  const iconMap:Record<string, React.ElementType> = {
    general:Sparkles,
    social:Bot,
    business:FileText,
    writing:FileText,
    image:Image
  }

  return(

    <>

      <SEOHead
        title="Tool Categories - Free AI Tools"
        description="Browse AI tools by category including social, business, writing and general tools."
        canonicalUrl="https://free-ai-tools-lac.vercel.app/categories"
      />

      <div className="max-w-6xl mx-auto px-6 py-12">

        {/* HEADER */}
        <div className="text-center mb-14">

          <h1 className="text-4xl md:text-5xl font-bold text-slate-900">
            Tool Categories
          </h1>

          <p className="text-slate-500 mt-3 text-lg">
            Browse AI tools by category
          </p>

        </div>

        {/* GRID */}
        <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 gap-6">

          {categories.map(cat=>{

            const Icon = iconMap[cat || ""] || Sparkles

            const count = allTools.filter(t=>t.category === cat).length

            return(

              <Link
                key={cat}
                to={`/category/${cat}`}
                className="group bg-white border border-slate-200 p-8 rounded-2xl hover:shadow-lg hover:border-indigo-200 transition flex flex-col items-center text-center"
              >

                <div className="p-4 rounded-xl bg-indigo-50 text-indigo-600 mb-4 group-hover:bg-indigo-600 group-hover:text-white transition">
                  <Icon size={28}/>
                </div>

                <h3 className="font-semibold text-lg capitalize text-slate-900 group-hover:text-indigo-600 transition">
                  {cat}
                </h3>

                <p className="text-sm text-slate-500 mt-1">
                  {count} tools available
                </p>

              </Link>

            )

          })}

        </div>

      </div>

    </>

  )

}
