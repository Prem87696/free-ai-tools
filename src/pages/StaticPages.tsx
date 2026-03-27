import { useState } from "react";
import { supabase } from "../supabase"; // ⚠️ path check karo

export function ContactPage() {

const [name, setName] = useState("");
const [email, setEmail] = useState("");
const [message, setMessage] = useState("");
const [loading, setLoading] = useState(false);

async function saveData(e) {
e.preventDefault();

```
// validation
if (!name || !email || !message) {
  alert("Please fill all fields ❗");
  return;
}

setLoading(true);

const { error } = await supabase
  .from("contacts")
  .insert([{ name, email, message }]);

setLoading(false);

if (error) {
  alert("Error: " + error.message);
} else {
  alert("Message sent successfully ✅");
  setName("");
  setEmail("");
  setMessage("");
}
```

}

return ( <div className="max-w-2xl mx-auto p-4">

```
  <h1 className="text-3xl font-bold mb-6">Contact Us</h1>

  <div className="bg-white p-8 rounded-2xl border border-slate-200 shadow-sm">

    <form onSubmit={saveData} className="space-y-4">

      <input
        type="text"
        placeholder="Name"
        value={name}
        onChange={(e)=>setName(e.target.value)}
        className="w-full px-4 py-2 border rounded-lg"
      />

      <input
        type="email"
        placeholder="Email"
        value={email}
        onChange={(e)=>setEmail(e.target.value)}
        className="w-full px-4 py-2 border rounded-lg"
      />

      <textarea
        placeholder="Message"
        value={message}
        onChange={(e)=>setMessage(e.target.value)}
        className="w-full px-4 py-2 border rounded-lg min-h-[120px]"
      ></textarea>

      <button
        type="submit"
        disabled={loading}
        className="bg-indigo-600 text-white px-6 py-2 rounded-lg hover:bg-indigo-700 disabled:opacity-50"
      >
        {loading ? "Sending..." : "Send Message"}
      </button>

    </form>

  </div>
</div>
```

);
}
