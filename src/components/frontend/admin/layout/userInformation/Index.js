import React, { useState, useEffect } from "react";
import Box from "@mui/material/Box";
import Grid from "@mui/material/Grid";
import "../../../../../assets/auth/css/styles.css";
import "../../../../../assets/auth/js/scripts";
import "./user.css";
import {
  BrowserRouter as Router,
  Switch,
  Route,
  Link,
  useParams
} from "react-router-dom";
import axios from "axios";

// import './user.scss';

const UserInformation = () => {

  const { id } = useParams();
  const [readMore, setReadMore] = useState(false)
  const [userData, setUserData] = useState([])
  const [userInfo, setUserInfo] = useState([])

  useEffect(() => {
    getUserById()
    getUserInfo()
    console.log("Id: ",id);
  }, [id])
  

  const getUserById = () => {
    axios
      .get("http://113.161.151.124:8082/api/managers/users/one", {
        headers: {
          'Authorization': `Bearer ${window.sessionStorage.getItem('token')}`
        },
        params: {
          "id": id
        }
      })
      .then(function (response) {
        // handle success
        setUserData(response.data);
      })
      .catch(function (error) {
        // handle error
        console.log(error);
      })
      .then(function () {
        // always executed
      });
  }

  const getUserInfo = () => {
    axios
      .get("http://113.161.151.124:8082/api/user-infos", {
        headers: {
          'Authorization': `Bearer ${window.sessionStorage.getItem('token')}`
        },
        params: {
          "id": id
        }
      })
      .then(function (response) {
        // handle success
        setUserInfo(response.data);
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
    <Box sx={{ flexGrow: 1 }} className="boxContainer">
      <Grid container spacing={0}>
        <Grid item xs={8}>
          {/* <LeftInformation /> */}
          <div id="layoutAuthentication">
            <div id="layoutAuthentication_content">
              <main>
                  <div className="container">
                    <div className="firs-box row" style={leftBox}>
                      <div className="col">
                        { userData.idCardFront != null ? 
                        <img src={"http://113.161.151.124:8082/secure-images/"+ userData.idCardFront + "?token=" + window.sessionStorage.getItem('token')} style={imageData}/>
                        :
                        <img src={require('../../../../../assets/auth/assets/img/1.png')} style={imageBox}/>
                        }
                      </div>
                      <div className="col">
                        { userData.idCardFront != null ? 
                        <img src={"http://113.161.151.124:8082/secure-images/"+ userData.idCardBack + "?token=" + window.sessionStorage.getItem('token')} style={imageData}/>
                        :
                        <img src={require('../../../../../assets/auth/assets/img/1.png')} style={imageBox}/>
                        }
                      </div>
                      <div className="col">
                        { userData.idCardFront != null ? 
                        <img src={"http://113.161.151.124:8082/secure-images/"+ userData.cardImage + "?token=" + window.sessionStorage.getItem('token')} style={imageData}/>
                        :
                        <img src={require('../../../../../assets/auth/assets/img/1.png')} style={imageBox}/>
                        }
                      </div>
                    </div>
                    {/*------------------------------------------------- */}
                    <div className="thirdBox row p-2" style={leftBox}>
                      <div className="col">
                        <h5>Rút tiền</h5>
                      </div>
                      <div>
                        <p>Không có thông tin rút tiền</p>
                      </div>
                      <div>

                      </div>
                    </div>

                    {/*------------------------------------------------- */}
                    <div className="lastBox row p-2" style={leftBox}>
                      <div className="col">
                        <h5>Báo lỗi</h5>
                      </div>
                      <div>
                        <input type="text" 
                          style={{
                            width: 300,
                            borderColor: '#FF9999'
                          }}
                        />
                        <input type="submit" value="Xác nhận" 
                          style={{ 
                            marginLeft: 10,
                            backgroundColor: '#FF9999',
                            color: '#FF0000',
                            borderColor: '#FF9999'
                          }}
                        />
                      </div>
                    <div>
                    </div>
                  </div>
                </div>
            </main>
          </div>
        </div>
        </Grid>
        <Grid item xs={4}>
          {/* <RightInformation /> */}
          <div id="layoutAuthentication">
            <div id="layoutAuthentication_content">
              <main>
                <div className="container">
                  {/*------------------------------------------------- */}
                  <div className="firstBox row p-2" style={box}>
                    <div className="col">
                      <h5 style={{ textAlign: "center" }}>Thông tin cá nhân</h5>
                    </div> 
                    {readMore ? 
                    <div>
                      <label style={label}>Họ và tên:</label><span> {userData.fullName}</span>
                      <br/>
                      <label style={label}>Giới tính:</label><span> {userData.gender == "FEMALE" ? "Nữ" : "Nam"}</span>
                      <br/>
                      <label style={label}>Số điện thoại:</label><span> {userData.phone}</span>
                      <br/>
                      <label style={label}>Địa chỉ: </label><span> {userData.address}</span>
                      <br/>
                      <label style={label}>Công việc:</label><span> {userData.job}</span>
                      <br/>
                      <label style={label}>Số tài khoản:</label><span> {userData.bankNumber}</span>
                      <br/>
                      <label style={label}>Tên ngân hàng:</label><span> {userData.bankName}</span>
                    </div>
                    :
                    <div>
                      <label style={label}>Họ và tên: </label><span> {userData.fullName}</span>
                      <br/>
                      <label style={label}>Số điện thoại: </label><span> {userData.phone}</span>
                    </div>
                    }
                    <div style={{ textAlign: "center" }}>
                    {readMore ?
                        <button style={buttonReadMore} onClick={() => setReadMore(false)}>
                            <h6 style={{ color: "#0080FF" }}>Ẩn bớt</h6>
                        </button>
                        :
                        <button style={buttonReadMore} onClick={() => setReadMore(true)}>
                            <h6 style={{ color: "#0080FF" }}>Xem thêm</h6>
                        </button>
                    }
                    </div>
                  </div>

                    {/*------------------------------------------------- */}
                    <div className="secondBox row p-2" style={box}>
                      <div>
                        <label style={label}>Số dư: </label><span> {userInfo.money}</span>
                      </div>
                      <div>
                        <h6  style={{ textAlign: "center" }}>Điểm tín dụng:</h6>
                        <label style={label}>Trong tháng: </label><span> {userInfo.monthlyCreditPoint}</span>
                        <br/>
                        <label style={label}>Hiện có: </label><span> {userInfo.creditPoint}</span>
                        <br/>
                        <label style={label}>Tổng điểm: </label><span> {userInfo.totalPoint}</span>
                      </div>
                    </div>
                    {/*------------------------------------------------- */}
                    <div className="firstBox row p-2" style={box}>
                        <div className="col">
                        <h5 style={{ textAlign: "center" }}>Lịch sử nhiệm vụ</h5>
                        </div>
                    </div>
                </div>
              </main>
            </div>
          </div>
        </Grid>
      </Grid>
    </Box>
  );
};

export default UserInformation;

const box = {
  margin: 5,
  backgroundColor: "white",
  borderRadius: 10,
}

const buttonReadMore = {
border: "none",
textAlign: "center",
backgroundColor: "#fff",
};

const buttonRight ={
  borderRadius: 10,
  width: '30%',
}

const label = {
  fontWeight: 'bold',
}

//Left
const imageBox = {
  width: 100,
  height: 100,
  justifyContent: 'center',
}

const imageData = {
  width: 300,
  height: 200,
}

const buttonLeft = {
  marginTop: 5,
  marginBottom: 5,
  borderRadius: 20,
  color: 'white',
  padding: 5,
  border: 'none',
}

const leftBox = {
  backgroundColor: 'white',
  margin: 5,
  borderRadius: 10,
}

const buttonError = {
  marginLeft: 20
}