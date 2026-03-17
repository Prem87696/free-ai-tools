import React,{useEffect,useState} from "react"
import { Link } from "react-router-dom"
import { getAllTools, ToolConfig } from "../data/tools"
import { TrendingUp } from "lucide-react"

export function TrendingTools(){

  const [trending,setTrending]=useState<ToolConfig[]>([])

  useEffect(()=>{

    try{

      const allTools = getAllTools()

      /* ✅ SAFE STORAGE READ */
      const stats = typeof window !== "undefined"
        ? JSON.parse(localStorage.getItem("analytics") || "{}")
        : {}

      /* ✅ SORT BY USAGE */
      const sorted = [...allTools].sort((a,b)=>{
        return (stats[b.name] || 0) - (stats[a.name] || 0)
      })

      /* ✅ FALLBACK (if no analytics yet) */
      const fallback = allTools.filter(t=>t.trending)

      setTrending(sorted.length ? sorted.slice(0,6) : fallback.slice(0,6))

    }catch{
      setTrending([])
    }

  },[])

  /* ❌ NO DATA */
  if(!trending || trending.length === 0) return null

  return(

    <section className="mt-20">

      <div className="flex items-center gap-2 mb-6">

        <TrendingUp className="text-indigo-600"/>

        <h2 className="text-2xl font-bold">
          🔥 Trending Tools
        </h2>

      </div>

      <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-6">

        {trending.map(tool=>{

          const Icon = tool.icon

          return(

            <Link
              key={tool.id}
              to={tool.path}
              className="group bg-white border border-slate-200 p-6 rounded-xl hover:shadow-md hover:border-indigo-200 transition"
            >

              <div className="flex items-center gap-3 mb-3">

                <div className="p-2 bg-slate-100 rounded-lg text-indigo-600 group-hover:bg-indigo-600 group-hover:text-white transition">
                  <Icon size={18}/>
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

    </section>

  )

}
