import React from "react"
import { Link } from "react-router-dom"
import { getAllTools, ToolConfig } from "../data/tools"

interface RelatedToolsProps{
  currentId:string
  category:string
}

export function RelatedTools({ currentId, category }: RelatedToolsProps){

  const allTools:ToolConfig[] = getAllTools()

  /* ✅ FILTER + SAFE FALLBACK */
  const related = allTools
    .filter(t => t.category === category && t.id !== currentId)
    .slice(0,4)

  /* ❌ NO RELATED */
  if(!related || related.length === 0) return null

  return(

    <div className="mt-16">

      <h2 className="text-2xl font-bold mb-6">
        Related Tools
      </h2>

      <div className="grid md:grid-cols-2 lg:grid-cols-4 gap-6">

        {related.map(tool=>{

          const Icon = tool.icon

          return(

            <Link
              key={tool.id}
              to={tool.path}
              className="group bg-white border border-slate-200 p-5 rounded-xl hover:shadow-md hover:border-indigo-200 transition"
            >

              <div className="flex items-center gap-3 mb-3">

                <div className="p-2 bg-slate-100 rounded-lg text-indigo-600 group-hover:bg-indigo-600 group-hover:text-white transition">
                  <Icon size={18}/>
                </div>

                <h3 className="font-semibold text-sm text-slate-900 group-hover:text-indigo-600 transition">
                  {tool.name}
                </h3>

              </div>

              <p className="text-xs text-slate-500 line-clamp-2">
                {tool.description}
              </p>

            </Link>

          )

        })}

      </div>

    </div>

  )

}
