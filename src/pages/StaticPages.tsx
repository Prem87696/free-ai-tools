import { useState } from "react";
import { supabase } from "./supabase";

export function ContactPage() {

  const [name, setName] = useState("");
  const [email, setEmail] = useState("");
  const [message, setMessage] = useState("");

  async function saveData(e) {
    e.preventDefault();

    const { error } = await supabase
      .from('contacts')
      .insert([{ name, email, message }]);

    if (error) {
      alert("Error: " + error.message);
    } else {
      alert("Message sent ✅");
      setName("");
      setEmail("");
      setMessage("");
    }
  }

  return (
    <div className="max-w-2xl mx-auto">

      <h1 className="text-3xl font-bold mb-6">Contact Us</h1>

      <div className="bg-white p-8 rounded-2xl border border-slate-200 shadow-sm">

        <form onSubmit={saveData} className="space-y-4">

          <input
            type="text"
            placeholder="Name"
            value={name}
            onChange={(e)=>setName(e.target.value)}
            className="w-full px-4 py-2 border"
          />

          <input
            type="email"
            placeholder="Email"
            value={email}
            onChange={(e)=>setEmail(e.target.value)}
            className="w-full px-4 py-2 border"
          />

          <textarea
            placeholder="Message"
            value={message}
            onChange={(e)=>setMessage(e.target.value)}
            className="w-full px-4 py-2 border"
          ></textarea>

          <button className="bg-indigo-600 text-white px-6 py-2">
            Send Message
          </button>

        </form>

      </div>
    </div>
  );
}
