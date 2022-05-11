import React from "react";
import { useState, useEffect } from "react";
import { useNavigate } from "react-router-dom";
import axios from "axios";
import "../../../../assets/auth/css/styles.css";
import "../../../../assets/auth/js/scripts";
import "../validator/Validator";
import InputUsername from "./InputLogin/InputUsername";
import InputPassword from "./InputLogin/InputPassword";

function Login() {
  const [username, setUsername] = useState("");
  const [password, setPassword] = useState("");
  const [errorUserName, setErrorUserName] = useState(false)
  const [errorPassWord, setErrorPassWord] = useState(false)
  const [wrongPassword, setWrongPassword] = useState(false)
  const navigate = useNavigate();

  const data = {
    password: password,
    username: username,
  };

  const handleLogin = () => {

    axios
      .post("https://api.tmdtbamboo.com/api/managers/login", data)
      .then(function (response) {
        // handle success
        console.log("Success");
        window.sessionStorage.setItem('token', response.data.accessToken)
        navigate('/admin')
      })
      .catch(function (error) {
        // handle error
        console.log(error.request);
        if(error.response.data.code == 'WRONG_PASSWORD'){
          setWrongPassword(true)
        }
      })
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
                          <label id="userName">Tài khoản</label>
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

                          <label id="inputPassword">Mật khẩu</label>
                          { wrongPassword ? 
                          <span style={{ color: "red" }}>Sai mật khẩu hoặc tài khoản của bạn không tồn tại!</span>
                          : null}
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
