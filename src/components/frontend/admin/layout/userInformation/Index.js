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
  useParams,
} from "react-router-dom";
import axios from "axios";
import { List, message, Avatar, Skeleton, Divider } from "antd";
import InfiniteScroll from "react-infinite-scroll-component";
import {Helmet} from "react-helmet";

// import './user.scss';

const UserInformation = () => {
  const { id } = useParams();
  const [readMore, setReadMore] = useState(false);
  const [userData, setUserData] = useState([]);
  const [userInfo, setUserInfo] = useState([]);
  const [userError, setUserError] = useState('')
  const [depositError, setDepositError] = useState('')
  const [userTransaction, setUserTransaction] = useState([]);
  const [userTask, setUserTask] = useState([]);
  const [loading, setLoading] = useState(false);

  useEffect(() => {
    getUserById();
    getUserInfo();
    getUserTransaction();
    getUserTask()
    getUserError()
    console.log("Id: ", id);
  }, [id]);

  const getUserById = () => {
    axios
      .get("https://api.tmdtbamboo.com/api/managers/users/one", {
        headers: {
          Authorization: `Bearer ${window.sessionStorage.getItem("token")}`,
        },
        params: {
          id: id,
        },
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
  };

  const getUserInfo = () => {
    axios
      .get("https://api.tmdtbamboo.com/api/user-infos", {
        headers: {
          Authorization: `Bearer ${window.sessionStorage.getItem("token")}`,
        },
        params: {
          id: id,
        },
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
  };

  const getUserTransaction = () => {
    if (loading) {
      return;
    }
    axios
      .get("https://api.tmdtbamboo.com/api/transactions", {
        headers: {
          Authorization: `Bearer ${window.sessionStorage.getItem("token")}`,
        },
        params: {
          userId: id,
          status: "DONE",
          type: "WITHDRAW"
        },
      })
      .then(function (response) {
        // handle success
        setUserTransaction(response.data);
        setLoading(false);
      })
      .catch(function (error) {
        // handle error
        console.log(error.request);
        setLoading(false);
      })
      .then(function () {
        // always executed
      });
  };

  const getUserTask = () => {
    if (loading) {
      return;
    }
    axios
      .get("https://api.tmdtbamboo.com/api/tasks", {
        headers: {
          Authorization: `Bearer ${window.sessionStorage.getItem("token")}`,
        },
        params: {
          userId: id,
          status: "DONE",
        },
      })
      .then(function (response) {
        // handle success
        setUserTask(response.data);
        setLoading(false);
      })
      .catch(function (error) {
        // handle error
        console.log(error.request);
        setLoading(false);  
      })
      .then(function () {
        // always executed
      });
  };

  const getUserError = () => {
    if (loading) {
      return;
    }
    axios
      .get("https://api.tmdtbamboo.com/api/deposit-error", {
        headers: {
          Authorization: `Bearer ${window.sessionStorage.getItem("token")}`,
        },
        params: {
          userId: id,
        },
      })
      .then(function (response) {
        // handle success
        setUserError(response.data);
        setLoading(false);
      })
      .catch(function (error) {
        // handle error
        console.log(error.request);
        setLoading(false);  
      })
      .then(function () {
        // always executed
      });
  };

  const putUserError = () => {
    axios
      .get("https://api.tmdtbamboo.com/api/deposit-error", {
        headers: {
          Authorization: `Bearer ${window.sessionStorage.getItem("token")}`,
        },
        params: {
          userId: id,
          depositError: depositError
        },
      })
      .then(function (response) {
        console.log(response);
        getUserError();
      })
      .catch(function (error) {
        // handle error
        console.log(error.request);
        setLoading(false);  
      })
      .then(function () {
        // always executed
      });
  };

  return (
    <Box sx={{ flexGrow: 1 }} className="boxContainer">
      <Helmet>
          <meta charSet="utf-8" />
          <title>Thông tin chi tiết</title>
      </Helmet>
      <Grid container spacing={0}>
        <Grid item xs={8}>
          {/* <LeftInformation /> */}
          <div id="layoutAuthentication">
            <div id="layoutAuthentication_content">
              <main>
                <div className="container">
                  <div className="firsBoxLeft row" style={leftBox}>
                    <div className="col">
                      {userData.idCardFront != null ? (
                        <img
                          src={
                            "https://api.tmdtbamboo.com/secure-images/" +
                            userData.idCardFront +
                            "?token=" +
                            window.sessionStorage.getItem("token")
                          }
                          style={imageData}
                        />
                      ) : (
                        <img
                          src={require("../../../../../assets/auth/assets/img/1.png")}
                          style={imageBox}
                        />
                      )}
                    </div>
                    <div className="col">
                      {userData.idCardFront != null ? (
                        <img
                          src={
                            "https://api.tmdtbamboo.com/secure-images/" +
                            userData.idCardBack +
                            "?token=" +
                            window.sessionStorage.getItem("token")
                          }
                          style={imageData}
                        />
                      ) : (
                        <img
                          src={require("../../../../../assets/auth/assets/img/1.png")}
                          style={imageBox}
                        />
                      )}
                    </div>
                    <div className="col">
                      {userData.idCardFront != null ? (
                        <img
                          src={
                            "https://api.tmdtbamboo.com/secure-images/" +
                            userData.cardImage +
                            "?token=" +
                            window.sessionStorage.getItem("token")
                          }
                          style={imageData}
                        />
                      ) : (
                        <img
                          src={require("../../../../../assets/auth/assets/img/1.png")}
                          style={imageBox}
                        />
                      )}
                    </div>
                  </div>
                  {/*------------------------------------------------- */}
                  <div className="secondBoxLeft row p-2" style={leftBox}>
                    <div className="col">
                      <h5>Lịch sử rút tiền</h5>
                    </div>
                    <div
                      id="scrollableDiv"
                      style={{
                        height: '100%',
                        overflow: "auto",
                        padding: "0 16px",
                        border: "1px solid rgba(140, 140, 140, 0.35)",
                      }}
                    >
                      <InfiniteScroll
                        dataLength={userTransaction.length}
                        next={getUserTransaction}
                        hasMore={userTransaction.length < 50}
                        loader={
                          <Skeleton avatar paragraph={{ rows: 1 }} loading={loading} />
                        }
                        endMessage={
                          <Divider plain>It is all, nothing more 🤐</Divider>
                        }
                        scrollableTarget="scrollableDiv"
                      >
                        <List
                          dataSource={userTransaction}
                          noDataText="Không có dữ liệu"
                          locale={{emptyText: "Không có dữ liệu"}}
                          renderItem={(item) => (
                            <List.Item key={item.id} className="row">
                              <List.Item.Meta
                                title={
                                  <p>
                                    {item.paymentType == "BANK_TRANSFER" ? "Chuyển khoản ngân hàng" : "Giao dịch trực tiếp"}
                                  </p>
                                }
                              />
                              <div>
                                <label>Số tiền: </label><span style={{ color: "grey"}}> {item.amount}</span>
                              </div>
                            </List.Item>
                          )}
                        />
                      </InfiniteScroll>
                    </div>
                  </div>

                  {/*------------------------------------------------- */}
                  <div className="thirdBoxLeft row p-2" style={leftBox}>
                    <div className="col">
                      <h5>Báo lỗi</h5>
                    </div>
                    <div style={{ marginBottom: 10}}>
                    <label style={{ fontWeight: 'bold' }}>Lỗi hiện tại: </label><span style={{ color: "red"}}> {userError}</span>
                    </div>
                    <div>
                      <input
                        type="text"
                        style={{
                          width: 300,
                          borderColor: "#FF9999",
                        }}
                        value={depositError}
                        onChange={(e) => setDepositError(e.target.value)}
                      />
                      <input
                        type="submit"
                        value="Xác nhận"
                        style={{
                          marginLeft: 10,
                          backgroundColor: "#FF9999",
                          color: "#FF0000",
                          borderColor: "#FF9999",
                        }}
                        onClick={putUserError}
                      />
                    </div>
                    <div></div>
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
                  <div className="firstBoxRight row p-2" style={box}>
                    <div className="col">
                      <h5 style={{ textAlign: "center" }}>Thông tin cá nhân</h5>
                    </div>
                    {readMore ? (
                      <div>
                        <label style={label}>Họ và tên:</label>
                        <span> {userData.fullName}</span>
                        <br />
                        <label style={label}>Giới tính:</label>
                        <span>
                          {" "}
                          {userData.gender == "FEMALE" ? "Nữ" : "Nam"}
                        </span>
                        <br />
                        <label style={label}>Số điện thoại:</label>
                        <span> {userData.phone}</span>
                        <br />
                        <label style={label}>Địa chỉ: </label>
                        <span> {userData.address}</span>
                        <br />
                        <label style={label}>Công việc:</label>
                        <span> {userData.job}</span>
                        <br />
                        <label style={label}>Số tài khoản:</label>
                        <span> {userData.bankNumber}</span>
                        <br />
                        <label style={label}>Tên ngân hàng:</label>
                        <span> {userData.bankName}</span>
                      </div>
                    ) : (
                      <div>
                        <label style={label}>Họ và tên: </label>
                        <span> {userData.fullName}</span>
                        <br />
                        <label style={label}>Số điện thoại: </label>
                        <span> {userData.phone}</span>
                      </div>
                    )}
                    <div style={{ textAlign: "center" }}>
                      {readMore ? (
                        <button
                          style={buttonReadMore}
                          onClick={() => setReadMore(false)}
                        >
                          <h6 style={{ color: "#0080FF" }}>Ẩn bớt</h6>
                        </button>
                      ) : (
                        <button
                          style={buttonReadMore}
                          onClick={() => setReadMore(true)}
                        >
                          <h6 style={{ color: "#0080FF" }}>Xem thêm</h6>
                        </button>
                      )}
                    </div>
                  </div>

                  {/*------------------------------------------------- */}
                  <div className="secondBoxRight row p-2" style={box}>
                    <div>
                      <label style={label}>Số dư: </label>
                      <span> {userInfo.money}</span>
                    </div>
                    <div>
                      <h6 style={{ textAlign: "center" }}>Điểm tín dụng:</h6>
                      <label style={label}>Trong tháng: </label>
                      <span> {userInfo.monthlyCreditPoint}</span>
                      <br />
                      <label style={label}>Hiện có: </label>
                      <span> {userInfo.creditPoint}</span>
                      <br />
                      <label style={label}>Tổng điểm: </label>
                      <span> {userInfo.totalPoint}</span>
                    </div>
                  </div>
                  {/*------------------------------------------------- */}
                  <div className="thirdBoxRight row p-2" style={box}>
                    <div className="col">
                      <h5 style={{ textAlign: "center" }}>Lịch sử nhiệm vụ</h5>
                    </div>
                    <div
                      id="scrollableDiv"
                      style={{
                        height: '100%',
                        overflow: "auto",
                        padding: "0 16px",
                        border: "1px solid rgba(140, 140, 140, 0.35)",
                      }}
                    >
                      <InfiniteScroll
                        dataLength={userTask.length}
                        next={getUserTask}
                        hasMore={userTask.length < 50}
                        loader={
                          <Skeleton avatar paragraph={{ rows: 1 }} loading={loading} />
                        }
                        endMessage={
                          <Divider plain>It is all, nothing more 🤐</Divider>
                        }
                        scrollableTarget="scrollableDiv"
                      >
                        <List
                          dataSource={userTask}
                          noDataText="Không có dữ liệu"
                          locale={{emptyText: "Không có dữ liệu"}}
                          renderItem={(item) => (
                            <List.Item key={item.id} className="row">
                              <List.Item.Meta
                                title={
                                  <p>
                                    {item.productName}
                                  </p>
                                }
                                description={item.description}
                              />
                              <div>
                                <label>Điểm nhận: </label><span style={{ color: "grey"}}> {item.receivedPoint}</span>
                              </div>
                            </List.Item>
                          )}
                        />
                      </InfiniteScroll>
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
};

const buttonReadMore = {
  border: "none",
  textAlign: "center",
  backgroundColor: "#fff",
};

const buttonRight = {
  borderRadius: 10,
  width: "30%",
};

const label = {
  fontWeight: "bold",
};

//Left
const imageBox = {
  width: 100,
  height: 100,
  justifyContent: "center",
};

const imageData = {
  width: 300,
  height: 200,
};

const buttonLeft = {
  marginTop: 5,
  marginBottom: 5,
  borderRadius: 20,
  color: "white",
  padding: 5,
  border: "none",
};

const leftBox = {
  backgroundColor: "white",
  margin: 5,
  borderRadius: 10,
};

const buttonError = {
  marginLeft: 20,
};
