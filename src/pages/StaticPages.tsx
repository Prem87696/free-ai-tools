import React from 'react';
import { SEOHead } from '../components/SEOHead';

/* ABOUT PAGE */

export function AboutPage() {
return (
<> <SEOHead
     title="About Free AI Tools"
     description="Learn about Free AI Tools platform and our mission to provide powerful AI tools for everyone."
   />

```
  <div className="prose prose-slate max-w-3xl mx-auto">
    <h1>About Free AI Tools</h1>

    <p>
      Free AI Tools is a platform that provides a collection of online artificial intelligence tools designed
      to help people generate content, improve productivity, and simplify everyday digital tasks.
    </p>

    <p>
      Our mission is to make modern AI technology accessible to everyone. Many AI tools today are expensive
      or require technical knowledge. Our goal is to provide simple and free tools that anyone can use directly
      in their browser.
    </p>

    <p>
      The platform includes a variety of AI powered tools such as writing assistants, content generators,
      productivity tools, and creative AI utilities.
    </p>

    <h2>Our Vision</h2>

    <p>
      We believe artificial intelligence should empower people rather than complicate technology.
      Our vision is to create a platform where anyone can access useful AI tools without barriers.
    </p>

    <h2>Contact</h2>

    <p>
      If you have any questions, suggestions, or feedback regarding our platform,
      you can contact us through our contact page.
    </p>
  </div>
</>
```

);
}

/* CONTACT PAGE */

export function ContactPage() {
return (
<> <SEOHead
     title="Contact Us - Free AI Tools"
     description="Contact Free AI Tools for questions, suggestions, or feedback."
   />

```
  <div className="max-w-2xl mx-auto">

    <h1 className="text-3xl font-bold mb-6">Contact Us</h1>

    <p className="mb-6 text-slate-600">
      If you have questions, suggestions, or feedback about our AI tools platform,
      feel free to contact us using the form below.
    </p>

    <div className="bg-white p-8 rounded-2xl border border-slate-200 shadow-sm">

      <form className="space-y-4">

        <div>
          <label className="block text-sm font-medium text-slate-700 mb-1">Name</label>
          <input type="text" required className="w-full px-4 py-2 rounded-lg border border-slate-300" />
        </div>

        <div>
          <label className="block text-sm font-medium text-slate-700 mb-1">Email</label>
          <input type="email" required className="w-full px-4 py-2 rounded-lg border border-slate-300" />
        </div>

        <div>
          <label className="block text-sm font-medium text-slate-700 mb-1">Message</label>
          <textarea required className="w-full px-4 py-2 rounded-lg border border-slate-300 min-h-[150px]"></textarea>
        </div>

        <button className="bg-indigo-600 text-white px-6 py-2 rounded-lg hover:bg-indigo-700">
          Send Message
        </button>

      </form>

    </div>

    <p className="mt-6 text-sm text-slate-500">
      You can also contact us via email: support@freeaitools.com
    </p>

  </div>
</>
```

);
}

/* PRIVACY POLICY */

export function PrivacyPage() {
return (
<> <SEOHead
     title="Privacy Policy - Free AI Tools"
     description="Privacy Policy explaining how Free AI Tools collects and handles information."
   />

```
  <div className="prose prose-slate max-w-3xl mx-auto">

    <h1>Privacy Policy</h1>

    <p>Last updated: {new Date().toLocaleDateString()}</p>

    <p>
      This Privacy Policy describes how Free AI Tools handles information when you use our website.
      Protecting user privacy is important to us.
    </p>

    <h2>Information We Collect</h2>

    <p>
      We do not collect personal information such as name, phone number, or address directly.
      Some non-personal data such as browser type, device information, and usage statistics
      may be collected automatically for analytics and performance improvement.
    </p>

    <h2>Cookies</h2>

    <p>
      Our website may use cookies to improve user experience and analyze website traffic.
    </p>

    <h2>Google AdSense</h2>

    <p>
      We may use Google AdSense to display advertisements. Google uses cookies such as the DoubleClick cookie
      to serve ads to users based on their visits to this and other websites.
    </p>

    <p>
      Users may opt out of personalized advertising by visiting Google's Ads Settings page.
    </p>

    <h2>Third-Party Services</h2>

    <p>
      We may use third-party analytics tools such as Google Analytics to understand how visitors use our website.
    </p>

    <h2>Consent</h2>

    <p>
      By using our website, you consent to this Privacy Policy and agree to its terms.
    </p>

  </div>
</>
```

);
}

/* TERMS */

export function TermsPage() {
return (
<> <SEOHead
     title="Terms and Conditions - Free AI Tools"
     description="Terms and conditions for using Free AI Tools platform."
   />

```
  <div className="prose prose-slate max-w-3xl mx-auto">

    <h1>Terms and Conditions</h1>

    <p>
      By accessing this website, you agree to be bound by these Terms and Conditions.
    </p>

    <h2>Use of the Website</h2>

    <p>
      The tools provided on this website are intended for general informational and productivity purposes only.
    </p>

    <h2>AI Generated Content</h2>

    <p>
      Content generated using artificial intelligence may not always be accurate.
      Users are responsible for verifying the information before using it.
    </p>

    <h2>Prohibited Use</h2>

    <p>
      Users must not use this website for illegal activities or actions that violate any applicable laws.
    </p>

    <h2>Limitation of Liability</h2>

    <p>
      We are not responsible for any loss, damage, or issues arising from the use of our tools or generated content.
    </p>

    <h2>Changes to Terms</h2>

    <p>
      We reserve the right to update these terms at any time.
    </p>

  </div>
</>
```

);
}

/* DISCLAIMER */

export function DisclaimerPage() {
return (
<> <SEOHead
     title="Disclaimer - Free AI Tools"
     description="General disclaimer for Free AI Tools platform."
   />

```
  <div className="prose prose-slate max-w-3xl mx-auto">

    <h1>Disclaimer</h1>

    <p>
      The information and tools available on this website are provided for general informational purposes only.
    </p>

    <p>
      While we strive to provide reliable AI tools, we do not guarantee the accuracy, reliability,
      or completeness of any generated content.
    </p>

    <h2>External Links</h2>

    <p>
      Our website may contain links to external websites that are not operated by us.
      We are not responsible for the content or reliability of those websites.
    </p>

    <h2>Professional Advice</h2>

    <p>
      AI generated results should not be considered legal, financial, or medical advice.
      Always consult a qualified professional when needed.
    </p>

  </div>
</>
```

);
}
