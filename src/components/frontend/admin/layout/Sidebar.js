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
            Admin
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
            Sale
          </a>
        </div>
      </div>
    </div>
  );
};
export default Sidebar;
