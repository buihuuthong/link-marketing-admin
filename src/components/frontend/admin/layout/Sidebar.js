import React from "react";
import "../../../../assets/auth/css/styles.css";
import "../../../../assets/auth/js/scripts";
const Sidebar = () => {
  return (
    <div className="sb-sidenav accordion sb-sidenav-dark" id="sidenavAccordion">
      <div className="sb-sidenav-menu">
        <div className="nav">
          <a
            className="nav-a"
            href="/admin"
            style={{ textAlign: "center", padding: "10px 0" }}
          >
            <div className="sb-nav-link-icon">
              {" "}
              <i className="fa-solid fa-chart-mixed"></i>
            </div>{" "}
            Admin quản lí Sale
          </a>

          <a
            className="nav-a"
            href="/admin-user"
            style={{ textAlign: "center", padding: "10px 0" }}
          >
            <div className="sb-nav-link-icon">
              {" "}
              <i className="fa-solid fa-chart-mixed"></i>
            </div>{" "}
            Sale quản lí người dùng
          </a>
          
          <a
            className="nav-a"
            href="/user-forgot-password"
            style={{ textAlign: "center", padding: "10px 0" }}
          >
            <div className="sb-nav-link-icon">
              {" "}
              <i className="fa-solid fa-chart-mixed"></i>
            </div>{" "}
            Người dùng quên mật khẩu
          </a>
        </div>
      </div>
    </div>
  );
};
export default Sidebar;
