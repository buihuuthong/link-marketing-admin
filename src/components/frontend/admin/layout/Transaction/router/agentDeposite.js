import React, { useState, useEffect } from "react";
import { Table, Space, Modal, Input, Button, Tag } from "antd";
import axios from "axios";
import "antd/dist/antd.css";
import { useNavigate } from 'react-router-dom'
import { LeftOutlined, RightOutlined  } from '@ant-design/icons';
import {Helmet} from "react-helmet";

const AgentDeposite = () => {

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
            "type": "AGENT_DEPOSITE",
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
      .put("https://api.tmdtbamboo.com/api/transactions/deposite", {}, {
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
      .put("https://api.tmdtbamboo.com/api/transactions/deposite", {}, {
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
          {type == 'AGENT_DEPOSITE' ? "Nạp lên cấp" : null}
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
          {paymentType == 'BANK_TRANSFER' ? "Chuyển khoản ngân hàng" : null}
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
          {status == 'DONE' ? "Xong" :
            status == 'PENDING' ? "Đang chờ" :
            status == 'REJECTED' ? "Đã hủy" : null
          }
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
          { record.status == "DONE"? 
            <Tag color="green">
              <a>Đã duyệt</a>
            </Tag>
            :
            record.status == "REJECTED"? 
            <Tag color="red">
              <a>Đã hủy</a>
            </Tag>
            :
            <>
              <Tag color="green">
                <a onClick={() => onAcceptTransaction(record)}>Duyệt</a>
              </Tag>
              <Tag color="red">
                <a onClick={() => onRejectTransaction(record)}>Hủy</a>
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
          <title>Quản lí nạp tiền lên cấp</title>
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
        title="Hủy yêu cầu"
        visible={isModalRejectTransaction}
        onOk={() => RejectTransaction()}
        onCancel={() => setIsModalRejectTransaction(false)}
        okText="Xác nhận"
        cancelText="Hủy"
        zIndex={2000}
        centered
      >
        <label>Lí do: </label>
        <Input
          value={reasonReject}
          onChange={(e) => setReasonReject(e.target.value)}
        />
      </Modal>
    </div>
  );
}

export default AgentDeposite
