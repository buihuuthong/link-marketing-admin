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
      title: "H??nh ???nh",
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
      title: "H??? v?? t??n",
      dataIndex: "name",
      width: 200,
      align: "center",
    },
    {
      title: "S??? ??i???n tho???i",
      dataIndex: "phone",
      width: 200,
      align: "center",
    },
    {
      title: "S??? sao",
      width: 200,
      dataIndex: "starNumber",
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
              <Tag color="blue">
                <a onClick={() => editRatingTable(record)}>C??p nh???t th??ng tin</a>
              </Tag>
            </div>
            <div className="mb-1">
              <Tag color="green">
                <a onClick={() => onAddImageFile(record)}>Th??m h??nh ???nh</a>
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
          <title>Qu???n l?? x???p h???ng</title>
      </Helmet>
      <Table
        columns={columns}
        dataSource={dataTable}
        // loading={dataTable == "" ? true : false}
        noDataText="Kh??ng c?? d??? li???u"
        locale={{emptyText: "Kh??ng c?? d??? li???u"}}
      />

      {/* Modal */}
      <Modal
        title="C???p nh???t th??ng tin x???p h???ng"
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
        okText="X??c nh???n"
        cancelText="H???y"
      >
        <label>
          <p style={{ marginTop: 5 }}>H??? v?? t??n: {}</p>
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
          <p style={{ marginTop: 5 }}>S??? sao:</p>
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

      
      {/* Th??m h??nh ???nh */}
      <Modal
        title="Th??m h??nh ???nh"
        visible={isModalUploadFile}
        onOk={() => onFileUpload()}
        onCancel={() => setIsModalUploadFile(false)}
        okText="X??c nh???n"
        cancelText="H???y"
        zIndex={2000}
        centered
      >
        <label>
          <p style={{ marginTop: 5 }}>Hoa h???ng:</p>
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
