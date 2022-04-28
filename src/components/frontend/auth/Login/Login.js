import React from "react";
import { useState, useEffect } from "react";
import { useNavigate } from "react-router-dom";
import axios from "axios";
import "../../../../assets/auth/css/styles.css";
import "../../../../assets/auth/js/scripts";
import "../validator/Validator";
import InputUsername from "./InputLogin/InputUsername";
import InputPassword from "./InputLogin/InputPassword";
import Validator from "../validator/Validator.js";
import { Router } from "react-router";
import { Button } from "antd";

function Login() {
  const [username, setUsername] = useState("");
  const [password, setPassword] = useState("");
  const [accessToken, setAccessToken] = useState('')
  const [login, setLogin] = useState(null);
  const navigate = useNavigate();

  const data = {
    password: password,
    username: username,
  };

  const handleLogin = () => {
    axios
      .post("http://113.161.151.124:8082/api/managers/login", data)
      .then(function (response) {
        // handle success
        window.sessionStorage.setItem('token', response.data.accessToken)
        navigate('/admin')
      })
      .catch(function (error) {
        // handle error
        console.log(error.request);
      })
      .then(function () {
        // always executed
      });
  };

  return (
    <div className="bg-primary">
      <div id="layoutAuthentication">
        <div id="layoutAuthentication_content">
          <main>
            <div className="container">
              <div className="row justify-content-center">
                <div className="col-lg-5">
                  <div className="card shadow-lg border-0 rounded-lg mt-5">
                    <div className="card-header">
                      <h3 className="text-center font-weight-light my-4">
                        Đăng Nhập
                      </h3>
                    </div>
                    <div className="card-body">
                      <form id="form-login">
                        <div className="form-floating mb-3">
                          <InputUsername
                            className="form-control"
                            id="userName"
                            type="text"
                            placeholder="UserName"
                            name="username"
                            value={username}
                            onChange={(e) => {
                              setUsername(e.target.value);
                            }}
                          />
                          <label id="userName">UserName</label>
                          <span
                            className="form-message"
                            style={"invalid" ? { color: "red" } : null}
                          ></span>
                        </div>

                        <div className="form-floating mb-3">
                          <InputPassword
                            className="form-control"
                            id="Password"
                            type="text"
                            placeholder="Password"
                            name="password"
                            value={password}
                            onChange={(e) => {
                              setPassword(e.target.value);
                            }}
                          />

                          <label id="inputPassword">Password</label>
                          <span
                            className="form-message"
                            style={"invalid" ? { color: "red" } : null}
                          ></span>
                        </div>

                        <div className="form-check mb-3">
                          <input
                            className="form-check-input"
                            id="inputRememberPassword"
                            type="checkbox"
                            value=""
                          />
                          <label
                            className="form-check-label"
                            htmlFor="inputRememberPassword"
                          >
                            Nhớ mật khẩu
                          </label>
                        </div>
                        <div className="d-flex align-items-center justify-content-between mt-4 mb-0">
                          <a className="small" href="/forgotpassword">
                            Quên mật khẩu ?
                          </a>
                          <button
                            type="button"
                            className="btn btn-primary"
                            onClick={handleLogin}
                          >
                            Đăng Nhập
                          </button>
                        </div>
                      </form>
                    </div>
                  </div>
                </div>
              </div>
            </div>
          </main>
        </div>
      </div>
    </div>
  );
}
export default Login;
