import React, { useState, useEffect } from "react";
import { Table, Space, Modal, Input, Button, Tag } from "antd";
import axios from "axios";
import { SearchOutlined } from "@ant-design/icons";
import Highlighter from "react-highlight-words";
import ReactDOM from "react-dom";
import "antd/dist/antd.css";

const Admin = () => {
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

  useEffect(() => {
    getDataTable();
  }, []);

  const getDataTable = () => {
    axios
      .get("http://113.161.151.124:8082/api/managers/sales", {
        headers: {
          'Authorization': `Bearer ${window.sessionStorage.getItem('token')}`
        }
      })
      .then(function (response) {
        // handle success
        setDataTable(response.data);
        console.log(response.data);
      })
      .catch(function (error) {
        // handle error
        console.log(error);
      })
      .then(function () {
        // always executed
      });
  };


  const UpdateUser = () => {
    const data = {
      "contactPhone":  editUser.contactPhone,
      "fullName":  editUser.fullName,
      "newPassword": null,
    }
    
    axios
      .patch("http://113.161.151.124:8082/api/managers/sales", data, {
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
      .patch("http://113.161.151.124:8082/api/managers/sales", data, {
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
      .delete("http://113.161.151.124:8082/api/managers/sales", {
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
      .put("http://113.161.151.124:8082/api/managers/sales/lock",{} ,{
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
      .put("http://113.161.151.124:8082/api/managers/sales/lock",{} ,{
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
      .get("http://113.161.151.124:8082/api/managers/sales/overview", {
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

  const getColumnSearchProps = (dataIndex) => ({
    filterDropdown: ({
      setSelectedKeys,
      selectedKeys,
      confirm,
      clearFilters,
    }) => (
      <div style={{ padding: 8 }}>
        <Input
          placeholder={`Tìm kiếm`}
          value={selectedKeys[0]}
          onChange={(e) =>
            setSelectedKeys(e.target.value ? [e.target.value] : [])
          }
          onPressEnter={() => handleSearch(selectedKeys, confirm, dataIndex)}
          style={{ marginBottom: 8, display: "block" }}
        />
        <Space>
          <Button
            type="primary"
            onClick={() => handleSearch(selectedKeys, confirm, dataIndex)}
            icon={<SearchOutlined />}
            size="small"
            style={{ width: 90 }}
          >
            Tìm
          </Button>
          <Button
            onClick={() => handleReset(clearFilters)}
            size="small"
            style={{ width: 90 }}
          >
            Xóa
          </Button>
          <Button
            type="link"
            size="small"
            onClick={() => {
              handleReset(clearFilters);
              confirm({ closeDropdown: true });
              setSearchText(selectedKeys[0]);
              setSearchedColumn(!dataIndex);
            }}
          >
            Hủy
          </Button>
        </Space>
      </div>
    ),
    filterIcon: (filtered) => (
      <SearchOutlined style={{ color: filtered ? "#1890ff" : undefined }} />
    ),
    onFilter: (value, record) =>
      record[dataIndex]
        ? record[dataIndex]
            .toString()
            .toLowerCase()
            .includes(value.toLowerCase())
        : "",
    // onFilterDropdownVisibleChange: visible => {
    //   if (visible) {
    //     setTimeout(() => searchInput.select(), 100);
    //   }
    // },
    render: (text) =>
      searchedColumn === dataIndex ? (
        <Highlighter
          highlightStyle={{ backgroundColor: "#ffc069", padding: 0 }}
          searchWords={[searchText]}
          autoEscape
          textToHighlight={text ? text.toString() : ""}
        />
      ) : (
        text
      ),
  });

  const handleSearch = (selectedKeys, confirm, dataIndex) => {
    confirm({ closeDropdown: true });
    setSearchText(selectedKeys[0]);
    setSearchedColumn(dataIndex);
  };

  const handleReset = (clearFilters) => {
    clearFilters();
    setSearchText("");
  };

  const handleOk = () => {
    const data = {
      "contactPhone": salePhone,
      "fullName": saleFullName,
      "password": salePassWord,
      "username": saleUserName
    }
    
    axios
      .post("http://113.161.151.124:8082/api/managers/sales", data, {
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
      ...getColumnSearchProps("username"),
    },
    {
      title: "Họ và tên",
      dataIndex: "fullName",
      width: 200,
      align: "center",
      ...getColumnSearchProps("fullName"),
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
      ...getColumnSearchProps("contactPhone"),
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
      <>
        <Button 
          type="primary"
          onClick={() => setModalAddSale(true)}
        >
          ✖️Thêm tài khoản Sale 
        </Button>
      </>
      <Table
        columns={columns}
        dataSource={dataTable}
        // loading={dataTable == "" ? true : false}
        noDataText="Không có dữ liệu"
        locale={{emptyText: "Không có dữ liệu"}}
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
        title="Sửa thông tin người dùng"
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
