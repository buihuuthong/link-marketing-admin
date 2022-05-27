import React, { useEffect } from "react";
import { BrowserRouter, Routes, Route } from "react-router-dom";
import Admin from '../DashBoard/Admin/Admin';
import UserForgotPassWord from './userForgotPassWord/index'
import ListUser from './userList/index'
import Transaction from "./Transaction";
import Rating from "./Rating";

const Router = () => {
  return (
    <Routes>
        <Route path="/" element={<Admin />} />
        <Route path="/admin-user" element={<ListUser />} />
        <Route path="/user-forgot-password" element={<UserForgotPassWord />}/>
        <Route path="/transaction/*" element={<Transaction />}/>
        <Route path="/rating" element={<Rating />}/>
    </Routes>
  );
}

export default Router;
