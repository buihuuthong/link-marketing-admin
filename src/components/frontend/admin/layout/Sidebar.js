import React, { useState, useEffect} from "react";
import {Link, useNavigate} from 'react-router-dom'
import "../../../../assets/auth/css/styles.css";
import "../../../../assets/auth/js/scripts";
import axios from "axios";

const Sidebar = () => {

  const navigate = useNavigate();
  const [role, setRole] = useState('')

  useEffect(() => {
    getUserRole()
  }, [])
  

  const getUserRole = () => {
    axios
      .get("https://api.tmdtbamboo.com/api/managers/account", {
        headers: {
          'Authorization': `Bearer ${window.sessionStorage.getItem('token')}`
        },
      })
      .then(function (response) {
        // handle success
        setRole(response.data.role)
        console.log(response.data.role)
        if(response.data.role == "ROLE_SALE"){
          navigate('/admin/admin-user')
        }
      })
      .catch(function (error) {
        // handle error
        console.log(error);
      })
      .then(function () {
        // always executed
      });
  }

  return (
    <div className="sb-sidenav accordion sb-sidenav-dark" id="sidenavAccordion">
      <div className="sb-sidenav-menu">
        <div className="nav">
          {role == "ROLE_SALE" ? null :
          <Link
            className="nav-a"
            to="/admin"
            style={{ textAlign: "center", padding: "10px 0" }}
          >
            <div className="sb-nav-link-icon">
              {" "}
              <i className="fa-solid fa-chart-mixed"></i>
            </div>{" "}
            Quản lí Sale
          </Link>
          }

          <Link
            className="nav-a"
            to="/admin/admin-user"
            style={{ textAlign: "center", padding: "10px 0" }}
          >
            <div className="sb-nav-link-icon">
              {" "}
              <i className="fa-solid fa-chart-mixed"></i>
            </div>{" "}
            Quản lí người dùng
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
            Quản lí mật khẩu
          </Link>
          
          <Link
            className="nav-a"
            to="/admin/transaction/agent-deposite"
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
