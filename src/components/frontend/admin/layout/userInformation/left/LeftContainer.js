import React, { useState } from 'react'
import { useNavigate } from 'react-router-dom'
import '../../../../../../assets/auth/css/styles.css';
import '../../../../../../assets/auth/js/scripts'
import './Left.css';


const LeftInformation = () => {

    const navigate = useNavigate();

    return (
      <div>
        <div id="layoutAuthentication">
          <div id="layoutAuthentication_content">
            <main>
                <div className="container">
                  <div class="firs-box row p-5" style={leftBox}>
                    <div class="col">
                      <img src={require('../../../../../../assets/auth/assets/img/1.png')} style={imageBox}/>
                    </div>
                    <div class="col">
                      <img src={require('../../../../../../assets/auth/assets/img/1.png')} style={imageBox}/>
                    </div>
                    <div class="col">
                      <img src={require('../../../../../../assets/auth/assets/img/1.png')} style={imageBox}/>
                    </div>
                  </div>
                {/*------------------------------------------------- */}
                  <div class="secondBox row p-2" style={leftBox}>
                    <div class="col">
                      <h5>Thông tin hợp đồng</h5>
                    </div>
                    <div class="col">

                    </div>
                    <div class="col">
                      <div class="row">
                        <button className="firstButton" onclick="#" style={button}>
                          Duyệt
                        </button>

                        <button className="secondButton" onclick="#" style={button}>
                          Từ chối
                        </button>

                        <button className="thirdButton"  onclick="#" style={button}>
                          abcd
                        </button>

                        <button className="lastButton"  onclick="#" style={button}>
                          Xem hợp đồng
                        </button>
                      </div>
                    </div>
                  </div>

                  {/*------------------------------------------------- */}
                  <div class="thirdBox row p-2" style={leftBox}>
                    <div class="col">
                      <h5>Rút tiền</h5>
                    </div>
                    <div>
                      <p>Không có thông tin rút tiền</p>
                    </div>
                    <div>

                    </div>
                  </div>

                  {/*------------------------------------------------- */}
                  <div class="lastBox row p-2" style={leftBox}>
                    <div class="col">
                      <h5>Báo lỗi</h5>
                    </div>
                    <div class="row">
                      <p style={buttonError}>Sai thông tin liên kết</p>
                      <p style={buttonError}>Điểm tín dụng không đủ</p>
                      <p style={buttonError}>Cờ bạc</p>
                      <p style={buttonError}>Đóng băng</p>
                      <p style={buttonError}>Rửa tiền</p>
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
    </div>
  );
}

export default LeftInformation

const imageBox = {
  width: 100,
  height: 100,
  justifyContent: 'center',
}

const button = {
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