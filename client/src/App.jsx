import React from "react";
import { BrowserRouter, Routes, Route, Navigate } from "react-router-dom";
import Home from "./pages/home";
import Signup from "./pages/signup";
import Login from "./pages/login";
import "./App.css";
import CreateDoc from "./pages/CreateDoc";
const App = () => {
  const idLoggedIn = localStorage.getItem("idLoggedIn");
  return (
    <>
      <BrowserRouter>
        <Routes>
          <Route
            path="/"
            element={idLoggedIn ? <Home /> : <Navigate to={"/login"} />}
          />
          <Route path="/signup" element={<Signup />} />
          <Route
            path="/createDocs/:docId"
            element={idLoggedIn ? <CreateDoc /> : <Navigate to={"/login"} />}
          />
          <Route path="/login" element={<Login />} />
        </Routes>
      </BrowserRouter>
    </>
  );
};

export default App;
