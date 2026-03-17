import React from "react"
import { Helmet } from "react-helmet-async"

interface SEOHeadProps{
  title:string
  description:string
  canonicalUrl?:string
  keywords?:string
  image?:string
}

export function SEOHead({
  title,
  description,
  canonicalUrl,
  keywords,
  image
}:SEOHeadProps){

  const siteTitle="Free AI Tools Platform"

  const fullTitle=
    title===siteTitle
    ?title
    :`${title} | ${siteTitle}`

  const defaultImage=
    image ||
    "https://free-ai-tools-lac.vercel.app/logo.png"

  const canonical=
    canonicalUrl ||
    "https://free-ai-tools-lac.vercel.app"

  // ✅ NEW: Structured Data
  const structuredData = {
    "@context": "https://schema.org",
    "@type": "WebSite",
    name: siteTitle,
    url: "https://free-ai-tools-lac.vercel.app",
    potentialAction: {
      "@type": "SearchAction",
      target:
        "https://free-ai-tools-lac.vercel.app/search?q={search_term_string}",
      "query-input": "required name=search_term_string",
    },
  }

  return(

    <Helmet>

      {/* BASIC SEO */}
      <title>{fullTitle}</title>
      <meta name="description" content={description}/>

      {keywords && (
        <meta name="keywords" content={keywords}/>
      )}

      <link rel="canonical" href={canonical}/>

      {/* OPEN GRAPH */}
      <meta property="og:title" content={fullTitle}/>
      <meta property="og:description" content={description}/>
      <meta property="og:type" content="website"/>
      <meta property="og:url" content={canonical}/>
      <meta property="og:image" content={defaultImage}/>

      {/* TWITTER */}
      <meta name="twitter:card" content="summary_large_image"/>
      <meta name="twitter:title" content={fullTitle}/>
      <meta name="twitter:description" content={description}/>
      <meta name="twitter:image" content={defaultImage}/>

      {/* ✅ NEW: Structured Data */}
      <script type="application/ld+json">
        {JSON.stringify(structuredData)}
      </script>

    </Helmet>

  )

}
