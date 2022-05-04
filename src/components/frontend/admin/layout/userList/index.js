import React, { useState, useEffect, useRef } from "react";
import { Table, Space, Modal, Input, Button, Tag } from "antd";
import axios from "axios";
import { SearchOutlined } from "@ant-design/icons";
import Highlighter from "react-highlight-words";
import ReactDOM from "react-dom";
import "antd/dist/antd.css";
import UserTask from "../userTask";
import { useNavigate } from 'react-router-dom'

const ListUser = () => {

  const navigate = useNavigate();
  const [dataTable, setDataTable] = useState([]);
  const [isModalVisible, setIsModalVisible] = useState(false);
  const [isModalTask, setIsModalTask] = useState(false);
  const [editUser, setEditUser] = useState(null);
  const [searchText, setSearchText] = useState("");
  const [searchedColumn, setSearchedColumn] = useState();
  const [userId, setUserId] = useState('11')

  useEffect(() => {
    getDataTable();
  }, []);

  const getDataTable = () => {
    axios
      .get("http://113.161.151.124:8082/api/managers/users", {
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
      "address": editUser.address,
      "bankId": 2,
      "bankNumber": editUser.bankNumber,
      "fullName": editUser.fullName,
      "gender": editUser.gender,
      "job": editUser.job,
    }
    
    axios
      .patch("http://113.161.151.124:8082/api/managers/users", data, {
        headers: {
          'Authorization': `Bearer ${window.sessionStorage.getItem('token')}`
        },
        params: {
          "id": editUser.id,
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
      .delete("http://113.161.151.124:8082/api/managers/users", {
        headers: {
          'Authorization': `Bearer ${window.sessionStorage.getItem('token')}`
        },
        params: {
          "id": record.id,
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

  const onGetUserTask = (record) => {
    setIsModalTask(true)
    // console.log(record.id);
    setUserId(record.id);
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
      dataIndex: "fullName",
      width: 200,
      align: "center",
      ...getColumnSearchProps("fullName"),
    },
    {
      title: "Giới tính",
      dataIndex: "gender",
      width: 150,
      align: "center",
      render: gender => (
        <Space key={gender}>
          {gender == "FEMALE" ? "Nữ" : "Nam"}
        </Space>
      ),
    },
    {
      title: "Số điện thoại",
      dataIndex: "phone",
      width: 200,
      align: "center",
      ...getColumnSearchProps("phone"),
    },
    {
      title: "Công việc",
      width: 200,
      dataIndex: "job",
      align: "center",
      ...getColumnSearchProps("job"),
    },
    {
      title: "Hành động",
      width: 200,
      dataIndex: "",
      key: "x",
      render: (record) => (
        <Space size="middle">
          <div className="row">
            <div className="mb-2">
              <Tag color="">
                <a style={{ marginRight: 10}} href="http://localhost:3000/user-information">
                Thông tin chi tiết
              </a>
              </Tag>
            </div>
            <div className="mb-2">
              <Tag color="blue">
                <a onClick={() => editUsersTable(record)}>Sửa</a>
              </Tag>
              <Tag color="red">
                <a onClick={() => onDeleteUser(record)}>Xóa</a>
              </Tag>
            </div>
            <div>
              <Tag color="geekblue">
                <a onClick={() => onGetUserTask(record)}>Danh sách nhiệm vụ</a>
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
          <p style={{ marginTop: 5 }}>Giới tính:</p>
        </label>
        <div>
          <select 
            value={editUser?.gender}
            onChange={(e) => {
              setEditUser((pre) => {
                return { ...pre, gender: e.target.value };
              });
            }}
            style={{
              width: '100%',
              padding: 5,
              borderColor: '#E0E0E0'
            }}
          >
            <option value="MALE">Nam</option>
            <option value="FEMALE">Nữ</option>
          </select>
        </div>

        <label>
          <p style={{ marginTop: 5 }}>Số điện thoại:</p>
        </label>
        <Input
          value={editUser?.phone}
          onChange={(e) => {
            setEditUser((pre) => {
              return { ...pre, phone: e.target.value };
            });
          }}
        />

        <label>
          <p style={{ marginTop: 5 }}>Công việc:</p>
        </label>
        <Input
          value={editUser?.job}
          onChange={(e) => {
            setEditUser((pre) => {
              return { ...pre, job: e.target.value };
            });
          }}
        />

        <label>
          <p style={{ marginTop: 5 }}>Địa chỉ:</p>
        </label>
        <Input
          value={editUser?.address}
          onChange={(e) => {
            setEditUser((pre) => {
              return { ...pre, address: e.target.value };
            });
          }}
        />

        <label>
          <p style={{ marginTop: 5 }}>Số tài khoản:</p>
        </label>
        <Input
          value={editUser?.bankNumber}
          onChange={(e) => {
            setEditUser((pre) => {
              return { ...pre, bankNumber: e.target.value };
            });
          }}
        />
      </Modal>
      <Modal
        title="Danh sách nhiệm vụ"
        visible={isModalTask}
        onOk={() => setIsModalTask(false)}
        onCancel={() => setIsModalTask(false)}
        okText="Xác nhận"
        cancelText="Hủy"
        width={2000}
        zIndex={2000}
        centered
      >
          <UserTask userId={userId}/>
      </Modal>
    </div>
  );
}

export default ListUser
