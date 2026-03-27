import { createContext, useContext, useEffect, useState } from "react";
import { supabase } from "../supabase";

const AuthContext = createContext(null);

export function AuthProvider({ children }) {

const [user, setUser] = useState(null);
const [loading, setLoading] = useState(true);

// 🔥 session load
useEffect(() => {

 
supabase.auth.getSession().then(({ data }) => {
  setUser(data.session?.user || null);
  setLoading(false);
});

// 🔥 live auth change
const { data: listener } = supabase.auth.onAuthStateChange(
  (_event, session) => {
    setUser(session?.user || null);
  }
);

return () => {
  listener.subscription.unsubscribe();
};
 

}, []);

async function logout() {
await supabase.auth.signOut();
setUser(null);
}

return (
<AuthContext.Provider value={{ user, loading, logout }}>
{children}
</AuthContext.Provider>
);
}

export function useAuth() {
return useContext(AuthContext);
}
