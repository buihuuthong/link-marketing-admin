import React, { useState, useEffect } from "react";
import { Table, Space, Modal, Input, Button, Tag } from "antd";
import axios from "axios";
import "antd/dist/antd.css";
import { useNavigate } from 'react-router-dom'
import { LeftOutlined, RightOutlined  } from '@ant-design/icons';
import {Helmet} from "react-helmet";

const Bonus = () => {
  const { Search } = Input;
  const navigate = useNavigate();
  const [dataTable, setDataTable] = useState([]);
  const [isModalBonusMoney, setIsModalBonusMoney] = useState(false)
  const [isModalDeductionMoney, setIsModalDeductionMoney] = useState(false)
  const [amount , setAmount] = useState(0)
  const [reason, setReason] = useState('')
  const [userId, setUserId] = useState('')
  const [page, setPage] = useState(0)
  const [pageSize] = useState(10)
  const [totalCount, setTotalCount] = useState(0)
  const [search, setSearch] = useState()

  useEffect(() => {
    getDataTable();
  }, [search]);

  const getDataTable = async(pg = page, pgSize = pageSize) => {
    axios
      .get("https://api.tmdtbamboo.com/api/transactions", {
        headers: {
          'Authorization': `Bearer ${window.sessionStorage.getItem('token')}`
        },
        params: {
            "type": "BONUS",
            page: pg,
            size: pgSize,
            search: search
        }
      })
      .then(function (response) {
        // handle success
        setDataTable(response.data);
        setTotalCount(response.data.length);
      })
      .catch(function (error) {
        // handle error
        console.log(error.request);
      })
      .then(function () {
        // always executed
      });
  };

  const prevPage = async() => {
    const pg = page === 0 ? 0 : page - 1
    getDataTable(pg)
    setPage(pg);
  }
  
  const nextPage = async() => {
    const pg = page < Math.ceil(totalCount / pageSize) ? page + 1 : page
    getDataTable(pg)
    setPage(pg);
  }

  const handleKeyDown = (event) => {
    if (event.key === 'Enter') {
      getDataTable(event.target.value)
      setPage(event.target.value)
    }
  }
  
  const Pagination = () => {
    return(
      <>
        <Button icon={<LeftOutlined onClick={prevPage}/>} />
        <Input style={{ width: '5%', textAlign: "center"}} defaultValue={page} onKeyDown={handleKeyDown}/>
        <Button icon={<RightOutlined />} onClick={nextPage} />
      </>
    )
  }

  const onSearch = async(value) => {
    getDataTable()
    setSearch(value)
  }

  const Bonus = () => {
    axios
      .post("https://api.tmdtbamboo.com/api/transactions/bonus", {}, {
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
        setIsModalBonusMoney(false)
        setAmount(0)
        setReason('')
        getDataTable();
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
      .post("https://api.tmdtbamboo.com/api/transactions/bonus", {}, {
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
        setIsModalDeductionMoney(false)
        setAmount(0)
        setReason('')
        getDataTable();
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
      render: type => (
        <Space key={type}>
          {type == 'BONUS' ? "Quản lí thưởng" : null}
        </Space>
      ),
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
      render: paymentType => (
        <Space key={paymentType}>
          {paymentType == 'DIRECT' ? "Trực Tiếp" :
          paymentType == 'BANK_TRANSFER' ? "Chuyển khoản ngân hàng" : null}
        </Space>
      ),
    },
    {
      title: "Trạng thái",
      width: 200,
      dataIndex: "status",
      align: "center",
      render: status => (
        <Space key={status}>
          {status == 'DONE' ? "Xong" : null}
        </Space>
      ),
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
              <Tag className="mb-2" color="blue">
                <a onClick={() => onBonus(record)}>Thưởng tiền</a>
              </Tag>
              <Tag color="red">
                <a onClick={() => onDeduction(record)}>Trừ tiền</a>
              </Tag>
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
      <Helmet>
          <meta charSet="utf-8" />
          <title>Quản lí thưởng</title>
      </Helmet>

      <div className="row">
        <div className="col"/>
        <div className="col" style={{textAlign: "right"}}>
          <Search placeholder="Tìm kiếm theo tên hoặc số điện thoại" onSearch={onSearch} style={{ width: "50%"}}/>
        </div>
      </div>

      <Table
        columns={columns}
        dataSource={dataTable}
        // loading={dataTable == "" ? true : false}
        noDataText="Không có dữ liệu"
        locale={{emptyText: "Không có dữ liệu"}}
        pagination={false}
        footer={() => <Pagination/>}
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
