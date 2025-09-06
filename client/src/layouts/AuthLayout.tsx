import { useEffect } from "react";
import { Outlet, useNavigate } from "react-router";
import { useAuthStore } from "../stores/authStore";
import Navbar from "../components/Navbar";

const AuthLayout = () => {
  const { isAuthenticated } = useAuthStore();
  const navigate = useNavigate();

  useEffect(() => {
    if (!isAuthenticated) {
      navigate("/login");
    }
  }, [isAuthenticated, navigate]);

  if (!isAuthenticated) return null;

  return (
    <div className="flex md:flex-row flex-col h-screen bg-[var(--background-50)]">
      <Navbar />
      <div className="flex-1">
        <Outlet />
      </div>
    </div>
  );
};

export default AuthLayout;
