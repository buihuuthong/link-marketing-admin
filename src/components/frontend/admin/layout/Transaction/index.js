import React from 'react';

import Router from './Router';
import MenuTransaction from './menu';


const Transaction = ()=>{
      return (
          <div>
            <div>
                <MenuTransaction/>
            </div>
            <div>
                <Router/>
            </div>
          </div>
      )
}
export default Transaction;