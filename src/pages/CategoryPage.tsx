import React,{useMemo} from "react"
import { useParams, Link, Navigate } from "react-router-dom"
import { getAllTools, ToolConfig } from "../data/tools"
import { SEOHead } from "../components/SEOHead"
import { Sparkles } from "lucide-react"

export function CategoryPage(){

  const { category } = useParams<{category:string}>()

  if(!category) return <Navigate to="/tools" />

  const allTools:ToolConfig[] = getAllTools()

  /* ✅ FILTER (optimized) */
  const categoryTools = useMemo(()=>{

    return allTools.filter(t =>
      t.category?.toLowerCase() === category.toLowerCase()
    )

  },[category,allTools])

  const title = `${category.charAt(0).toUpperCase()+category.slice(1)} Tools`

  return(

    <>

      <SEOHead
        title={`${title} - Free AI Tools`}
        description={`Browse free ${category} tools. Fast, secure and easy to use.`}
        canonicalUrl={`https://free-ai-tools-lac.vercel.app/category/${category}`}
      />

      <div className="max-w-6xl mx-auto px-6 py-10">

        {/* HEADER */}
        <div className="text-center mb-12">

          <div className="inline-flex p-4 bg-indigo-100 rounded-xl text-indigo-600 mb-4">
            <Sparkles className="w-6 h-6"/>
          </div>

          <h1 className="text-4xl font-bold text-slate-900">
            {title}
          </h1>

          <p className="text-slate-500 mt-2">
            {categoryTools.length} tools available in this category
          </p>

        </div>

        {/* EMPTY */}
        {categoryTools.length===0 ? (

          <div className="text-center py-16">

            <p className="text-slate-500">
              No tools found in this category
            </p>

            <Link
              to="/tools"
              className="inline-block mt-4 text-indigo-600 font-medium hover:underline"
            >
              Browse All Tools
            </Link>

          </div>

        ) : (

          /* GRID */
          <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-6">

            {categoryTools.map(tool=>{

              const Icon = tool.icon

              return(

                <Link
                  key={tool.id}
                  to={tool.path}
                  className="group bg-white p-6 rounded-2xl border border-slate-200 hover:border-indigo-200 hover:shadow-md transition"
                >

                  <div className="flex items-center gap-3 mb-3">

                    <div className="p-2 rounded-lg bg-slate-100 text-indigo-600 group-hover:bg-indigo-600 group-hover:text-white transition">
                      <Icon size={20}/>
                    </div>

                    <h3 className="font-semibold text-slate-900 group-hover:text-indigo-600 transition">
                      {tool.name}
                    </h3>

                  </div>

                  <p className="text-sm text-slate-500 line-clamp-2">
                    {tool.description}
                  </p>

                </Link>

              )

            })}

          </div>

        )}

      </div>

    </>

  )

}
