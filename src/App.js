import React from "react";
import { BrowserRouter, Routes, Route } from "react-router-dom";
import AuthProvider from "./Auth/authcontent";
import PrivateRoute from "./Auth/Privateroute";
import Layout from "./Components/Layout";
import BlogList from "./Features/Blogs/BlogList";
import BlogForm from "./Features/Blogs/BlogForm";
import PageList from "./Features/Pages/PageList";
import PageForm from "./Features/Pages/PageForm";
import PlacementList from "./Features/Placements/PlacementList";
import PlacementForm from "./Features/Placements/PlacementForm";

function LoginPage() {
  // quick stub until your /auth/login exists
  return <div style={{padding:24}}>
    <h2>Login (dev stub)</h2>
    <button onClick={()=>{ localStorage.setItem("token","dev"); window.location.href="/blogs"; }}>Sign in</button>
  </div>;
}

export default function App() {
  return (
    <BrowserRouter>
      <AuthProvider>
        <Routes>
          <Route path="/login" element={<LoginPage/>} />
          <Route path="/" element={<PrivateRoute><Layout><BlogList/></Layout></PrivateRoute>} />
          <Route path="/Blogs" element={<PrivateRoute><Layout><BlogList/></Layout></PrivateRoute>} />
          <Route path="/Blogs/:id" element={<PrivateRoute><Layout><BlogForm/></Layout></PrivateRoute>} />
          <Route path="/Pages" element={<PrivateRoute><Layout><PageList/></Layout></PrivateRoute>} />
          <Route path="/Pages/:id" element={<PrivateRoute><Layout><PageForm/></Layout></PrivateRoute>} />
          <Route path="/Placements" element={<PrivateRoute><Layout><PlacementList/></Layout></PrivateRoute>} />
          <Route path="/Placements/:id" element={<PrivateRoute><Layout><PlacementForm/></Layout></PrivateRoute>} />
        </Routes>
      </AuthProvider>
    </BrowserRouter>
  );
}