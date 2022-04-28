import React from 'react';
import '../../../assets/auth/css/styles.css';
import '../../../assets/auth/js/scripts';

function Register(){
   return(
    <div className="bg-primary">
    <div id="layoutAuthentication">
        <div id="layoutAuthentication_content">
            <main>
                <div className="container">
                    <div className="row justify-content-center">
                        <div className="col-lg-7">
                            <div className="card shadow-lg border-0 rounded-lg mt-5">
                                <div className="card-header"><h3 className="text-center font-weight-light my-4">Tạo Tài Khoản</h3></div>
                                <div className="card-body">
                                    <form>
                                    <div className="form-floating mb-3">
                                            <input className="form-control" id="inputEmail" type="text" placeholder="Nhập số điện thoại" />
                                            <label htmlFor="inputEmail">Nhập số điện thoại</label>
                                        </div>
                                        <div className="form-floating mb-3">
                                            <input className="form-control" id="inputEmail" type="text" placeholder="Nhập mật khẩu" />
                                            <label htmlFor="inputEmail">Nhập mật khẩu</label>
                                        </div>
                                        <div className="form-floating mb-3">
                                            <input className="form-control" id="inputEmail" type="text" placeholder="Nhập lại mật khẩu" />
                                            <label htmlFor="inputEmail">Nhập lại mật khẩu</label>
                                        </div>
                                     
                                        <div className="row mb-3">
                                            <div className="col-md-6">
                                                <div className="form-floating mb-3 mb-md-0">
                                                    <input className="form-control" id="inputFirstName" type="text" placeholder="Enter your first name" />
                                                    <label htmlFor="inputFirstName">First name</label>
                                                </div>
                                            </div>
                                            <div className="col-md-6">
                                                <div className="form-floating">
                                                    <input className="form-control" id="inputLastName" type="text" placeholder="Enter your last name" />
                                                    <label htmlFor="inputLastName">Last name</label>
                                                </div>
                                            </div>
                                        </div>
                                        <div className="form-floating mb-3">
                                            <input className="form-control" id="inputSex" type="text" placeholder="nam hoặc nữ" />
                                            <label htmlFor="inputSex">Giới tính</label>
                                        </div>
                                        <div className="form-floating mb-3">
                                            <input className="form-control" id="inputJob" type="text" placeholder="Nghề nghiệp" />
                                            <label htmlFor="inputJob">Nghề nghiệp</label>
                                        </div>
                                        <div className="form-floating mb-3">
                                            <input className="form-control" id="inputBank" type="text" placeholder="Số tài khoản" />
                                            <label htmlFor="inputBank">Số tài khoản ngân hàng</label>
                                        </div>
                                        <div className="form-floating mb-3">
                                            <input className="form-control" id="inputBank" type="text" placeholder="Số tài khoản"list="listbank" />
                                            <datalist id="listbank">
                                            <option value="VietCombank" />
                                            <option value="Agribank" />
                                            <option value="ACB" />
                                            <option value="BIDV" />
                                            <option value="TPBank" />
                                            <option value="Sacombank" />
                                            <option value="Vietinbank" />
                                            <option value="VPBank" />
                                            <option value="Techcombank" />
                                            </datalist>
                                            <label htmlFor="inputBank">Tên tài khoản ngân hàng</label>
                                        </div>
                                        <label >Chân dung</label>
                                        <div className="form-floating mb-3">
                                            <input className="form-control" id="Chandung" type="file" placeholder="Chân dung"/>
                                           
                                        </div>
                                        <label>Chứng minh nhân dân mặt trước</label>
                                        <div className="form-floating mb-3">
                                            <input className="form-control" id="CMNDfront" type="file" placeholder="CMND mặt trước " />
                                           
                                        </div>
                                        <label >Chứng minh nhân dân mặt sau</label>
                                        <div className="form-floating mb-3">
                                            <input className="form-control" id="CMNDback" type="file" placeholder="CMND mặt sau" />
                                           
                                        </div>
                                       
                                        <div className="mt-4 mb-0">
                                            <div className="d-grid"><a className="btn btn-primary btn-block" href="login.html">Tạo Tài Khoản</a></div>
                                        </div>
                                    </form>
                                </div>
                                <div className="card-footer text-center py-3">
                                    <div className="small"><a href="/login">Bạn đã có tài khoản ? Quay lại đăng nhập!</a></div>
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
export default Register;