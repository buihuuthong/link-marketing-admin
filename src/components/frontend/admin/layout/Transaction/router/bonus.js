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
      title: "H??? v?? t??n",
      dataIndex: "userFullName",
      width: 200,
      align: "center",
    },
    {
      title: "S??? ??i???n tho???i",
      dataIndex: "userPhone",
      width: 200,
      align: "center",
    },
    {
      title: "Lo???i",
      width: 200,
      dataIndex: "type",
      align: "center",
      render: type => (
        <Space key={type}>
          {type == 'BONUS' ? "Qu???n l?? th?????ng" : null}
        </Space>
      ),
    },
    {
      title: "S??? ti???n",
      width: 200,
      dataIndex: "amount",
      align: "center",
    },
    {
      title: "H??nh th???c giao d???ch",
      width: 200,
      dataIndex: "paymentType",
      align: "center",
      render: paymentType => (
        <Space key={paymentType}>
          {paymentType == 'DIRECT' ? "Tr???c Ti???p" :
          paymentType == 'BANK_TRANSFER' ? "Chuy???n kho???n ng??n h??ng" : null}
        </Space>
      ),
    },
    {
      title: "Tr???ng th??i",
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
      title: "L??u ??",
      width: 200,
      dataIndex: "note",
      align: "center",
    },
    {
      title: "L?? do",
      width: 200,
      dataIndex: "reason",
      align: "center",
    },
    {
      title: "H??nh ?????ng",
      width: 200,
      dataIndex: "",
      key: "x",
      render: (record) => (
        <Space size="middle">
          <div className="row">
              <Tag className="mb-2" color="blue">
                <a onClick={() => onBonus(record)}>Th?????ng ti???n</a>
              </Tag>
              <Tag color="red">
                <a onClick={() => onDeduction(record)}>Tr??? ti???n</a>
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
          <title>Qu???n l?? th?????ng</title>
      </Helmet>

      <div className="row">
        <div className="col"/>
        <div className="col" style={{textAlign: "right"}}>
          <Search placeholder="T??m ki???m theo t??n ho???c s??? ??i???n tho???i" onSearch={onSearch} style={{ width: "50%"}}/>
        </div>
      </div>

      <Table
        columns={columns}
        dataSource={dataTable}
        // loading={dataTable == "" ? true : false}
        noDataText="Kh??ng c?? d??? li???u"
        locale={{emptyText: "Kh??ng c?? d??? li???u"}}
        pagination={false}
        footer={() => <Pagination/>}
      />

      <Modal
        title="Th?????ng ti???n"
        visible={isModalBonusMoney}
        onOk={() => Bonus()}
        onCancel={() => setIsModalBonusMoney(false)}
        okText="X??c nh???n"
        cancelText="H???y"
        zIndex={2000}
        centered
      >
        <label>S??? ti???n: </label>
        <Input
          value={amount}
          onChange={(e) => setAmount(e.target.value)}
        />

        <label>L?? do: </label>
        <Input
          value={reason}
          onChange={(e) => setReason(e.target.value)}
        />
      </Modal>

      <Modal
        title="Tr??? ti???n"
        visible={isModalDeductionMoney}
        onOk={() => Deduction()}
        onCancel={() => setIsModalDeductionMoney(false)}
        okText="X??c nh???n"
        cancelText="H???y"
        zIndex={2000}
        centered
      >
        <label>S??? ti???n: </label>
        <Input
          value={amount}
          onChange={(e) => setAmount(e.target.value)}
        />

        <label>L?? do: </label>
        <Input
          value={reason}
          onChange={(e) => setReason(e.target.value)}
        />
      </Modal>
    </div>
  );
}

export default Bonus
