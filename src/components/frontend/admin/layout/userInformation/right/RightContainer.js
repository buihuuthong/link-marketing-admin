import React, { useState } from "react";
import { useNavigate } from "react-router-dom";
import "../../../../../../assets/auth/css/styles.css";
import "../../../../../../assets/auth/js/scripts";
import "./Right.css";

const RightInformation = () => {
  const navigate = useNavigate();
  const [readMore, setReadMore] = useState(false)

  return (
    <div>
      <div id="layoutAuthentication">
        <div id="layoutAuthentication_content">
          <main>
            <div className="container">
              {/*------------------------------------------------- */}
              <div class="firstBox row p-2" style={box}>
                <div class="col">
                  <h5 style={{ textAlign: "center" }}>Thông tin cá nhân</h5>
                </div>
                {readMore ? 
                <div>
                  <p>Họ và tên: Trần Thanh Liêm</p>
                  <p>Số điện thoại: 123456789</p>
                  <p>Ngày sinh: 10/08/1982</p>
                  <p>Địa chỉ: Biên Hòa - Đồng Nai</p>
                  <p>Công việc: abcd</p>
                </div>
                :
                <div>
                  <p>Họ và tên: Trần Thanh Liêm</p>
                  <p>Số điện thoại: 123456789</p>
                  <p>Ngày sinh: 10/08/1982</p>
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
                <div class="secondBox row p-2" style={box}>
                    <div>
                      <p>Số dư: 100000000000 VND</p>
                    </div>
                    <div class="row justify-content-center mt-3">
                        <button className="first-button" onClick="#" style={button}>
                          Cộng tiền
                        </button>
                        <p style={{ width: '20%'}}/>
                        <button className="second-button" onClick="#" style={button}>
                          Trừ tiền
                        </button>
                    </div>
                </div>

                {/*------------------------------------------------- */}
                <div class="firstBox row p-2" style={box}>
                    <div class="col">
                    <h5 style={{ textAlign: "center" }}>Chi tết thu chi</h5>
                    </div>
                </div>
            </div>
          </main>
        </div>
      </div>
    </div>
  );
};

export default RightInformation;

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

const button ={
    borderRadius: 10,
    width: '30%',
}
