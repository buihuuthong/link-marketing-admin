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
import { List, message, Avatar, Skeleton, Divider, Table, Space, Modal, Input, Button, Tag } from "antd";
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
  const [reason, setReason] = useState('')
  const [amount , setAmount ] = useState(0)
  const [isModalBonusMoney, setIsModalBonusMoney] = useState(false)
  const [isModalDeductionMoney, setIsModalDeductionMoney] = useState(false)

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
      .put("https://api.tmdtbamboo.com/api/deposit-error",{"depositError":depositError}, {
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
        setDepositError('')
        getUserError()
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

  const Bonus = () => {
    axios
      .post("https://api.tmdtbamboo.com/api/transactions/bonus", {}, {
        headers: {
          'Authorization': `Bearer ${window.sessionStorage.getItem('token')}`
        },
        params: {
            "userId": id,
            "amount": amount,
            "reason": reason
        }
      })
      .then(function (response) {
        // handle success
        console.log(response.data);
        setIsModalBonusMoney(false)
        getUserInfo()
        setAmount(0)
        setReason('')
      })
      .catch(function (error) {
        // handle error
        console.log(error.request);
      })
      .then(function () {
        // always executed
      });
  };

  const Deduction = () => {
    axios
      .post("https://api.tmdtbamboo.com/api/transactions/bonus", {}, {
        headers: {
          'Authorization': `Bearer ${window.sessionStorage.getItem('token')}`
        },
        params: {
            "userId": id,
            "amount": amount,
            "reason": reason
        }
      })
      .then(function (response) {
        // handle success
        console.log(response.data);
        setIsModalDeductionMoney(false)
        getUserInfo()
        setAmount(0)
        setReason('')
      })
      .catch(function (error) {
        // handle error
        console.log(error.request);
      })
      .then(function () {
        // always executed
      });
  };

  const onBonus = (record) => {
    setIsModalBonusMoney(true);
  }

  const onDeduction = (record) => {
    setIsModalDeductionMoney(true);
  }

  return (
    <Box sx={{ flexGrow: 1 }} className="boxContainer">
      <Helmet>
        <meta charSet="utf-8" />
        <title>Th??ng tin chi ti???t</title>
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
                      <h5>L???ch s??? r??t ti???n</h5>
                    </div>
                    <div
                      id="scrollableDiv"
                      style={{
                        height: "100%",
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
                          <Skeleton
                            avatar
                            paragraph={{ rows: 1 }}
                            loading={loading}
                          />
                        }
                        endMessage={
                          <Divider plain>It is all, nothing more ????</Divider>
                        }
                        scrollableTarget="scrollableDiv"
                      >
                        <List
                          dataSource={userTransaction}
                          noDataText="Kh??ng c?? d??? li???u"
                          locale={{ emptyText: "Kh??ng c?? d??? li???u" }}
                          renderItem={(item) => (
                            <List.Item key={item.id} className="row">
                              <List.Item.Meta
                                title={
                                  <p>
                                    {item.paymentType == "BANK_TRANSFER"
                                      ? "Chuy???n kho???n ng??n h??ng"
                                      : "Giao d???ch tr???c ti???p"}
                                  </p>
                                }
                              />
                              <div>
                                <label>S??? ti???n: </label>
                                <span style={{ color: "grey" }}>
                                  {" "}
                                  {item.amount}
                                </span>
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
                      <h5>B??o l???i</h5>
                    </div>
                    <div style={{ marginBottom: 10 }}>
                      <label style={{ fontWeight: "bold" }}>
                        L???i hi???n t???i:{" "}
                      </label>
                      <span style={{ color: "red" }}> {userError}</span>
                    </div>
                    <div>
                      <input
                        type="text"
                        style={{
                          width: "50%",
                          borderColor: "#FF9999",
                        }}
                        value={depositError}
                        onChange={(e) => setDepositError(e.target.value)}
                      />
                      <input
                        type="submit"
                        value="X??c nh???n"
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
                      <h5 style={{ textAlign: "center" }}>Th??ng tin c?? nh??n</h5>
                    </div>
                    {readMore ? (
                      <div>
                        <label style={label}>H??? v?? t??n:</label>
                        <span> {userData.fullName}</span>
                        <br />
                        <label style={label}>Gi???i t??nh:</label>
                        <span>
                          {" "}
                          {userData.gender == "FEMALE" ? "N???" : "Nam"}
                        </span>
                        <br />
                        <label style={label}>S??? ??i???n tho???i:</label>
                        <span> {userData.phone}</span>
                        <br />
                        <label style={label}>?????a ch???: </label>
                        <span> {userData.address}</span>
                        <br />
                        <label style={label}>C??ng vi???c:</label>
                        <span> {userData.job}</span>
                        <br />
                        <label style={label}>S??? t??i kho???n:</label>
                        <span> {userData.bankNumber}</span>
                        <br />
                        <label style={label}>T??n ng??n h??ng:</label>
                        <span> {userData.bankName}</span>
                      </div>
                    ) : (
                      <div>
                        <label style={label}>H??? v?? t??n: </label>
                        <span> {userData.fullName}</span>
                        <br />
                        <label style={label}>S??? ??i???n tho???i: </label>
                        <span> {userData.phone}</span>
                      </div>
                    )}
                    <div style={{ textAlign: "center" }}>
                      {readMore ? (
                        <button
                          style={buttonReadMore}
                          onClick={() => setReadMore(false)}
                        >
                          <h6 style={{ color: "#0080FF" }}>???n b???t</h6>
                        </button>
                      ) : (
                        <button
                          style={buttonReadMore}
                          onClick={() => setReadMore(true)}
                        >
                          <h6 style={{ color: "#0080FF" }}>Xem th??m</h6>
                        </button>
                      )}
                    </div>
                  </div>

                  {/*------------------------------------------------- */}
                  <div className="secondBoxRight row p-2" style={box}>
                    <div>
                      <label style={label}>S??? d??: </label>
                      <span> {userInfo.money}</span>
                    </div>
                    <div style={{ textAlign: "center" }}> 
                      <div class="row justify-content-evenly">
                        <div class="col-md-4">
                          <button class="btn-success" style={transactionBonus} onClick={onBonus}>C???ng ti???n</button>
                        </div>
                        <div class="col-md-4">
                          <button class="btn-danger" style={transactionBonus}  onClick={onDeduction}>Tr??? ti???n</button>
                        </div>
                      </div>
                    </div>
                    <div>
                      <h6 style={{ textAlign: "center" }}>??i???m t??n d???ng:</h6>
                      <label style={label}>Trong th??ng: </label>
                      <span> {userInfo.monthlyCreditPoint}</span>
                      <br />
                      <label style={label}>Hi???n c??: </label>
                      <span> {userInfo.creditPoint}</span>
                      <br />
                      <label style={label}>T???ng ??i???m: </label>
                      <span> {userInfo.totalPoint}</span>
                    </div>
                  </div>
                  {/*------------------------------------------------- */}
                  <div className="thirdBoxRight row p-2" style={box}>
                    <div className="col">
                      <h5 style={{ textAlign: "center" }}>L???ch s??? nhi???m v???</h5>
                    </div>
                    <div
                      id="scrollableDiv"
                      style={{
                        height: "100%",
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
                          <Skeleton
                            avatar
                            paragraph={{ rows: 1 }}
                            loading={loading}
                          />
                        }
                        endMessage={
                          <Divider plain>It is all, nothing more ????</Divider>
                        }
                        scrollableTarget="scrollableDiv"
                      >
                        <List
                          dataSource={userTask}
                          noDataText="Kh??ng c?? d??? li???u"
                          locale={{ emptyText: "Kh??ng c?? d??? li???u" }}
                          renderItem={(item) => (
                            <List.Item key={item.id} className="row">
                              <List.Item.Meta
                                title={<p>{item.productName}</p>}
                                description={item.description}
                              />
                              <div>
                                <label>??i???m nh???n: </label>
                                <span style={{ color: "grey" }}>
                                  {" "}
                                  {item.receivedPoint}
                                </span>
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
      
      <Modal
        title="C???ng ti???n"
        visible={isModalBonusMoney}
        onOk={() => Bonus()}
        onCancel={() => setIsModalBonusMoney(false)}
        okText="X??c nh???n"
        cancelText="H???y"
        zIndex={2000}
        centered
      >
        <label>S??? ti???n: </label>
        <Input
          value={amount}
          onChange={(e) => setAmount(e.target.value)}
        />

        <label>L?? do: </label>
        <Input
          value={reason}
          onChange={(e) => setReason(e.target.value)}
        />
      </Modal>

      <Modal
        title="Tr??? ti???n"
        visible={isModalDeductionMoney}
        onOk={() => Deduction()}
        onCancel={() => setIsModalDeductionMoney(false)}
        okText="X??c nh???n"
        cancelText="H???y"
        zIndex={2000}
        centered
      >
        <label>S??? ti???n (s??? ti???n nh???p v??o l?? s??? ??m): </label>
        <Input
          value={amount}
          onChange={(e) => setAmount(e.target.value)}
        />

        <label>L?? do: </label>
        <Input
          value={reason}
          onChange={(e) => setReason(e.target.value)}
        />
      </Modal>
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

const transactionBonus = {
  marginTop: 10,
  marginBottom: 10,
  border: 'none',
  borderRadius: 10,
  padding: 10,
  textAlign: "center",
  width: '100%'
}