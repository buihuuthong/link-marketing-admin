import React, { useState, useEffect } from "react";
import { Table, Space, Modal, Input, Button, Tag } from "antd";
import axios from "axios";
import "antd/dist/antd.css";
import { useNavigate } from 'react-router-dom'
import { LeftOutlined, RightOutlined  } from '@ant-design/icons';
import {Helmet} from "react-helmet";

const WithDraw = () => {

  const { Search } = Input;
  const navigate = useNavigate();
  const [dataTable, setDataTable] = useState([]);
  const [isModalRejectTransaction, setIsModalRejectTransaction] = useState(false)
  const [reasonReject, setReasonReject] = useState('')
  const [id, setId] = useState('')
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
            "type": "WITHDRAW",
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

  const onAcceptTransaction = (record) => {
    console.log(record.id);
    axios
      .put("https://api.tmdtbamboo.com/api/transactions/withdraw", {}, {
        headers: {
          'Authorization': `Bearer ${window.sessionStorage.getItem('token')}`
        },
        params: {
            "id": record.id,
            "isRejected": false
        }
      })
      .then(function (response) {
        // handle success
        console.log("Success!");
        getDataTable();
      })
      .catch(function (error) {
        // handle error
        console.log(error.request);
      })
      .then(function () {
        // always executed
      });
  }

  const RejectTransaction = () => {
    axios
      .put("https://api.tmdtbamboo.com/api/transactions/withdraw", {}, {
        headers: {
          'Authorization': `Bearer ${window.sessionStorage.getItem('token')}`
        },
        params: {
            "id": id,
            "isRejected": true,
            "rejectReason": reasonReject
        }
      })
      .then(function (response) {
        // handle success
        console.log("Success!");
        setIsModalRejectTransaction(false)
        getDataTable();
      })
      .catch(function (error) {
        // handle error
        console.log(error.request);
      })
      .then(function () {
        // always executed
      });
  }

  const onRejectTransaction = (record) => {
    setIsModalRejectTransaction(true);
    setId(record.id);
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
          {type == 'WITHDRAW' ? "R??t ti???n" : null}
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
          {paymentType == 'BANK_TRANSFER' ? "Chuy???n kho???n ng??n h??ng" : null}
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
          {status == 'DONE' ? "Xong" :
            status == 'PENDING' ? "??ang ch???" :
            status == 'REJECTED' ? "???? h???y" : null
          }
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
      title: "L?? do h???y",
      width: 200,
      dataIndex: "rejectReason",
      align: "center",
    },
    {
      title: "H??nh ?????ng",
      width: 200,
      dataIndex: "",
      key: "x",
      render: (record) => (
        <Space size="middle">
          { record.status == "DONE"? 
            <Tag color="green">
              <a>???? duy???t</a>
            </Tag>
            :
            record.status == "REJECTED"? 
            <Tag color="red">
              <a>???? h???y</a>
            </Tag>
            :
            <>
              <Tag color="green">
                <a onClick={() => onAcceptTransaction(record)}>Duy???t</a>
              </Tag>
              <Tag color="red">
                <a onClick={() => onRejectTransaction(record)}>H???y</a>
              </Tag>
            </>
          }
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
          <title>Qu???n l?? r??t ti???n</title>
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
        title="H???y y??u c???u"
        visible={isModalRejectTransaction}
        onOk={() => RejectTransaction()}
        onCancel={() => setIsModalRejectTransaction(false)}
        okText="X??c nh???n"
        cancelText="H???y"
        zIndex={2000}
        centered
      >
        <label>L?? do: </label>
        <Input
          value={reasonReject}
          onChange={(e) => setReasonReject(e.target.value)}
        />
      </Modal>
    </div>
  );
}

export default WithDraw
