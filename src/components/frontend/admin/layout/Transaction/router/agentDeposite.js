import React, { useState, useEffect } from "react";
import { Table, Space, Modal, Input, Button, Tag } from "antd";
import axios from "axios";
import { SearchOutlined } from "@ant-design/icons";
import Highlighter from "react-highlight-words";
import ReactDOM from "react-dom";
import "antd/dist/antd.css";
import UserTask from "../../userTask";
import { useNavigate } from 'react-router-dom'

const AgentDeposite = () => {

  const navigate = useNavigate();
  const [dataTable, setDataTable] = useState([]);

  useEffect(() => {
    getDataTable();
  }, []);

  const getDataTable = () => {
    axios
      .get("http://113.161.151.124:808/api/transactions", {
        headers: {
          'Authorization': `Bearer ${window.sessionStorage.getItem('token')}`
        },
        params: {
            "type": "AGENT_DEPOSITE",

        }
      })
      .then(function (response) {
        // handle success
        setDataTable(response.data);
      })
      .catch(function (error) {
        // handle error
        console.log(error);
      })
      .then(function () {
        // always executed
      });
  };

  const columns = [
    {
      title: "STT",
      dataIndex: "key",
      width: 100,
      align: "center",
      key: 'index',
      render : (text, record, index) => index,
    },
    {
      title: "Họ và tên",
      dataIndex: "userFullName",
      width: 200,
      align: "center",
    },
    {
      title: "Số điện thoại",
      dataIndex: "userPhone",
      width: 200,
      align: "center",
    },
    {
      title: "Loại",
      width: 200,
      dataIndex: "type",
      align: "center",
    },
    {
      title: "Số tiền",
      width: 200,
      dataIndex: "amount",
      align: "center",
    },
    {
      title: "Hình thức giao dịch",
      width: 200,
      dataIndex: "paymentType",
      align: "center",
    },
    {
      title: "Trạng thái",
      width: 200,
      dataIndex: "status",
      align: "center",
    },
    {
      title: "Lưu ý",
      width: 200,
      dataIndex: "note",
      align: "center",
    },
    {
      title: "Lý do hủy",
      width: 200,
      dataIndex: "rejectReason",
      align: "center",
    },
    {
      title: "Hành động",
      width: 200,
      dataIndex: "",
      key: "x",
      render: (record) => (
        <Space size="middle">
          <div className="row">
            <div className="mb-1">
              <Tag color="blue">
                <a onClick={() => {}}>Sửa</a>
              </Tag>
              <Tag color="red">
                <a onClick={() => {}}>Xóa</a>
              </Tag>
            </div>
          </div>
        </Space>
      ),
      align: "center",
    },
  ];

  return (
    <div
      style={{
        height: "100%",
        margin: 20,
      }}
    >
      <Table
        columns={columns}
        dataSource={dataTable}
        // loading={dataTable == "" ? true : false}
        noDataText="Không có dữ liệu"
        locale={{emptyText: "Không có dữ liệu"}}
      />
    </div>
  );
}

export default AgentDeposite
