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

const Rating = () => {

  const { Search } = Input;
  const navigate = useNavigate();
  const [dataTable, setDataTable] = useState([]);
  const [isModalVisible, setIsModalVisible] = useState(false);
  const [isModalTask, setIsModalTask] = useState(false);
  const [isModalOverviewTask, setIsModalOverviewTask] = useState(false)
  const [editUser, setEditUser] = useState(null);
  const [userId, setUserId] = useState('')
  const [isModalUploadFile, setIsModalUploadFile] = useState(false);
  const [imageFile, setImageFile] = useState("");

  useEffect(() => {
    getDataTable();
  }, []);

  const getDataTable = () => {
    axios
      .get("https://api.tmdtbamboo.com/api/ratings", {
        headers: {
          'Authorization': `Bearer ${window.sessionStorage.getItem('token')}`
        },
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

  const UpdateRating = () => {
    const data = {
      "name": editUser.name,
      "phone": editUser.phone,
      "starNumber": editUser.starNumber,
    }
    
    axios
      .patch("https://api.tmdtbamboo.com/api/ratings", data, {
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

  

  const onFileChange = (event) => {
    // Update the state
    setImageFile(event.target.files[0]);
  };

  const onFileUpload = () => {

    const formData = new FormData();

    // Update the formData object
    formData.append("image ", imageFile);

    console.log(formData);

    axios
      .put("https://api.tmdtbamboo.com/api/ratings/image",formData,{
          headers: {
            'Content-Type': 'multipart/form-data',
            Authorization: `Bearer ${window.sessionStorage.getItem("token")}`,
          },
          params: {
            "id": userId,
          },
        }
      )
      .then(function (response) {
        // handle success
        console.log("Success");
        setIsModalUploadFile(false);
        getDataTable();
      })
      .catch(function (error) {
        // handle error
        console.log(error.request);
      })
      .then(function () {
        // always executed
      });
  };

  const onAddImageFile = (record) => {
    setIsModalUploadFile(true);
    setUserId(record.id);
  };

  const editRatingTable = (record) => {
    setIsModalVisible(true);
    setEditUser({ ...record });
  };

  const resetEditing = () => {
    setIsModalVisible(false);
    setEditUser(null);
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
      title: "Hình ảnh",
      dataIndex: "image",
      align: "center",
      render: image => (
        <Space key={image}>
          { image == null ?
          null : <img style={{ width: 200, height: 200 }} src={"https://api.tmdtbamboo.com/secure-images/"+ image  +"?token=" + window.sessionStorage.getItem("token")}/>
          }
        </Space>
      ),
    },
    {
      title: "Họ và tên",
      dataIndex: "name",
      width: 200,
      align: "center",
    },
    {
      title: "Số điện thoại",
      dataIndex: "phone",
      width: 200,
      align: "center",
    },
    {
      title: "Số sao",
      width: 200,
      dataIndex: "starNumber",
      align: "center",
    },
    {
      title: "Hành động",
      width: 200,
      dataIndex: "",
      key: "x",
      render: (record) => (
        <Space size="middle">
          <div className="row">
            <div className="mb-1">
              <Tag color="blue">
                <a onClick={() => editRatingTable(record)}>Câp nhật thông tin</a>
              </Tag>
            </div>
            <div className="mb-1">
              <Tag color="green">
                <a onClick={() => onAddImageFile(record)}>Thêm hình ảnh</a>
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
          <title>Quản lí xếp hạng</title>
      </Helmet>
      <Table
        columns={columns}
        dataSource={dataTable}
        // loading={dataTable == "" ? true : false}
        noDataText="Không có dữ liệu"
        locale={{emptyText: "Không có dữ liệu"}}
      />

      {/* Modal */}
      <Modal
        title="Cập nhật thông tin xếp hạng"
        visible={isModalVisible}
        onOk={() => {
          setDataTable((pre) => {
            return pre.map((user) => {
              if (user.id === editUser.id) {
                setTimeout(() => {
                  UpdateRating()
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
          <p style={{ marginTop: 5 }}>Họ và tên: {}</p>
        </label>
        <Input
          value={editUser?.name}
          onChange={(e) => {
            setEditUser((pre) => {
              return { ...pre, name: e.target.value };
            });
          }}
        />

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
          <p style={{ marginTop: 5 }}>Số sao:</p>
        </label>
        <Input
          value={editUser?.starNumber}
          onChange={(e) => {
            setEditUser((pre) => {
              return { ...pre, starNumber: e.target.value };
            });
          }}
        />
      </Modal>

      
      {/* Thêm hình ảnh */}
      <Modal
        title="Thêm hình ảnh"
        visible={isModalUploadFile}
        onOk={() => onFileUpload()}
        onCancel={() => setIsModalUploadFile(false)}
        okText="Xác nhận"
        cancelText="Hủy"
        zIndex={2000}
        centered
      >
        <label>
          <p style={{ marginTop: 5 }}>Hoa hồng:</p>
        </label>
        <Input
          type="file"
          onChange={onFileChange}
        />
      </Modal>
    </div>
  );
}

export default Rating
