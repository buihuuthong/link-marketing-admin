import React from 'react';

import Router from './Router';


const Transaction = ()=>{
      return (
          <div className="sb-nav-fixed">
             <div id="layoutSidenav">
                <div id="layoutSidenav_content">
                    <main>
                        <Router/>
                    </main>
                </div>
             </div>
          </div>
      )
}
export default Transaction;