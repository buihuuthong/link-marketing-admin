import React, { useState, useEffect, useRef } from "react";
import { Table, Space, Modal, Input, Button, Empty } from "antd";
import axios from "axios";
import { SearchOutlined } from "@ant-design/icons";
import Highlighter from "react-highlight-words";
import ReactDOM from "react-dom";
import "antd/dist/antd.css";

const UserForgotPassWord = () => {
  const [dataTable, setDataTable] = useState([]);
  const [isModalVisible, setIsModalVisible] = useState(false);
  const [editUser, setEditUser] = useState(null);
  const [searchText, setSearchText] = useState("");
  const [searchedColumn, setSearchedColumn] = useState();

  useEffect(() => {
    getDataTable();
  }, []);

  const getDataTable = () => {
    axios
      .get("http://113.161.151.124:8082/api/password-reset/users", {
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
      title: "Bạn có chắc chắn muốn xóa người dùng này?",
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

  const editUsersTable = (record) => {
    setIsModalVisible(true);
    setEditUser({ ...record });
  };

  const resetEditing = () => {
    setIsModalVisible(false);
    setEditUser(null);
  };

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

  const columns = [
    {
      title: "STT",
      dataIndex: "1",
      width: 100,
      align: "center",
    },
    {
      title: "Họ và tên",
      dataIndex: "userFullName",
      width: 200,
      align: "center",
      ...getColumnSearchProps("userFullName"),
    },
    {
      title: "Số điện thoại",
      dataIndex: "userPhone",
      width: 200,
      align: "center",
      ...getColumnSearchProps("userPhone"),
    },
    {
      title: "Trạng thái",
      dataIndex: "status",
      width: 200,
      align: "center",
      ...getColumnSearchProps("status"),
    },
    {
      title: "Lưu ý",
      dataIndex: "note",
      width: 200,
      align: "center",
    },
    {
      title: "Hành động",
      width: 200,
      dataIndex: "",
      key: "x",
      render: (record) => (
        <Space size="middle">
          <a href="http://localhost:3000/user-information">
            Thông tin chi tiết
          </a>
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
        {/* <label>
          <p style={{ marginTop: 5 }}>Tài khoản: {}</p>
        </label>
        <Input
          value={editUser?.username}
          onChange={(e) => {
            setEditUser((pre) => {
              return { ...pre, username: e.target.value };
            });
          }}
        /> */}

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

        {/* <label>
          <p style={{ marginTop: 5 }}>Chức vụ: {}</p>
        </label>
        <Input
          value={editUser?.role}
          onChange={(e) => {
            setEditUser((pre) => {
              return { ...pre, role: e.target.value };
            });
          }}
        /> */}

        {/* <label>
          <p style={{ marginTop: 5 }}>Trạng thái:</p>
        </label>
        <div>
          <select 
            value={editUser?.isLocked}
            onChange={(e) => {
              setEditUser((pre) => {
                return { ...pre, isLocked: e.target.value };
              });
            }}
            style={{
              width: '100%',
              padding: 5,
              borderColor: '#E0E0E0'
            }}
          >
            <option value={true}>Đã khóa</option>
            <option value={false}>Đang hoạt động</option>
          </select>
        </div> */}

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
    </div>
  );
};

export default UserForgotPassWord;
