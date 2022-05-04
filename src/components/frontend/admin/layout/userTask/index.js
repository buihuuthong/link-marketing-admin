import React, { useState, useEffect, useRef } from "react";
import { Table, Space, Modal, Input, Button, Tag } from "antd";
import axios from "axios";
import { SearchOutlined } from "@ant-design/icons";
import Highlighter from "react-highlight-words";
import ReactDOM from "react-dom";
import "antd/dist/antd.css";

const UserTask = (userId) => {
  const [dataTable, setDataTable] = useState([]);
  const [isModalEditTask, setIsModalEditTask] = useState(false);
  const [isModalAddTask, setIsModalAddTask] = useState(false);
  const [isModalChangeStatus, setIsModalChangeStatus] = useState(false);
  const [editTask, setEditTask] = useState(null);

  //add task
  const [commissionPercentage, setCommissionPercentage] = useState(0)
  const [description, setDescription] = useState('')
  const [originalPrice, setOriginalPrice] = useState(0)
  const [productLink, setProductLink] = useState('')
  const [productName, setProductName] = useState('')
  const [receivedPoint, setReceivedPoint] = useState(0)
  const [unlockPrice, setUnlockPrice] = useState(0)
  const [status, setStatus] = useState('')
  const [taskId, setTaskId] = useState('')

  useEffect(() => {
    getDataTable();
  },[userId]);
  
  const getDataTable = () => {
    axios
      .get("http://113.161.151.124:8082/api/tasks", {
        headers: {
          'Authorization': `Bearer ${window.sessionStorage.getItem('token')}`
        },
        params: {
            'userId': userId.userId
        }
      })
      .then(function (response) {
        // handle success
        setDataTable(response.data);
      })
      .catch(function (error) {
        // handle error
        console.log(error.request);
      })
      .then(function () {
        // always executed
      });
  };


  const UpdateUser = () => {
    const data = {
      "commissionPercentage": editTask.commissionPercentage,
      "description": editTask.description,
      "originalPrice": editTask.originalPrice,
      "productLink": editTask.productLink,
      "productName": editTask.productName,
      "receivedPoint": editTask.receivedPoint,
      "unlockPrice": editTask.unlockPrice
    }
    
    axios
      .patch("http://113.161.151.124:8082/api/tasks", data, {
        headers: {
          'Authorization': `Bearer ${window.sessionStorage.getItem('token')}`
        },
        params: {
          "id": editTask.id,
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

  const DeleteTask = (record) => {
    
    axios
      .delete("http://113.161.151.124:8082/api/tasks", {
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

  const onDeleteTask = (record) => {
    Modal.confirm({
      title: "Bạn có chắc chắn muốn xóa nhiệm vụ này?",
      okText: "Xác nhận",
      okType: "danger",
      onOk: () => {
        setDataTable((pre) => {
          return pre.filter((user) => user.id !== record.id);
        });
        DeleteTask(record)
      },
      cancelText: "Hủy",
      zIndex: 2147483647
    });
  };

  const editTaskTable = (record) => {
    setIsModalEditTask(true);
    setEditTask({ ...record });
  };

  const resetEditing = () => {
    setIsModalEditTask(false);
    setEditTask(null);
  };

  const handleOk = () => {
    const data = {
      "commissionPercentage": commissionPercentage,
      "description": description,
      "originalPrice": originalPrice,
      "productLink": productLink,
      "productName": productName,
      "receivedPoint": receivedPoint,
      "unlockPrice": unlockPrice
    }
    
    axios
      .post("http://113.161.151.124:8082/api/tasks", data, {
        headers: {
          'Authorization': `Bearer ${window.sessionStorage.getItem('token')}`
        },
        params: {
            'userId': userId.userId
        }
      })
      .then(function (response) {
        // handle success
        console.log("Success");
        setIsModalAddTask(false)
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

  const handleCancel = (record) => {
    setIsModalAddTask(false);
  };

  const onChangeStatus = (record) => {
    setIsModalChangeStatus(true)
    setTaskId(record.id)
  }

  const ChangeTaskStatus = () => {
    axios
      .patch("http://113.161.151.124:8082/api/tasks", {}, {
        headers: {
          'Authorization': `Bearer ${window.sessionStorage.getItem('token')}`
        },
        params: {
          "id": taskId,
          "status": status
        }
      })
      .then(function (response) {
        // handle success
        console.log("Success");
        setIsModalChangeStatus(false);
      })
      .catch(function (error) {
        // handle error
        console.log(error.request);
      })
      .then(function () {
        // always executed
      });
  };

  const onOverviewTask = (record) => {
    
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
      title: "Tên sản phẩm",
      dataIndex: "productName",
      width: 200,
      align: "center",
    },
    {
      title: "Mô tả",
      dataIndex: "description",
      align: "center",
    },
    {
      title: "Hình ảnh",
      dataIndex: "productImage",
      align: "center",
    },
    {
      title: "Liên kết sản phẩm",
      dataIndex: "productLink",
      align: "center",
    },
    {
      title: "Trạng thái",
      dataIndex: "status",
      align: "center",
    },
    {
      title: "Giá gốc",
      dataIndex: "originalPrice",
      align: "center",
    },
    {
      title: "Giá bán",
      dataIndex: "unlockPrice",
      align: "center",
    },
    {
      title: "Hoa hồng",
      dataIndex: "commissionPercentage",
      align: "center",
    },
    {
      title: "Điểm nhận",
      dataIndex: "receivedPoint",
      align: "center",
    },
    {
      title: "Hành động",
      dataIndex: "",
      key: "x",
      render: (record) => (
        <Space size="middle">
          <div className="row">
            <div className="mb-2">
              <Tag color="blue">
                <a onClick={() => editTaskTable(record)}>Sửa</a>
              </Tag>
              <Tag color="red">
                <a onClick={() => onDeleteTask(record)}>Xóa</a>
              </Tag>
            </div>
            <div className="mb-2">
              <Tag color="geekblue">
                <a onClick={() => onChangeStatus(record)}>Đổi trạng thái</a>
              </Tag>
            </div>
            <div>
              <Tag color="geekblue">
                <a onClick={() => onOverviewTask(record)}>Thống kê nhiệm vụ</a>
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
      
      <Button 
        type="primary"
        onClick={() => setIsModalAddTask(true)}
      >
        ✖️Thêm nhiệm vụ
      </Button>

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
        visible={isModalEditTask}
        onOk={() => {
          setDataTable((pre) => {
            return pre.map((user) => {
              if (user.id === editTask.id) {
                setTimeout(() => {
                  UpdateUser()
                }, 1000);
                return editTask;
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
        zIndex={2147483647}
        centered
      >
        <label>
          <p style={{ marginTop: 5 }}>Tên sản phẩm: </p>
        </label>
        <Input
          value={editTask?.productName}
          onChange={(e) => {
            setEditTask((pre) => {
              return { ...pre, productName: e.target.value };
            });
          }}
        />

        <label>
          <p style={{ marginTop: 5 }}>Mô tả: </p>
        </label>
        <Input
          value={editTask?.description}
          onChange={(e) => {
            setEditTask((pre) => {
              return { ...pre, description: e.target.value };
            });
          }}
        />

        <label>
          <p style={{ marginTop: 5 }}>Liên kết sản phẩm:</p>
        </label>
        <Input
          value={editTask?.productLink}
          onChange={(e) => {
            setEditTask((pre) => {
              return { ...pre, productLink: e.target.value };
            });
          }}
        />

        <label>
          <p style={{ marginTop: 5 }}>Giá gốc:</p>
        </label>
        <Input
          value={editTask?.originalPrice}
          onChange={(e) => {
            setEditTask((pre) => {
              return { ...pre, originalPrice: e.target.value };
            });
          }}
        />

        <label>
          <p style={{ marginTop: 5 }}>Giá bán:</p>
        </label>
        <Input
          value={editTask?.unlockPrice}
          onChange={(e) => {
            setEditTask((pre) => {
              return { ...pre, unlockPrice: e.target.value };
            });
          }}
        />

        <label>
          <p style={{ marginTop: 5 }}>Điểm nhận được:</p>
        </label>
        <Input
          value={editTask?.receivedPoint}
          onChange={(e) => {
            setEditTask((pre) => {
              return { ...pre, receivedPoint: e.target.value };
            });
          }}
        />
        
        <label>
          <p style={{ marginTop: 5 }}>Hoa hồng:</p>
        </label>
        <Input
          value={editTask?.commissionPercentage}
          onChange={(e) => {
            setEditTask((pre) => {
              return { ...pre, commissionPercentage: e.target.value };
            });
          }}
        />
      </Modal>

      {/* Modal thêm nhiệm vụ */}

      <Modal 
        title="Basic Modal" 
        visible={isModalAddTask} 
        onOk={handleOk} 
        onCancel={handleCancel} 
        zIndex={2147483647}
        centered
      >
        <label>
          <p style={{ marginTop: 5 }}>Tên sản phẩm: </p>
        </label>
        <Input
          value={productName}
          onChange={(e) => setProductName(e.target.value)}
        />

        <label>
          <p style={{ marginTop: 5 }}>Mô tả: </p>
        </label>
        <Input
          value={description}
          onChange={(e) => setDescription(e.target.value)}
        />

        <label>
          <p style={{ marginTop: 5 }}>Liên kết sản phẩm:</p>
        </label>
        <Input
          value={productLink}
          onChange={(e) => setProductLink(e.target.value)}
        />

        <label>
          <p style={{ marginTop: 5 }}>Giá gốc:</p>
        </label>
        <Input
          value={originalPrice}
          onChange={(e) => setOriginalPrice(e.target.value)}
        />

        <label>
          <p style={{ marginTop: 5 }}>Giá bán:</p>
        </label>
        <Input
          value={unlockPrice}
          onChange={(e) => setUnlockPrice(e.target.value)}
        />

        <label>
          <p style={{ marginTop: 5 }}>Điểm nhận được:</p>
        </label>
        <Input
          value={receivedPoint}
          onChange={(e) => setReceivedPoint(e.target.value)}
        />
        
        <label>
          <p style={{ marginTop: 5 }}>Hoa hồng:</p>
        </label>
        <Input
          value={commissionPercentage}
          onChange={(e) => setCommissionPercentage(e.target.value)}
        />
      </Modal>

      {/* Đổi trạng thái */}
      
      <Modal
        title="Danh sách nhiệm vụ"
        visible={isModalChangeStatus}
        onOk={() => ChangeTaskStatus()}
        onCancel={() => setIsModalChangeStatus(false)}
        okText="Xác nhận"
        cancelText="Hủy"
        zIndex={2000}
        centered
      >
        <label>
          <p style={{ marginTop: 5 }}>Trạng thái:</p>
        </label>
        <div>
          <select 
            value={status}
            onChange={(e) => setStatus(e.target.value)}
            style={{
              width: '100%',
              padding: 5,
              borderColor: '#E0E0E0'
            }}
          >
            <option value="DOING">Đang chờ</option>
            <option value="DONE">Đã xong</option>
            <option value="REJECTED">Đã hủy</option>
          </select>
        </div>
      </Modal>
    </div>
  );
};

export default UserTask;