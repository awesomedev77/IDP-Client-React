import React from "react";
import { BrowserRouter as Router, Route, Routes } from "react-router-dom";
import PrivateRoute from "./components/PrivateRoute";
import { AuthProvider } from "./components/AuthContext";
import Home from "./pages/Home";
import Login from "./pages/Login";
import Signup from "./pages/Signup";
import AuthRoute from "./components/AuthRoute";
import NotFoundPage from "./pages/NotFound";
import { Detail } from "./pages/Detail";
import AdminRoute from "./components/AdminRoute";
import { Admin } from "./pages/Admin";
import { DocumentProcess } from "./pages/Process";
import { DocumentType } from "./pages/DocumentType";

function App() {
  return (
    <Router>
      <AuthProvider>
        <Routes>
          <Route element={<AuthRoute />}>
            <Route path="/login" element={<Login />} />
            <Route path="/signup" element={<Signup />} />
          </Route>
          <Route element={<AdminRoute />}>
            <Route path="/admin" element={<Admin />} />
            <Route path="/process" element={<DocumentProcess />} />
            <Route path="/type" element={<DocumentType />} />
          </Route>
          <Route element={<PrivateRoute />}>
            <Route path="/" element={<Home />} />
            <Route path="/detail/:id" element={<Detail />} />
          </Route>
          <Route path="*" element={<NotFoundPage />} />
        </Routes>
      </AuthProvider>
    </Router>
  );
}

export default App;
