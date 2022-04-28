import React, { useState } from 'react';
import { Modal, Button } from 'antd';
import 'antd/dist/antd.css';
import '../../../assets/auth/css/styles.css';
import '../../../assets/auth/js/scripts';
import ModalForgotPassword from './modal/ModalForgotPassword'

function ForgotPassword(){
    const [isModalVisible, setIsModalVisible] = useState(false);

    const showModal = () => {
      setIsModalVisible(true);
    };
  
    const handleOk = () => {
      setIsModalVisible(false);
    };
  
    const handleCancel = () => {
      setIsModalVisible(false);
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
                                    <div className="card-header"><h3 className="text-center font-weight-light my-4">Lấy lại mật khẩu</h3></div>
                                    <div className="card-body">
                                        <form>
                                            <div className="form-floating mb-3">
                                                <input className="form-control" id="inputEmail" type="email" placeholder="name@example.com" />
                                                <label htmlFor="inputEmail">Nhập Số điện thoại</label>
                                            </div>
                                           
                                            <div className="d-flex align-items-center justify-content-between mt-4 mb-0">
                                                <a className="small" href="/">Quay lại đăng nhập</a>
                                                <Button type="primary" onClick={showModal} className="btn btn-primary">Gửi</Button>
                                                <Modal title="Thông Tin Sale" visible={isModalVisible} onOk={handleOk} onCancel={handleCancel}>
                                                       <ModalForgotPassword/>
                                                </Modal>
                                            </div>
                                        </form>
                                    </div>
                                  
                                </div>
                            </div>
                        </div>
                    </div>
                </main>
            </div>
            {/* <div id="layoutAuthentication_footer">
                <footer className="py-4 bg-light mt-auto">
                    <div className="container-fluid px-4">
                        <div className="d-flex align-items-center justify-content-between small">
                            <div className="text-muted">Copyright &copy; Your Website 2022</div>
                            <div>
                                <a href="#">Privacy Policy</a>
                                &middot;
                                <a href="#">Terms &amp; Conditions</a>
                            </div>
                        </div>
                    </div>
                </footer>
            </div> */}
        </div>
       
    </div>
    )
}
export default ForgotPassword;