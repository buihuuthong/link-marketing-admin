import React, { useState, useEffect } from "react";
import { Table, Space, Modal, Input, Button, Tag } from "antd";
import axios from "axios";
import "antd/dist/antd.css";
import { useNavigate } from 'react-router-dom'

const Bonus = () => {

  const navigate = useNavigate();
  const [dataTable, setDataTable] = useState([]);
  const [isModalBonusMoney, setIsModalBonusMoney] = useState(false)
  const [isModalDeductionMoney, setIsModalDeductionMoney] = useState(false)
  const [amount , setAmount] = useState(0)
  const [reason, setReason] = useState('')
  const [userId, setUserId] = useState('')

  useEffect(() => {
    getDataTable();
  }, []);

  const getDataTable = () => {
    axios
      .get("http://113.161.151.124:8082/api/transactions", {
        headers: {
          'Authorization': `Bearer ${window.sessionStorage.getItem('token')}`
        },
        params: {
            "type": "BONUS",

        }
      })
      .then(function (response) {
        // handle success
        setDataTable(response.data);
      })
      .catch(function (error) {
        // handle error
        console.log(error.request);
      })
      .then(function () {
        // always executed
      });
  };

  const Bonus = () => {
    axios
      .post("http://113.161.151.124:8082/api/transactions/bonus", {}, {
        headers: {
          'Authorization': `Bearer ${window.sessionStorage.getItem('token')}`
        },
        params: {
            "userId": userId,
            "amount": amount,
            "reason": reason
        }
      })
      .then(function (response) {
        // handle success
        setDataTable(response.data);
      })
      .catch(function (error) {
        // handle error
        console.log(error.request);
      })
      .then(function () {
        // always executed
      });
  };

  const Deduction = () => {
    axios
      .post("http://113.161.151.124:8082/api/transactions/bonus", {}, {
        headers: {
          'Authorization': `Bearer ${window.sessionStorage.getItem('token')}`
        },
        params: {
            "userId": userId,
            "amount": amount,
            "reason": reason
        }
      })
      .then(function (response) {
        // handle success
        setDataTable(response.data);
      })
      .catch(function (error) {
        // handle error
        console.log(error.request);
      })
      .then(function () {
        // always executed
      });
  };


  const onBonus = (record) => {
    setIsModalBonusMoney(true);
    setUserId(record.userId);
  }

  const onDeduction = (record) => {
    setIsModalDeductionMoney(true);
    setUserId(record.userId);
  }

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
      title: "Lý do",
      width: 200,
      dataIndex: "reason",
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
                <a onClick={() => onBonus(record)}>Thưởng tiền</a>
              </Tag>
              <Tag color="red">
                <a onClick={() => onDeduction(record)}>Trừ tiền</a>
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

      <Modal
        title="Thưởng tiền"
        visible={isModalBonusMoney}
        onOk={() => Bonus()}
        onCancel={() => setIsModalBonusMoney(false)}
        okText="Xác nhận"
        cancelText="Hủy"
        zIndex={2000}
        centered
      >
        <label>Số tiền: </label>
        <Input
          value={amount}
          onChange={(e) => setAmount(e.target.value)}
        />

        <label>Lí do: </label>
        <Input
          value={reason}
          onChange={(e) => setReason(e.target.value)}
        />
      </Modal>

      <Modal
        title="Trừ tiền"
        visible={isModalDeductionMoney}
        onOk={() => Deduction()}
        onCancel={() => setIsModalDeductionMoney(false)}
        okText="Xác nhận"
        cancelText="Hủy"
        zIndex={2000}
        centered
      >
        <label>Số tiền: </label>
        <Input
          value={amount}
          onChange={(e) => setAmount(e.target.value)}
        />

        <label>Lí do: </label>
        <Input
          value={reason}
          onChange={(e) => setReason(e.target.value)}
        />
      </Modal>
    </div>
  );
}

export default Bonus
