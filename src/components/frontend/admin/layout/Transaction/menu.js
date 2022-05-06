import React from "react";
import {Link} from 'react-router-dom'
import { Button, Menu, Dropdown, MenuProps } from 'antd';

const MenuTransaction = () => {
  return (
    <div className="column m-2">
      <Link
        to="/admin/transaction/agent-deposite"
        style={{ textAlign: "center", padding: "10px 0", marginRight: "10px" }}
      >
        <Button>Quản lí nạp tiền lên cấp</Button>
      </Link>

      <Link
        to="/admin/transaction/task-deposite"
        style={{ textAlign: "center", padding: "10px 0", marginRight: "10px" }}
      >
        <Button>Quản lí nạp tiền nhiệm vụ</Button>
      </Link>
      
      <Link
        to="/admin/transaction/withdraw"
        style={{ textAlign: "center", padding: "10px 0", marginRight: "10px" }}
      >
        <Button>Quản lí rút tiền</Button>
      </Link>
      
      <Link
        to="/admin/transaction/bonus"
        style={{ textAlign: "center", padding: "10px 0", marginRight: "10px" }}
      >
        <Button>Quản lí thưởng</Button>
      </Link>
    </div>
  );
};
export default MenuTransaction;
