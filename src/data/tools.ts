import { Bot, FileText, Mail, PenTool, Hash, ShoppingBag, User, MessageSquare, Image, Sparkles } from 'lucide-react';

export interface ToolConfig {
  id: string;
  name: string;
  description: string;
  icon: any;
  path: string;
  promptTemplate: string;
  inputs: {
    name: string;
    label: string;
    type: 'text' | 'textarea' | 'select';
    placeholder?: string;
    options?: string[];
  }[];
  category: 'social' | 'business' | 'writing' | 'general';
}

export const tools: ToolConfig[] = [

{
id: 'ai-chatbot',
name: 'AI Chatbot',
description: 'A general purpose AI assistant to help answer questions and solve problems.',
icon: Bot,
path: '/tools/ai-chatbot',
promptTemplate: "You are a helpful AI assistant. Answer the following query: {{query}}",
inputs: [
{ name: 'query', label: 'Your Question', type: 'textarea', placeholder: 'Ask me anything...' }
],
category: 'general'
},

{
id: 'ai-caption-generator',
name: 'AI Caption Generator',
description: 'Generate engaging captions for Instagram, TikTok, and other social media platforms.',
icon: Image,
path: '/tools/ai-caption-generator',
promptTemplate: "Generate 5 engaging social media captions for a photo about: {{topic}}. Tone: {{tone}}. Platform: {{platform}}.",
inputs: [
{ name: 'topic', label: 'What is your post about?', type: 'textarea', placeholder: 'e.g., A sunset at the beach...' },
{ name: 'platform', label: 'Platform', type: 'select', options: ['Instagram', 'TikTok', 'Facebook', 'LinkedIn', 'Twitter'] },
{ name: 'tone', label: 'Tone', type: 'select', options: ['Professional', 'Funny', 'Inspirational', 'Casual', 'Sarcastic'] }
],
category: 'social'
},

{
id: 'ai-resume-builder',
name: 'AI Resume Builder',
description: 'Create professional resume summaries and bullet points.',
icon: User,
path: '/tools/ai-resume-builder',
promptTemplate: "Write a professional resume summary and 3 key achievement bullet points for a {{jobTitle}} with experience in {{skills}}.",
inputs: [
{ name: 'jobTitle', label: 'Job Title', type: 'text', placeholder: 'e.g., Software Engineer' },
{ name: 'skills', label: 'Key Skills', type: 'textarea', placeholder: 'e.g., React, Node.js, Leadership...' }
],
category: 'business'
},

{
id: 'ai-email-writer',
name: 'AI Email Writer',
description: 'Draft professional emails for business, marketing, or personal use.',
icon: Mail,
path: '/tools/ai-email-writer',
promptTemplate: "Write a {{type}} email to {{recipient}} about {{subject}}. Key points: {{points}}.",
inputs: [
{ name: 'recipient', label: 'Recipient Name/Role', type: 'text', placeholder: 'e.g., Hiring Manager' },
{ name: 'type', label: 'Email Type', type: 'select', options: ['Formal', 'Casual', 'Cold Outreach', 'Follow-up', 'Resignation'] },
{ name: 'subject', label: 'Subject/Topic', type: 'text', placeholder: 'e.g., Project Update' },
{ name: 'points', label: 'Key Points', type: 'textarea', placeholder: 'e.g., Meeting was successful, next steps are...' }
],
category: 'business'
},

{
id: 'ai-blog-writer',
name: 'AI Blog Writer',
description: 'Generate blog post outlines, intros, or full articles.',
icon: PenTool,
path: '/tools/ai-blog-writer',
promptTemplate: "Write a blog post outline and introduction for a post titled '{{title}}' targeting {{audience}}.",
inputs: [
{ name: 'title', label: 'Blog Title', type: 'text', placeholder: 'e.g., 10 Tips for SEO' },
{ name: 'audience', label: 'Target Audience', type: 'text', placeholder: 'e.g., Small Business Owners' }
],
category: 'writing'
},

{
id: 'ai-story-generator',
name: 'AI Story Generator',
description: 'Create creative stories based on your prompts.',
icon: Sparkles,
path: '/tools/ai-story-generator',
promptTemplate: "Write a short creative story about {{topic}} in the genre of {{genre}}.",
inputs: [
{ name: 'topic', label: 'Story Topic', type: 'textarea', placeholder: 'e.g., A robot learning to love' },
{ name: 'genre', label: 'Genre', type: 'select', options: ['Sci-Fi', 'Fantasy', 'Romance', 'Horror', 'Mystery'] }
],
category: 'writing'
},

{
id: 'ai-bio-generator',
name: 'AI Bio Generator',
description: 'Generate professional or creative bios for social media profiles.',
icon: User,
path: '/tools/ai-bio-generator',
promptTemplate: "Write 3 versions (Short, Medium, Long) of a social media bio for a {{role}} interested in {{interests}}.",
inputs: [
{ name: 'role', label: 'Your Role/Profession', type: 'text', placeholder: 'e.g., Digital Artist' },
{ name: 'interests', label: 'Interests/Hobbies', type: 'textarea', placeholder: 'e.g., Coffee, Travel, Design' }
],
category: 'social'
},

{
id: 'ai-hashtag-generator',
name: 'AI Hashtag Generator',
description: 'Generate relevant hashtags to boost your social media reach.',
icon: Hash,
path: '/tools/ai-hashtag-generator',
promptTemplate: "Generate 30 relevant, high-traffic hashtags for a post about: {{topic}}.",
inputs: [
{ name: 'topic', label: 'Post Topic', type: 'textarea', placeholder: 'e.g., Healthy eating tips' }
],
category: 'social'
},

{
id: 'ai-product-description-generator',
name: 'AI Product Description',
description: 'Create compelling product descriptions for e-commerce.',
icon: ShoppingBag,
path: '/tools/ai-product-description-generator',
promptTemplate: "Write a persuasive product description for {{productName}}. Features: {{features}}.",
inputs: [
{ name: 'productName', label: 'Product Name', type: 'text', placeholder: 'e.g., Wireless Headphones' },
{ name: 'features', label: 'Key Features', type: 'textarea', placeholder: 'e.g., Noise cancelling, 20h battery life' }
],
category: 'business'
},

{
id: 'ai-image-generator',
name: 'AI Image Generator',
description: 'Generate AI image prompts from text descriptions.',
icon: Image,
path: '/tools/ai-image-generator',
promptTemplate: "Generate a detailed AI image prompt for: {{prompt}} in {{style}} style.",
inputs: [
{ name: 'prompt', label: 'Describe the Image', type: 'textarea', placeholder: 'e.g., A futuristic cyberpunk city at sunset' },
{ name: 'style', label: 'Image Style', type: 'select', options: ['Realistic','Anime','3D Render','Cartoon','Cinematic','Digital Art'] }
],
category: 'general'
}

];

export const seoModifiers = {
'caption-generator': [
{ slug: 'instagram', name: 'Instagram', context: 'specifically for Instagram' },
{ slug: 'reels', name: 'Reels', context: 'specifically for Instagram Reels videos' },
{ slug: 'travel', name: 'Travel Photos', context: 'for travel photography' },
{ slug: 'food', name: 'Food Bloggers', context: 'for food photography' },
{ slug: 'business', name: 'Business', context: 'for professional business accounts' }
],
'resume-builder': [
{ slug: 'freshers', name: 'Freshers', context: 'for entry-level candidates with no experience' },
{ slug: 'students', name: 'Students', context: 'for college students looking for internships' },
{ slug: 'teachers', name: 'Teachers', context: 'for education professionals' },
{ slug: 'engineers', name: 'Software Engineers', context: 'for technical software engineering roles' }
],
'email-writer': [
{ slug: 'business', name: 'Business', context: 'for formal business communication' },
{ slug: 'marketing', name: 'Marketing', context: 'for email marketing campaigns' },
{ slug: 'sales', name: 'Sales', context: 'for cold sales outreach' }
]
};
