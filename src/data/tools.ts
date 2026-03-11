import {
Bot,
Mail,
PenTool,
Hash,
ShoppingBag,
User,
Image,
Sparkles,
FileImage,
FilePlus
} from "lucide-react";

import { LucideIcon } from "lucide-react";

export interface ToolInput {
name: string;
label: string;
type: "text" | "textarea" | "select";
placeholder?: string;
options?: string[];
}

export interface ToolConfig {
id: string;
name: string;
description: string;
icon: LucideIcon;
path: string;
promptTemplate: string;
inputs: ToolInput[];
category: "social" | "business" | "writing" | "general";
}

export const tools: ToolConfig[] = [

/* ---------- AI TOOLS ---------- */

{
id: "ai-chatbot",
name: "AI Chatbot",
description: "Ask anything and get instant AI answers.",
icon: Bot,
path: "/tools/ai-chatbot",
promptTemplate: "You are a helpful AI assistant. Answer: {{query}}",
inputs: [
{
name: "query",
label: "Your Question",
type: "textarea",
placeholder: "Ask me anything..."
}
],
category: "general"
},

{
id: "ai-caption-generator",
name: "AI Caption Generator",
description: "Generate engaging captions for social media.",
icon: Image,
path: "/tools/ai-caption-generator",
promptTemplate:
"Generate captions for {{platform}} about {{topic}} with {{tone}} tone.",
inputs: [
{
name: "topic",
label: "Post Topic",
type: "textarea",
placeholder: "Example: Beach sunset photo"
},
{
name: "platform",
label: "Platform",
type: "select",
options: ["Instagram", "TikTok", "Facebook", "LinkedIn", "Twitter"]
},
{
name: "tone",
label: "Tone",
type: "select",
options: ["Funny", "Professional", "Inspirational", "Casual"]
}
],
category: "social"
},

{
id: "ai-resume-builder",
name: "AI Resume Builder",
description: "Create professional resume summaries.",
icon: User,
path: "/tools/ai-resume-builder",
promptTemplate:
"Write resume summary for {{jobTitle}} with skills {{skills}}.",
inputs: [
{
name: "jobTitle",
label: "Job Title",
type: "text",
placeholder: "Example: Software Developer"
},
{
name: "skills",
label: "Skills",
type: "textarea",
placeholder: "Example: React, NodeJS"
}
],
category: "business"
},

{
id: "ai-email-writer",
name: "AI Email Writer",
description: "Generate professional emails instantly.",
icon: Mail,
path: "/tools/ai-email-writer",
promptTemplate:
"Write a {{type}} email to {{recipient}} about {{subject}}.",
inputs: [
{
name: "recipient",
label: "Recipient",
type: "text"
},
{
name: "type",
label: "Email Type",
type: "select",
options: ["Formal", "Casual", "Follow-up", "Cold Outreach"]
},
{
name: "subject",
label: "Subject",
type: "text"
}
],
category: "business"
},

{
id: "ai-blog-writer",
name: "AI Blog Writer",
description: "Generate blog outlines and articles.",
icon: PenTool,
path: "/tools/ai-blog-writer",
promptTemplate:
"Write blog outline about {{title}} for {{audience}}.",
inputs: [
{
name: "title",
label: "Blog Title",
type: "text"
},
{
name: "audience",
label: "Target Audience",
type: "text"
}
],
category: "writing"
},

{
id: "ai-story-generator",
name: "AI Story Generator",
description: "Generate creative stories.",
icon: Sparkles,
path: "/tools/ai-story-generator",
promptTemplate:
"Write a {{genre}} story about {{topic}}.",
inputs: [
{
name: "topic",
label: "Story Topic",
type: "textarea"
},
{
name: "genre",
label: "Genre",
type: "select",
options: ["Sci-Fi", "Fantasy", "Romance", "Horror", "Mystery"]
}
],
category: "writing"
},

{
id: "ai-hashtag-generator",
name: "AI Hashtag Generator",
description: "Generate viral hashtags.",
icon: Hash,
path: "/tools/ai-hashtag-generator",
promptTemplate:
"Generate hashtags about {{topic}}.",
inputs: [
{
name: "topic",
label: "Post Topic",
type: "textarea"
}
],
category: "social"
},

{
id: "ai-product-description-generator",
name: "AI Product Description",
description: "Generate product descriptions.",
icon: ShoppingBag,
path: "/tools/ai-product-description-generator",
promptTemplate:
"Write product description for {{productName}}.",
inputs: [
{
name: "productName",
label: "Product Name",
type: "text"
}
],
category: "business"
},

/* ---------- IMAGE TOOLS ---------- */

{
id: "svg-to-png",
name: "SVG to PNG",
description: "Convert SVG image to PNG.",
icon: FileImage,
path: "/tools/svg-to-png",
promptTemplate: "",
inputs: [],
category: "general"
},

{
id: "png-to-jpg",
name: "PNG to JPG",
description: "Convert PNG image to JPG.",
icon: FileImage,
path: "/tools/png-to-jpg",
promptTemplate: "",
inputs: [],
category: "general"
},

{
id: "webp-to-png",
name: "WEBP to PNG",
description: "Convert WEBP image to PNG.",
icon: FileImage,
path: "/tools/webp-to-png",
promptTemplate: "",
inputs: [],
category: "general"
},

{
id: "image-to-webp",
name: "Image to WebP",
description: "Convert PNG, JPG, JPEG, GIF or any image to WebP format.",
icon: FileImage,
path: "/tools/image-to-webp",
promptTemplate: "",
inputs: [],
category: "general"
},

{
id: "image-compressor",
name: "Image Compressor",
description: "Compress image size online.",
icon: FileImage,
path: "/tools/image-compressor",
promptTemplate: "",
inputs: [],
category: "general"
},

/* ---------- PDF TOOLS ---------- */

{
id: "image-to-pdf",
name: "Image to PDF",
description: "Convert image to PDF.",
icon: FilePlus,
path: "/tools/image-to-pdf",
promptTemplate: "",
inputs: [],
category: "general"
},

{
id: "jpg-to-pdf",
name: "JPG to PDF",
description: "Convert JPG image to PDF.",
icon: FilePlus,
path: "/tools/jpg-to-pdf",
promptTemplate: "",
inputs: [],
category: "general"
},

{
id: "merge-pdf",
name: "Merge PDF",
description: "Merge multiple PDF files.",
icon: FilePlus,
path: "/tools/merge-pdf",
promptTemplate: "",
inputs: [],
category: "general"
},

{
id: "split-pdf",
name: "Split PDF",
description: "Split PDF pages.",
icon: FilePlus,
path: "/tools/split-pdf",
promptTemplate: "",
inputs: [],
category: "general"
},

{
id: "pdf-to-image",
name: "PDF to Image",
description: "Convert PDF pages to images.",
icon: FilePlus,
path: "/tools/pdf-to-image",
promptTemplate: "",
inputs: [],
category: "general"
}

];

/* ---------- SEO MODIFIERS ---------- */

export const seoModifiers = {

"caption-generator": [
{ slug: "instagram", name: "Instagram", context: "for Instagram posts" },
{ slug: "reels", name: "Reels", context: "for Instagram reels" },
{ slug: "travel", name: "Travel", context: "for travel photos" }
],

"resume-builder": [
{ slug: "freshers", name: "Freshers", context: "for entry level candidates" },
{ slug: "students", name: "Students", context: "for college students" }
],

"email-writer": [
{ slug: "business", name: "Business", context: "for business emails" },
{ slug: "sales", name: "Sales", context: "for sales outreach emails" }
]

};
