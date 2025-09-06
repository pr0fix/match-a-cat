import { StrictMode } from "react";
import { createRoot } from "react-dom/client";
import "./index.css";
import { BrowserRouter, Route, Routes } from "react-router";
import Login from "./components/Login.tsx";
import SignUp from "./components/SignUp.tsx";
import AuthLayout from "./layouts/AuthLayout.tsx";
import App from "./App.tsx";
import Collection from "./components/Collection.tsx";
import Profile from "./components/Profile.tsx";

createRoot(document.getElementById("root")!).render(
  <StrictMode>
    <BrowserRouter>
      <Routes>
        {/* Public routes */}
        <Route path="/login" element={<Login />} />
        <Route path="/sign-up" element={<SignUp />} />

        {/* Protected routes */}
        <Route element={<AuthLayout />}>
          <Route path="/" element={<App />} />
          <Route path="/collection" element={<Collection />} />
          <Route path="/profile" element={<Profile />} />
        </Route>
      </Routes>
    </BrowserRouter>
  </StrictMode>
);
