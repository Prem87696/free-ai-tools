import React, { useState } from "react";
import { supabase } from "../supabase";
import { Loader2, X } from "lucide-react";

export default function AuthModal({ onClose }) {

const [isLogin, setIsLogin] = useState(true);

const [email, setEmail] = useState("");
const [password, setPassword] = useState("");

const [loading, setLoading] = useState(false);
const [error, setError] = useState("");

async function handleSubmit(e) {
e.preventDefault();

 
if (!email || !password) {
  setError("All fields required ❗");
  return;
}

setError("");
setLoading(true);

let result;

if (isLogin) {
  result = await supabase.auth.signInWithPassword({ email, password });
} else {
  result = await supabase.auth.signUp({ email, password });
}

setLoading(false);

if (result.error) {
  setError(result.error.message);
} else {
  alert(isLogin ? "Login successful ✅" : "Account created 🎉");
  onClose();
}
 

}

return ( <div className="fixed inset-0 bg-black/60 backdrop-blur-sm flex justify-center items-center z-50 px-4">

 
  <div className="bg-white w-full max-w-md rounded-2xl shadow-xl p-6 relative">

    {/* CLOSE */}
    <button onClick={onClose} className="absolute top-4 right-4">
      <X size={20}/>
    </button>

    {/* TITLE */}
    <h2 className="text-2xl font-semibold text-center mb-2">
      {isLogin ? "Welcome Back 👋" : "Create Account 🚀"}
    </h2>

    <p className="text-center text-sm text-slate-500 mb-6">
      {isLogin ? "Login to continue" : "Signup to get started"}
    </p>

    {/* FORM */}
    <form onSubmit={handleSubmit} className="space-y-4">

      <input
        type="email"
        placeholder="Email"
        className="w-full border px-4 py-3 rounded-xl"
        value={email}
        onChange={(e)=>setEmail(e.target.value)}
      />

      <input
        type="password"
        placeholder="Password"
        className="w-full border px-4 py-3 rounded-xl"
        value={password}
        onChange={(e)=>setPassword(e.target.value)}
      />

      {error && (
        <div className="text-red-500 text-sm text-center">{error}</div>
      )}

      <button
        type="submit"
        disabled={loading}
        className="w-full bg-indigo-600 text-white py-3 rounded-xl flex justify-center items-center gap-2"
      >
        {loading ? (
          <>
            <Loader2 className="animate-spin w-5 h-5"/>
            Processing...
          </>
        ) : (
          isLogin ? "Login" : "Signup"
        )}
      </button>

    </form>

    {/* SWITCH */}
    <p className="text-center text-sm mt-4">
      {isLogin ? "Don't have account?" : "Already have account?"}
      <button
        onClick={()=>setIsLogin(!isLogin)}
        className="text-indigo-600 ml-1"
      >
        {isLogin ? "Signup" : "Login"}
      </button>
    </p>

  </div>

</div>
 

);
}
