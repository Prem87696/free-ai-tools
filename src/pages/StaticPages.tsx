 import React from "react";

/* ABOUT PAGE */

export function AboutPage() {
return ( <div className="prose prose-slate max-w-3xl mx-auto">

```
  <h1>About Free AI Tools</h1>

  <p>
    Free AI Tools is an online platform that provides a collection of
    powerful artificial intelligence tools designed to help users
    improve productivity and creativity. Our platform focuses on
    simplicity and accessibility so that anyone can benefit from
    modern AI technology.
  </p>

  <p>
    Artificial intelligence has become an important part of modern
    digital workflows. However, many AI platforms require complex
    setups or expensive subscriptions. Free AI Tools was created to
    provide simple and free access to useful AI tools directly from
    a web browser.
  </p>

  <p>
    Our platform includes various AI powered tools such as text
    generators, writing assistants, productivity utilities, and
    automation tools. These tools are designed to save time and
    help users complete tasks faster.
  </p>

  <h2>Our Mission</h2>

  <p>
    Our mission is to make artificial intelligence accessible to
    everyone. We believe that AI technology should not be limited
    to large companies or developers. Instead, it should be
    available to students, creators, freelancers, and professionals.
  </p>

  <p>
    By providing easy to use tools, we aim to empower users to
    explore the capabilities of AI and use it in their everyday
    activities such as writing, brainstorming, research, and
    productivity improvements.
  </p>

  <h2>Why Choose Free AI Tools</h2>

  <p>
    Our platform is designed to be lightweight, fast, and simple.
    Users can access AI tools without complicated installation
    processes or technical knowledge.
  </p>

  <p>
    We continuously work to improve the platform by adding new
    tools and improving existing features so users always have
    access to modern AI capabilities.
  </p>

  <h2>Future Plans</h2>

  <p>
    In the future, we plan to expand our platform with additional
    AI tools, improved user experience, and better integrations
    with modern web technologies.
  </p>

  <p>
    Our goal is to create a comprehensive ecosystem where users
    can find a wide variety of useful AI tools in one place.
  </p>

</div>
```

);
}

/* CONTACT PAGE */

export function ContactPage() {
return ( <div className="max-w-2xl mx-auto">

```
  <h1 className="text-3xl font-bold mb-6">Contact Us</h1>

  <p className="mb-6 text-slate-600">
    If you have questions, suggestions, or feedback about our AI
    tools platform, please feel free to contact us using the
    form below.
  </p>

  <p className="mb-6 text-slate-600">
    We value feedback from our users and are always looking for
    ways to improve the platform. Your suggestions help us
    develop better tools and features.
  </p>

  <div className="bg-white p-8 rounded-2xl border border-slate-200 shadow-sm">

    <form className="space-y-4">

      <div>
        <label className="block text-sm font-medium text-slate-700 mb-1">
          Name
        </label>
        <input
          type="text"
          required
          className="w-full px-4 py-2 rounded-lg border border-slate-300"
        />
      </div>

      <div>
        <label className="block text-sm font-medium text-slate-700 mb-1">
          Email
        </label>
        <input
          type="email"
          required
          className="w-full px-4 py-2 rounded-lg border border-slate-300"
        />
      </div>

      <div>
        <label className="block text-sm font-medium text-slate-700 mb-1">
          Message
        </label>
        <textarea
          required
          className="w-full px-4 py-2 rounded-lg border border-slate-300 min-h-[150px]"
        ></textarea>
      </div>

      <button className="bg-indigo-600 text-white px-6 py-2 rounded-lg hover:bg-indigo-700">
        Send Message
      </button>

    </form>

  </div>

  <p className="mt-6 text-sm text-slate-500">
    You can also reach us via email for support and general inquiries.
  </p>

  <p className="text-sm text-slate-500">
    Email: support@freeaitools.com
  </p>

  <p className="text-sm text-slate-500">
    We typically respond to inquiries within 24-48 hours.
  </p>

</div>
```

);
}

/* PRIVACY POLICY */

export function PrivacyPage() {
return ( <div className="prose prose-slate max-w-3xl mx-auto">

```
  <h1>Privacy Policy</h1>

  <p>Last updated: {new Date().toLocaleDateString()}</p>

  <p>
    This Privacy Policy explains how Free AI Tools handles
    information when users access and use our website.
  </p>

  <p>
    Protecting user privacy is extremely important to us and
    we are committed to ensuring that user data is handled
    responsibly and securely.
  </p>

  <h2>Information We Collect</h2>

  <p>
    We do not collect personal information such as name,
    address, or phone number directly through the website.
  </p>

  <p>
    Some non-personal information may be automatically
    collected such as browser type, device type,
    operating system, and general usage statistics.
  </p>

  <h2>Cookies</h2>

  <p>
    Our website may use cookies to improve user experience,
    remember preferences, and analyze website traffic.
  </p>

  <h2>Google AdSense</h2>

  <p>
    We may use Google AdSense to display advertisements
    to users. Google may use cookies to serve ads based
    on a user's previous visits to this website or other
    websites across the internet.
  </p>

  <p>
    Users can opt out of personalized advertising by
    visiting Google's Ads Settings page.
  </p>

  <h2>Third-Party Services</h2>

  <p>
    We may use third-party analytics services to better
    understand how users interact with the website.
  </p>

  <p>
    These services may collect anonymized data to help
    improve performance and user experience.
  </p>

  <h2>Consent</h2>

  <p>
    By using our website, you consent to our Privacy
    Policy and agree to its terms.
  </p>

</div>
```

);
}

/* TERMS */

export function TermsPage() {
return ( <div className="prose prose-slate max-w-3xl mx-auto">

```
  <h1>Terms and Conditions</h1>

  <p>
    By accessing and using this website, you agree to
    comply with the following terms and conditions.
  </p>

  <h2>Use of the Website</h2>

  <p>
    The AI tools provided on this website are intended
    for informational and productivity purposes only.
  </p>

  <p>
    Users should verify the accuracy of AI generated
    content before relying on it for professional
    or critical decisions.
  </p>

  <h2>AI Generated Content</h2>

  <p>
    Artificial intelligence may occasionally generate
    incorrect or misleading information.
  </p>

  <p>
    Users are responsible for verifying information
    before using generated content.
  </p>

  <h2>Prohibited Use</h2>

  <p>
    Users must not use the platform for illegal
    activities or activities that violate
    applicable laws or regulations.
  </p>

  <h2>Limitation of Liability</h2>

  <p>
    Free AI Tools is not responsible for any
    damages or losses resulting from the use
    of this website or its tools.
  </p>

  <h2>Updates</h2>

  <p>
    We reserve the right to modify these terms
    at any time without prior notice.
  </p>

</div>
```

);
}

/* DISCLAIMER */

export function DisclaimerPage() {
return ( <div className="prose prose-slate max-w-3xl mx-auto">

```
  <h1>Disclaimer</h1>

  <p>
    The information and tools provided on this website
    are for general informational purposes only.
  </p>

  <p>
    While we strive to provide accurate and reliable
    AI tools, we make no guarantees regarding the
    accuracy or completeness of generated results.
  </p>

  <h2>External Links</h2>

  <p>
    Our website may contain links to external
    websites that are not operated by us.
  </p>

  <p>
    We are not responsible for the content,
    policies, or practices of any third-party
    websites.
  </p>

  <h2>Professional Advice</h2>

  <p>
    AI generated content should not be considered
    legal, financial, or medical advice.
  </p>

  <p>
    Always consult qualified professionals
    before making important decisions.
  </p>

  <p>
    By using this website you agree that the
    platform owners will not be held liable
    for any consequences resulting from the
    use of our AI tools.
  </p>

</div>
```

);
}
