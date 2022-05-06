import React from "react";
import {Link} from 'react-router-dom'
import "../../../../assets/auth/css/styles.css";
import "../../../../assets/auth/js/scripts";
const Sidebar = () => {
  return (
    <div className="sb-sidenav accordion sb-sidenav-dark" id="sidenavAccordion">
      <div className="sb-sidenav-menu">
        <div className="nav">
          <Link
            className="nav-a"
            to="/admin"
            style={{ textAlign: "center", padding: "10px 0" }}
          >
            <div className="sb-nav-link-icon">
              {" "}
              <i className="fa-solid fa-chart-mixed"></i>
            </div>{" "}
            Admin quản lí Sale
          </Link>

          <Link
            className="nav-a"
            to="/admin/admin-user"
            style={{ textAlign: "center", padding: "10px 0" }}
          >
            <div className="sb-nav-link-icon">
              {" "}
              <i className="fa-solid fa-chart-mixed"></i>
            </div>{" "}
            Sale quản lí người dùng
          </Link>
          
          <Link
            className="nav-a"
            to="/admin/user-forgot-password"
            style={{ textAlign: "center", padding: "10px 0" }}
          >
            <div className="sb-nav-link-icon">
              {" "}
              <i className="fa-solid fa-chart-mixed"></i>
            </div>{" "}
            Người dùng quên mật khẩu
          </Link>
          
          <Link
            className="nav-a"
            to="/admin/transaction"
            style={{ textAlign: "center", padding: "10px 0" }}
          >
            <div className="sb-nav-link-icon">
              {" "}
              <i className="fa-solid fa-chart-mixed"></i>
            </div>{" "}
            Quản lí giao dịch
          </Link>
        </div>
      </div>
    </div>
  );
};
export default Sidebar;
