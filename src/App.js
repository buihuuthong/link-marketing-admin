import React, { useEffect } from "react";
import { BrowserRouter, Routes, Route } from "react-router-dom";
import Register from "../src/components/frontend/auth/Register";
import Login from "../src/components/frontend/auth/Login/Login";
import MasterLayoutAdmin from "./components/frontend/admin/layout/MasterLayoutAdmin";
import MedalProvider from "./components/context/Context";
import UserInformation from "../src/components/frontend/admin/layout/userInformation/Index";
import ForgotPassword from "../src/components/frontend/auth/ForgotPassword";

function App() {
  return (
    <div>
      <BrowserRouter>
        <MedalProvider>
          <Routes>
            <Route path="/" element={<Login />} />
            <Route path="/register" element={<Register />} />
            <Route path="/forgotPassword" element={<ForgotPassword />} />
            <Route path="/admin/*" element={<MasterLayoutAdmin />} />
            <Route path="/user-information/:id" element={<UserInformation />} />
          </Routes>
        </MedalProvider>
      </BrowserRouter>
    </div>
  );
}

export default App;
