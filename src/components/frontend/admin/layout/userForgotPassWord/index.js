import React, { useState, useEffect } from "react";
import { Table, Space, Modal, Input, Button, Tag } from "antd";
import axios from "axios";
import { SearchOutlined } from "@ant-design/icons";
import Highlighter from "react-highlight-words";
import ReactDOM from "react-dom";
import "antd/dist/antd.css";
import { LeftOutlined, RightOutlined  } from '@ant-design/icons';
import {Helmet} from "react-helmet";

const UserForgotPassWord = () => {
  const [dataTable, setDataTable] = useState([]);
  const [isModalVisible, setIsModalVisible] = useState(false);
  const [searchText, setSearchText] = useState("");
  const [searchedColumn, setSearchedColumn] = useState();
  const [newPassword, setNewPassword] = useState('')
  const [userId, setUserId] = useState('')
  const [id, setId] = useState('')
  const [isChanged, setIsChanged] = useState(false)
  const [page, setPage] = useState(0)
  const [pageSize] = useState(10)
  const [totalCount, setTotalCount] = useState(0)

  useEffect(() => {
    getDataTable();
  }, []);

  const getDataTable = async(pg = page, pgSize = pageSize) => {
    axios
      .get("https://api.tmdtbamboo.com/api/password-reset/users", {
        headers: {
          'Authorization': `Bearer ${window.sessionStorage.getItem('token')}`
        },
        params: {
          page: pg,
          size: pgSize
        }
      })
      .then(function (response) {
        // handle success
        setDataTable(response.data);
        setTotalCount(response.data.length);
      })
      .catch(function (error) {
        // handle error
        console.log(error);
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

  const onChangeUserPassword = () => {
    console.log(userId);
    const data = {
      "newPassword": newPassword,
      "userId": userId
    }
    
    axios
      .put("https://api.tmdtbamboo.com/api/password-reset/users/reset-password", data, {
        headers: {
          'Authorization': `Bearer ${window.sessionStorage.getItem('token')}`
        }
      })
      .then(function (response) {
        // handle success
        console.log("Success");
        axios
          .put("https://api.tmdtbamboo.com/api/password-reset/users/mark-changed", {}, {
            headers: {
              'Authorization': `Bearer ${window.sessionStorage.getItem('token')}`
            },
            params: {
              "id": id
            }
          })
          .then(function (response) {
            // handle success
            console.log("Success");
            getDataTable()
            setIsChanged(true)
          })
          .catch(function (error) {
            // handle error
            console.log(error.request);
          })
      })
      .catch(function (error) {
        // handle error
        console.log(error.request);
      })
  };

  const onChangePassword = (record) => {
    setIsModalVisible(true);
    setUserId(record.userId);
    setId(record.id);
  }

  const resetEditing = () => {
    setIsModalVisible(false);
  };

  const onChanged = (record) => {
    Modal.confirm({
      title: "Ng?????i d??ng " + record.userFullName + " ???? ???????c ?????i m???t kh???u!",
      okText: "X??c nh???n",
      cancelText: "H???y",
    });
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
      title: "Tr???ng th??i",
      dataIndex: "status",
      width: 200,
      align: "center",
      render: status => (
        <Space key={status}>
          {status == "CHANGED" ? "??ang x??? l??" : status == "DONE" ? "???? xong" : status == "PENDING" ? "Y??u c???u thay ?????i" : null}
        </Space>
      ),
    },
    {
      title: "L??u ??",
      dataIndex: "note",
      width: 200,
      align: "center",
    },
    {
      title: "H??nh ?????ng",
      width: 200,
      dataIndex: "",
      key: "x",
      render: (record) => (
        <Space size="middle">
          { record.status == "CHANGED" ?
          <Tag color="green">
            <a onClick={() => onChanged(record)}>???? ?????i m???t kh???u</a>
          </Tag>
          :
          <Tag color="blue">
            <a onClick={() => onChangePassword(record)}>?????i m???t kh???u</a>
          </Tag>
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
          <title>Qu???n l?? m???t kh???u</title>
      </Helmet>
      <Table
        columns={columns}
        dataSource={dataTable}
        // loading={dataTable == "" ? true : false}
        noDataText="Kh??ng c?? d??? li???u"
        locale={{emptyText: "Kh??ng c?? d??? li???u"}}
        pagination={false}
        footer={() => <Pagination/>}
      />

      {/* Modal */}
      <Modal
        title="S???a th??ng tin ng?????i d??ng"
        visible={isModalVisible}
        onOk={() => {
          onChangeUserPassword()
          resetEditing();
        }}
        onCancel={() => {
          resetEditing();
        }}
        okText="X??c nh???n"
        cancelText="H???y"
      >

        <label>
          <p style={{ marginTop: 5 }}>M???t kh???u m???i:</p>
        </label>
        <Input
          value={newPassword}
          onChange={(e) => setNewPassword(e.target.value)}
        />
      </Modal>
    </div>
  );
};

export default UserForgotPassWord;
