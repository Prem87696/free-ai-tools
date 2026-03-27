import React, { useState } from "react";
import { supabase } from "../supabase";

export default function LoginModal({ onClose }) {

const [email, setEmail] = useState("");
const [password, setPassword] = useState("");
const [loading, setLoading] = useState(false);

async function handleLogin(e) {
e.preventDefault();
setLoading(true);

 
const { error } = await supabase.auth.signInWithPassword({
  email,
  password,
});

setLoading(false);

if (error) {
  alert(error.message);
} else {
  alert("Login successful ✅");
  onClose();
}
 

}

return ( <div className="fixed inset-0 bg-black/50 flex justify-center items-center z-50">

 
  <div className="bg-white p-6 rounded-2xl w-full max-w-md">

    <h2 className="text-xl font-semibold mb-4 text-center">Login</h2>

    <form onSubmit={handleLogin} className="space-y-4">

      <input
        type="email"
        placeholder="Email"
        className="w-full border px-4 py-2 rounded-lg"
        value={email}
        onChange={(e)=>setEmail(e.target.value)}
      />

      <input
        type="password"
        placeholder="Password"
        className="w-full border px-4 py-2 rounded-lg"
        value={password}
        onChange={(e)=>setPassword(e.target.value)}
      />

      <button
        type="submit"
        disabled={loading}
        className="w-full bg-indigo-600 text-white py-2 rounded-lg"
      >
        {loading ? "Logging in..." : "Login"}
      </button>

    </form>

    <button
      onClick={onClose}
      className="mt-4 text-sm text-gray-500 w-full"
    >
      Close
    </button>

  </div>

</div>
 
);
}
