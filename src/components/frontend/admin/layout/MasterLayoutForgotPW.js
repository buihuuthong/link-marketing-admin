import React from 'react';


import '../../../../assets/auth/css/styles.css';
import '../../../../assets/auth/js/scripts';

import Navbar from './Navbar';
import Sidebar from './Sidebar';
import UserForgotPassWord from './userForgotPassWord/index'


const MasterLayoutForgotPw = ()=>{
      return (
          <div className="sb-nav-fixed">
             <Navbar/>
             <div id="layoutSidenav">
                 <div id="layoutSidenav_nav">
                         <Sidebar/>
                 </div>
                <div id="layoutSidenav_content">
                    <main>
                         <UserForgotPassWord/>
                    </main>
                
                </div>
             </div>
          </div>
      )
}
export default MasterLayoutForgotPw;