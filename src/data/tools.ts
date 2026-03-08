import {
Bot,
FileText,
Mail,
PenTool,
Hash,
ShoppingBag,
User,
Image,
Sparkles
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

{
id: "ai-chatbot",
name: "AI Chatbot",
description: "Ask anything and get instant AI answers.",
icon: Bot,
path: "/tools/ai-chatbot",
promptTemplate:
"You are a helpful AI assistant. Answer the following question: {{query}}",
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
description: "Generate engaging captions for Instagram and social media.",
icon: Image,
path: "/tools/ai-caption-generator",
promptTemplate:
"Generate 5 engaging captions for {{platform}} about {{topic}} with a {{tone}} tone.",
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
description: "Create professional resume summaries and achievements.",
icon: User,
path: "/tools/ai-resume-builder",
promptTemplate:
"Write a professional resume summary for a {{jobTitle}} with skills in {{skills}}.",
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
placeholder: "Example: React, NodeJS, Leadership"
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
"Write a {{type}} email to {{recipient}} about {{subject}}. Include: {{points}}.",
inputs: [
{
name: "recipient",
label: "Recipient",
type: "text",
placeholder: "Example: Hiring Manager"
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
type: "text",
placeholder: "Example: Job Application"
},
{
name: "points",
label: "Key Points",
type: "textarea",
placeholder: "Explain what should be included"
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
"Write a blog outline and introduction for '{{title}}' targeting {{audience}}.",
inputs: [
{
name: "title",
label: "Blog Title",
type: "text",
placeholder: "Example: SEO Tips for Beginners"
},
{
name: "audience",
label: "Target Audience",
type: "text",
placeholder: "Example: Bloggers"
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
"Write a creative {{genre}} story about {{topic}}.",
inputs: [
{
name: "topic",
label: "Story Topic",
type: "textarea",
placeholder: "Example: Robot falling in love"
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
id: "ai-bio-generator",
name: "AI Bio Generator",
description: "Generate social media bio.",
icon: User,
path: "/tools/ai-bio-generator",
promptTemplate:
"Write a professional bio for a {{role}} interested in {{interests}}.",
inputs: [
{
name: "role",
label: "Your Role",
type: "text",
placeholder: "Example: Digital Artist"
},
{
name: "interests",
label: "Interests",
type: "textarea",
placeholder: "Example: Travel, Photography"
}
],
category: "social"
},

{
id: "ai-hashtag-generator",
name: "AI Hashtag Generator",
description: "Generate viral hashtags.",
icon: Hash,
path: "/tools/ai-hashtag-generator",
promptTemplate:
"Generate 30 trending hashtags about {{topic}}.",
inputs: [
{
name: "topic",
label: "Post Topic",
type: "textarea",
placeholder: "Example: Fitness workout"
}
],
category: "social"
},

{
id: "ai-product-description-generator",
name: "AI Product Description",
description: "Generate product descriptions for ecommerce.",
icon: ShoppingBag,
path: "/tools/ai-product-description-generator",
promptTemplate:
"Write a product description for {{productName}} with features: {{features}}.",
inputs: [
{
name: "productName",
label: "Product Name",
type: "text",
placeholder: "Example: Wireless Earbuds"
},
{
name: "features",
label: "Features",
type: "textarea",
placeholder: "Example: Noise cancellation, 20h battery"
}
],
category: "business"
}

];

export const seoModifiers = {
'caption-generator': [
{ slug: 'instagram', name: 'Instagram', context: 'for Instagram posts' },
{ slug: 'reels', name: 'Reels', context: 'for Instagram reels' },
{ slug: 'travel', name: 'Travel', context: 'for travel photos' }
],

'resume-builder': [
{ slug: 'freshers', name: 'Freshers', context: 'for entry level candidates' },
{ slug: 'students', name: 'Students', context: 'for college students' }
],

'email-writer': [
{ slug: 'business', name: 'Business', context: 'for business emails' },
{ slug: 'sales', name: 'Sales', context: 'for sales outreach emails' }
]
};
