import React, { useState, useEffect, useRef } from "react";
import { Table, Space, Modal, Input, Button, Empty } from "antd";
import axios from "axios";
import { SearchOutlined } from "@ant-design/icons";
import Highlighter from "react-highlight-words";
import ReactDOM from "react-dom";
import "antd/dist/antd.css";

const Admin = (record) => {
  const [dataTable, setDataTable] = useState([]);
  const [isModalVisible, setIsModalVisible] = useState(false);
  const [modalAddSale, setModalAddSale] = useState(false)
  const [editUser, setEditUser] = useState(null);
  const [searchText, setSearchText] = useState("");
  const [searchedColumn, setSearchedColumn] = useState();

  //Thêm sale
  const [salePhone, setSalePhone] = useState('')
  const [saleFullName, setSaleFullName] = useState('')
  const [saleUserName, setSaleUserName] = useState('')
  const [salePassWord, setSalePassWord] = useState('')

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
      "fullName":  editUser.fullName
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

  const editUsersTable = (record) => {
    setIsModalVisible(true);
    setEditUser({ ...record });
  };

  const resetEditing = () => {
    setIsModalVisible(false);
    setEditUser(null);
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
      width: 100,
      align: "center",
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
      ...getColumnSearchProps("role"),
    },
    {
      title: "Trạng thái",
      dataIndex: "isLocked",
      width: 200,
      align: "center",
      ...getColumnSearchProps("isLocked"),
    },
    {
      title: "Số điện thoại",
      dataIndex: "contactPhone",
      width: 200,
      align: "center",
      ...getColumnSearchProps("contactPhone"),
    },
    {
      title: "Hành động",
      width: 200,
      dataIndex: "",
      key: "x",
      render: (record) => (
        <Space size="middle">
          <a onClick={() => onLockedUser(record)}>Khóa</a>
          <a onClick={() => editUsersTable(record)}>Sửa</a>
          <a onClick={() => onDeleteUser(record)}>Xóa</a>
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
    </div>
  );
};

export default Admin;
