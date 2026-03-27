import { Navigate } from "react-router-dom";
import { useAuth } from "../context/AuthContext";

export default function ProtectedRoute({ children }) {

const { user, loading } = useAuth();

// loading state
if (loading) {
return <div className="text-center py-10">Checking auth...</div>;
}

// not logged in
if (!user) {
return <Navigate to="/" replace />;
}

// logged in
return children;
}
