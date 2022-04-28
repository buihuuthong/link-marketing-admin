import React from 'react';


import '../../../../assets/auth/css/styles.css';
import '../../../../assets/auth/js/scripts';

import Navbar from './Navbar';
import Sidebar from './Sidebar';
import Admin from '../DashBoard/Admin/Admin';
import ListUser from './userList/index'


const MasterLayoutSale = ()=>{
      return (
          <div className="sb-nav-fixed">
             <Navbar/>
             <div id="layoutSidenav">
                 <div id="layoutSidenav_nav">
                        <Sidebar/>
                 </div>
                <div id="layoutSidenav_content">
                    <main className="container-fluid bg-light">
                        <ListUser/>
                    </main>
                </div>
             </div>
          </div>
      )
}
export default MasterLayoutSale;