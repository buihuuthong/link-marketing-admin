import React, { useState, useEffect } from "react";
import { Table, Space, Modal, Input, Button, Tag } from "antd";
import axios from "axios";
import { SearchOutlined } from "@ant-design/icons";
import Highlighter from "react-highlight-words";
import ReactDOM from "react-dom";
import "antd/dist/antd.css";
import UserTask from "../userTask";
import { useNavigate, Link } from 'react-router-dom'
import { LeftOutlined, RightOutlined  } from '@ant-design/icons';
import {Helmet} from "react-helmet";

const ListUser = () => {

  const { Search } = Input;
  const navigate = useNavigate();
  const [dataTable, setDataTable] = useState([]);
  const [isModalVisible, setIsModalVisible] = useState(false);
  const [isModalTask, setIsModalTask] = useState(false);
  const [isModalOverviewTask, setIsModalOverviewTask] = useState(false);
  const [editUser, setEditUser] = useState(null);
  const [isModalPass, setIsModalPass] = useState(false);
  const [userId, setUserId] = useState('');
  const [dataTaskOverview, setDataTaskOverview] = useState([]);
  const [page, setPage] = useState(0);
  const [pageSize] = useState(10);
  const [totalCount, setTotalCount] = useState(0);
  const [search, setSearch] = useState();
  const [newPassword, setNewPassword] = useState('')

  useEffect(() => {
    getDataTable();
  }, [search]);

  const getDataTable = async(pg = page, pgSize = pageSize) => {
    axios
      .get("https://api.tmdtbamboo.com/api/managers/users", {
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

  const getDataTaskOverview = (record) => {
    axios
      .get("https://api.tmdtbamboo.com/api/tasks/overview", {
        headers: {
          'Authorization': `Bearer ${window.sessionStorage.getItem('token')}`
        },
        params: {
          "id": record.id,
        }
      })
      .then(function (response) {
        // handle success
        setDataTaskOverview(response.data);
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
      "address": editUser.address,
      "bankId": 2,
      "bankNumber": editUser.bankNumber,
      "fullName": editUser.fullName,
      "gender": editUser.gender,
      "job": editUser.job,
    }
    
    axios
      .patch("https://api.tmdtbamboo.com/api/managers/users", data, {
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
      .delete("https://api.tmdtbamboo.com/api/managers/users", {
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
      title: "B???n c?? ch???c ch???n mu???n x??a ng?????i d??ng n??y?",
      okText: "X??c nh???n",
      okType: "danger",
      onOk: () => {
        setDataTable((pre) => {
          return pre.filter((user) => user.id !== record.id);
        });
        DeleteUser(record)
      },
      cancelText: "H???y",
    });
  };

  const UpdateUserPassword = () => {
    const data = {
      "newPassword": newPassword,
    }
    
    axios
      .put("https://api.tmdtbamboo.com/api/managers/users/password", data, {
        headers: {
          'Authorization': `Bearer ${window.sessionStorage.getItem('token')}`
        },
        params: {
          "id": userId,
        }
      })
      .then(function (response) {
        // handle success
        console.log("Success");
        setNewPassword('')
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
    setNewPassword('')
    setEditUser(null);
  };

  const onGetUserTask = (record) => {
    setIsModalTask(true);
    // console.log(record.id);
    setUserId(record.id);
  }

  const onOverviewUserTask = (record) => {
    setIsModalOverviewTask(true)
    getDataTaskOverview(record)
  }

  const onChangePassword = (record) => {
    setIsModalPass(true);
    setUserId(record.id);
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
      dataIndex: "fullName",
      width: 200,
      align: "center",
    },
    {
      title: "Gi???i t??nh",
      dataIndex: "gender",
      width: 150,
      align: "center",
      render: gender => (
        <Space key={gender}>
          {gender == "FEMALE" ? "N???" : "Nam"}
        </Space>
      ),
    },
    {
      title: "S??? ??i???n tho???i",
      dataIndex: "phone",
      width: 200,
      align: "center",
    },
    {
      title: "C??ng vi???c",
      width: 200,
      dataIndex: "job",
      align: "center",
    },
    {
      title: "T??n sale qu???n l??",
      width: 200,
      dataIndex: "managerFullName",
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
            <div className="mb-1">
              <Tag color="green">
                <Link to={`/user-information/${record.id}`}>
                Th??ng tin chi ti???t
              </Link>
              </Tag>
            </div>
            <div className="mb-1">
              <Tag color="blue">
                <a onClick={() => editUsersTable(record)}>S???a</a>
              </Tag>
              <Tag color="red">
                <a onClick={() => onDeleteUser(record)}>X??a</a>
              </Tag>
            </div>
            <div className="mb-1">
              <Tag color="geekblue">
                <a onClick={() => onChangePassword(record)}>?????i m???t kh???u</a>
              </Tag>
            </div>
            <div className="mb-1">
              <Tag color="geekblue">
                <a onClick={() => onGetUserTask(record)}>Danh s??ch nhi???m v???</a>
              </Tag>
            </div>
            <div>
              <Tag color="geekblue">
                <a onClick={() => onOverviewUserTask(record)}>Th???ng k?? nhi???m v???</a>
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
          <title>Qu???n l?? ng?????i d??ng</title>
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

      {/* Modal */}
      <Modal
        title="S???a th??ng tin ng?????i d??ng"
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
        okText="X??c nh???n"
        cancelText="H???y"
      >
        <label>
          <p style={{ marginTop: 5 }}>H??? v?? T??n: {}</p>
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
          <p style={{ marginTop: 5 }}>Gi???i t??nh:</p>
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
            <option value="FEMALE">N???</option>
          </select>
        </div>

        <label>
          <p style={{ marginTop: 5 }}>S??? ??i???n tho???i:</p>
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
          <p style={{ marginTop: 5 }}>C??ng vi???c:</p>
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
          <p style={{ marginTop: 5 }}>?????a ch???:</p>
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
          <p style={{ marginTop: 5 }}>S??? t??i kho???n:</p>
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
        title="Danh s??ch nhi???m v???"
        visible={isModalTask}
        onOk={() => setIsModalTask(false)}
        onCancel={() => setIsModalTask(false)}
        okText="????ng"
        cancelText="H???y"
        width={2000}
        zIndex={2000}
        centered
      >
          <UserTask userId={userId}/>
      </Modal>

      <Modal
        title="Th???ng k?? nhi???m v???"
        visible={isModalOverviewTask}
        onOk={() => setIsModalOverviewTask(false)}
        onCancel={() => setIsModalOverviewTask(false)}
        okText="????ng"
        cancelText="H???y"
        zIndex={2000}
        centered
      >
        <div>
          <div>
            <label style={{ fontWeight:"bold"}}>S??? nhi???m v???: </label>
            <span> {dataTaskOverview.count}</span>
          </div>
          <div>
            <label style={{ fontWeight:"bold"}}>Hoa h???ng: </label> 
            <span> {dataTaskOverview.totalCommission}</span>
          </div>
          <div>
            <label style={{ fontWeight:"bold"}}>Bonus: </label>
            <span> {dataTaskOverview.totalBonus}</span>
          </div>
        </div>
      </Modal>
      
      {/* ?????i m???t kh???u user */}
      <Modal
        title="S???a th??ng tin ng?????i d??ng"
        visible={isModalPass}
        onOk={() => {
          UpdateUserPassword()
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
}

export default ListUser
