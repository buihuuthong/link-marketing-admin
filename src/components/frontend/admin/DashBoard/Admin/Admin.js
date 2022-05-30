import React, { useState, useEffect } from "react";
import { Table, Space, Modal, Input, Button, Tag } from "antd";
import axios from "axios";
import { SearchOutlined } from "@ant-design/icons";
import Highlighter from "react-highlight-words";
import ReactDOM from "react-dom";
import "antd/dist/antd.css";
  import { LeftOutlined, RightOutlined  } from '@ant-design/icons';
  import {Helmet} from "react-helmet";

const Admin = () => {
  const { Search } = Input;
  const [dataTable, setDataTable] = useState([]);
  const [isModalVisible, setIsModalVisible] = useState(false);
  const [isModalPass, setIsModalPass] = useState(false);
  const [modalAddSale, setModalAddSale] = useState(false)
  const [editUser, setEditUser] = useState(null);
  const [searchText, setSearchText] = useState("");
  const [searchedColumn, setSearchedColumn] = useState();
  const [dataSaleOverview, setDataSaleOverview] = useState([])
  const [isModalOverviewSale, setIsModalOverviewSale] = useState(false)

  //Thêm sale
  const [salePhone, setSalePhone] = useState('')
  const [saleFullName, setSaleFullName] = useState('')
  const [saleUserName, setSaleUserName] = useState('')
  const [salePassWord, setSalePassWord] = useState('')
  const [saleName, setSaleName] = useState('')
  const [newPassword, setNewPassword] = useState('')
  const [page, setPage] = useState(0)
  const [pageSize] = useState(10)
  const [totalCount, setTotalCount] = useState(0)
  const [search, setSearch] = useState()

  useEffect(() => {
    getDataTable();
  }, [search]);

  const getDataTable = async(pg = page, pgSize = pageSize) => {
    axios
      .get("https://api.tmdtbamboo.com/api/managers/sales", {
        headers: {
          'Authorization': `Bearer ${window.sessionStorage.getItem('token')}`
        },
        params: {
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

  const onSearch = async(value) => {
    getDataTable()
    setSearch(value)
  }

  const UpdateUser = () => {
    const data = {
      "contactPhone":  editUser.contactPhone,
      "fullName":  editUser.fullName,
      "newPassword": null,
    }
    
    axios
      .patch("https://api.tmdtbamboo.com/api/managers/sales", data, {
        headers: {
          'Authorization': `Bearer ${window.sessionStorage.getItem('token')}`
        },
        params: {
          "username": editUser.username,
        }
      })
      .then(function (response) {
        // handle success
        console.log("Success");
      })
      .catch(function (error) {
        // handle error
        console.log(error.request);
      })
      .then(function () {
        // always executed
      });
  };

  const UpdateUserPassword = () => {
    const data = {
      "contactPhone":  null,
      "fullName":  null,
      "newPassword": newPassword,
    }
    
    axios
      .patch("https://api.tmdtbamboo.com/api/managers/sales", data, {
        headers: {
          'Authorization': `Bearer ${window.sessionStorage.getItem('token')}`
        },
        params: {
          "username": saleName,
        }
      })
      .then(function (response) {
        // handle success
        console.log("Success");
      })
      .catch(function (error) {
        // handle error
        console.log(error.request);
      })
      .then(function () {
        // always executed
      });
  };

  const DeleteUser = (record) => {
    axios
      .delete("https://api.tmdtbamboo.com/api/managers/sales", {
        headers: {
          'Authorization': `Bearer ${window.sessionStorage.getItem('token')}`
        },
        params: {
          "username": record.username,
        }
      })
      .then(function (response) {
        // handle success
        console.log("Success");
      })
      .catch(function (error) {
        // handle error
        console.log(error.request);
      })
      .then(function () {
        // always executed
      });
  };

  const onDeleteUser = (record) => {
    Modal.confirm({
      title: "Bạn có chắc chắn muốn xóa tài khoản này?",
      okText: "Xác nhận",
      okType: "danger",
      onOk: () => {
        setDataTable((pre) => {
          return pre.filter((user) => user.id !== record.id);
        });
        DeleteUser(record)
      },
      cancelText: "Hủy",
    });
  };

  const LockedUser = (record) =>{
    axios
      .put("https://api.tmdtbamboo.com/api/managers/sales/lock",{} ,{
        headers: {
          'Authorization': `Bearer ${window.sessionStorage.getItem('token')}`
        },
        params: {
          "username": record.username,
          "isLocked": true
        }
      })
      .then(function (response) {
        // handle success
        console.log("Success");
        getDataTable()
      })
      .catch(function (error) {
        // handle error
        console.log(error.request);
      })
      .then(function () {
        // always executed
      });
  }

  const UnLockedUser = (record) =>{
    axios
      .put("https://api.tmdtbamboo.com/api/managers/sales/lock",{} ,{
        headers: {
          'Authorization': `Bearer ${window.sessionStorage.getItem('token')}`
        },
        params: {
          "username": record.username,
          "isLocked": false
        }
      })
      .then(function (response) {
        // handle success
        console.log("Success");
        getDataTable()
      })
      .catch(function (error) {
        // handle error
        console.log(error.request);
      })
      .then(function () {
        // always executed
      });
  }

  const onLockedUser = (record) => {
    Modal.confirm({
      title: "Bạn có chắc chắn muốn khóa tài khoản này?",
      okText: "Xác nhận",
      okType: "danger",
      onOk: () => {
        LockedUser(record)
      },
      cancelText: "Hủy",
    });
  }

  const onUnLockedUser = (record) => {
    Modal.confirm({
      title: "Bạn có chắc chắn muốn mở khóa tài khoản này?",
      okText: "Xác nhận",
      onOk: () => {
        UnLockedUser(record)
      },
      cancelText: "Hủy",
    });
  }

  const getDataSaleOverview = (record) => {
    axios
      .get("https://api.tmdtbamboo.com/api/managers/sales/overview", {
        headers: {
          'Authorization': `Bearer ${window.sessionStorage.getItem('token')}`
        },
        params: {
          "username": record.username,
        }
      })
      .then(function (response) {
        // handle success
        setDataSaleOverview(response.data);
        console.log(response.data);
      })
      .catch(function (error) {
        // handle error
        console.log(error.request);
      })
      .then(function () {
        // always executed
      });
  };

  const editUsersTable = (record) => {
    setIsModalVisible(true);
    setEditUser({ ...record });
  };

  const resetEditing = () => {
    setIsModalVisible(false);
    setIsModalPass(false)
    setEditUser(null);
  }

  const onChangePassword = (record) => {
    setIsModalPass(true);
    setSaleName(record.username);
  }

  const onOverviewSale = (record) => {
    setIsModalOverviewSale(true)
    getDataSaleOverview(record)
  }

  const handleOk = () => {
    const data = {
      "contactPhone": salePhone,
      "fullName": saleFullName,
      "password": salePassWord,
      "username": saleUserName
    }
    
    axios
      .post("https://api.tmdtbamboo.com/api/managers/sales", data, {
        headers: {
          'Authorization': `Bearer ${window.sessionStorage.getItem('token')}`
        },
      })
      .then(function (response) {
        // handle success
        console.log("Success");
        setModalAddSale(false)
        getDataTable()
      })
      .catch(function (error) {
        // handle error
        console.log(error.request);
      })
      .then(function () {
        // always executed
      });
  };

  const handleCancel = () => {
    setModalAddSale(false);
    setSalePhone('')
    setSaleFullName('')
    setSaleUserName('')
    setSalePassWord('')
  };

  const columns = [
    {
      title: "STT",
      dataIndex: "key",
      width: 50,
      align: "center",
      key: 'index',
      render : (text, record, index) => index,
    },
    {
      title: "Tài khoản",
      dataIndex: "username",
      width: 200,
      align: "center",
    },
    {
      title: "Họ và tên",
      dataIndex: "fullName",
      width: 200,
      align: "center",
    },
    {
      title: "Chức vụ",
      dataIndex: "role",
      width: 150,
      align: "center",
      render: role => (
        <Space key={role}>
          {role == 'ROLE_ADMIN' ? "Quản trị viên" : "Sale"}
        </Space>
      ),
    },
    {
      title: "Trạng thái",
      dataIndex: "isLocked",
      width: 150,
      align: "center",
      render: isLocked => (
        <Space key={isLocked}>
          {isLocked == true ? "Đã khóa" : "Đang hoạt động"}
        </Space>
      ),
    },
    {
      title: "Số điện thoại",
      dataIndex: "contactPhone",
      width: 150,
      align: "center",
    },
    {
      title: "Hành động",
      width: 250,
      dataIndex: "",
      key: "x",
      render: (record) => (
        <Space size="middle">
          <div className="row">
            <div className="mb-1">
              { record.isLocked == true ?
                <Tag color="green">
                  <a onClick={() => onUnLockedUser(record)}>Mở khóa</a>
                </Tag>
              :
              <Tag color="red">
                <a onClick={() => onLockedUser(record)}>Khóa</a>
              </Tag>
              }
              <Tag color="blue">
                <a onClick={() => editUsersTable(record)}>Sửa</a>
              </Tag>
              <Tag color="red">
                <a onClick={() => onDeleteUser(record)}>Xóa</a>
              </Tag>
            </div>
            <div>
              <Tag color="geekblue">
                <a onClick={() => onChangePassword(record)}>Đổi mật khẩu</a>
              </Tag>
              <Tag color="geekblue">
                <a onClick={() => onOverviewSale(record)}>Thống kê sale</a>
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
      <Helmet>
        <meta charSet="utf-8" />
        <title>Quản lí sale</title>
        <link rel="canonical" href="http://mysite.com/example" />
      </Helmet>
      <div className="row">
        <div className="col">
          <Button 
            type="primary"
            onClick={() => setModalAddSale(true)}
          >
            ✖️Thêm tài khoản Sale 
          </Button>
        </div>
        <div className="col" style={{textAlign: "right"}}>
          <Search placeholder="Tìm kiếm theo tên hoặc tài khoản" onSearch={onSearch} style={{ width: "50%"}}/>
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

      {/* Modal */}
      <Modal
        title="Sửa thông tin người dùng"
        visible={isModalVisible}
        onOk={() => {
          setDataTable((pre) => {
            return pre.map((user) => {
              if (user.id === editUser.id) {
                setTimeout(() => {
                  UpdateUser()
                }, 1000);
                return editUser;
              } else {
                return user;
              }
            });
          });
          resetEditing();
        }}
        onCancel={() => {
          resetEditing();
        }}
        okText="Xác nhận"
        cancelText="Hủy"
      >

        <label>
          <p style={{ marginTop: 5 }}>Họ và Tên: {}</p>
        </label>
        <Input
          value={editUser?.fullName}
          onChange={(e) => {
            setEditUser((pre) => {
              return { ...pre, fullName: e.target.value };
            });
          }}
        />

        <label>
          <p style={{ marginTop: 5 }}>Số điện thoại:</p>
        </label>
        <Input
          value={editUser?.contactPhone}
          onChange={(e) => {
            setEditUser((pre) => {
              return { ...pre, contactPhone: e.target.value };
            });
          }}
        />

      </Modal>

      {/* Modal thêm sale */}
      <Modal title="Basic Modal" visible={modalAddSale} onOk={handleOk} onCancel={handleCancel} >
        <label>
          <p style={{ marginTop: 5 }}>Họ và Tên: {}</p>
        </label>
        <Input
          value={saleFullName}
          onChange={(e) => {
            setSaleFullName(e.target.value);
          }}
        />
        
        <label>
          <p style={{ marginTop: 5 }}>Tài khoản: {}</p>
        </label>
        <Input
          value={saleUserName}
          onChange={(e) => {
            setSaleUserName(e.target.value);
          }}
        />
        
        <label>
          <p style={{ marginTop: 5 }}>Mật khẩu: {}</p>
        </label>
        <Input
          value={salePassWord}
          onChange={(e) => {
            setSalePassWord(e.target.value);
          }}
        />
        
        <label>
          <p style={{ marginTop: 5 }}>Số điện thoại: {}</p>
        </label>
        <Input
          value={salePhone}
          onChange={(e) => {
            setSalePhone(e.target.value);
          }}
        />
      </Modal>

      {/* Đổi mật khẩu sale */}
      <Modal
        title="Đổi mật khẩu slae"
        visible={isModalPass}
        onOk={() => {
          UpdateUserPassword()
          resetEditing();
        }}
        onCancel={() => {
          resetEditing();
        }}
        okText="Xác nhận"
        cancelText="Hủy"
      >

        <label>
          <p style={{ marginTop: 5 }}>Mật khẩu mới:</p>
        </label>
        <Input
          value={newPassword}
          onChange={(e) => setNewPassword(e.target.value)}
        />
      </Modal>

      {/* Thống kê sale */}
      <Modal
        title="Thống kê nhiệm vụ"
        visible={isModalOverviewSale}
        onOk={() => setIsModalOverviewSale(false)}
        onCancel={() => setIsModalOverviewSale(false)}
        okText="Đóng"
        cancelText="Hủy"
        zIndex={2000}
        centered
      >
        <div>
          <div>
            <label style={{ fontWeight:"bold"}}>Số người dùng hôm nay: </label>
            <span> {dataSaleOverview.todayUserCount}</span>
          </div>
          <div>
            <label style={{ fontWeight:"bold"}}>Số tiền gửi của người dùng hôm nay: </label> 
            <span> {dataSaleOverview.todayUserDeposite}</span>
          </div>
          <div>
            <label style={{ fontWeight:"bold"}}>Tổng số người dùng quản lí: </label>
            <span> {dataSaleOverview.totalUserCount}</span>
          </div>
          <div>
            <label style={{ fontWeight:"bold"}}>Tổng số tiền gửi của người dùng: </label>
            <span> {dataSaleOverview.totalUserDeposite}</span>
          </div>
        </div>
      </Modal>
    </div>
  );
};

export default Admin;
