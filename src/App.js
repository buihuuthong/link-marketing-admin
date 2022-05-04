import React, { useEffect } from "react";
import { BrowserRouter, Routes, Route } from "react-router-dom";
import Register from "../src/components/frontend/auth/Register";
import Login from "../src/components/frontend/auth/Login/Login";
import MasterLayoutAdmin from "./components/frontend/admin/layout/MasterLayoutAdmin";
import MasterLayoutSale from "./components/frontend/admin/layout/MasterLayoutSale";
import MedalProvider from "./components/context/Context";
import UserInformation from "../src/components/frontend/admin/layout/userInformation/Index";
import ForgotPassword from "../src/components/frontend/auth/ForgotPassword";
import MasterLayoutForgotPw from "./components/frontend/admin/layout/MasterLayoutForgotPW";

function App() {
  return (
    <div>
      <BrowserRouter>
        <MedalProvider>
          <Routes>
            <Route path="/" element={<Login />} />
            <Route path="/register" element={<Register />} />
            <Route path="/forgotPassword" element={<ForgotPassword />} />
            <Route path="/admin" element={<MasterLayoutAdmin />} />
            <Route path="/admin-user" element={<MasterLayoutSale />} />
            <Route path="/user-information" element={<UserInformation />} />
            <Route path="/user-forgot-password" element={<MasterLayoutForgotPw />}/>
          </Routes>
        </MedalProvider>
      </BrowserRouter>
    </div>
  );
}

export default App;
