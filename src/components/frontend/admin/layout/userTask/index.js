import React, { useState, useEffect } from "react";
import { Table, Space, Modal, Input, Button, Tag } from "antd";
import axios from "axios";
import { SearchOutlined } from "@ant-design/icons";
import Highlighter from "react-highlight-words";
import ReactDOM from "react-dom";
import "antd/dist/antd.css";
import "./userTask.css"
import { LeftOutlined, RightOutlined  } from '@ant-design/icons';
const { TextArea } = Input;

const UserTask = (userId) => {
  const [dataTable, setDataTable] = useState([]);
  const [userAgent, setUserAgent] = useState([]);
  const [isModalEditTask, setIsModalEditTask] = useState(false);
  const [isModalAddTask, setIsModalAddTask] = useState(false);
  const [isModalChangeStatus, setIsModalChangeStatus] = useState(false);
  const [isModalUploadFile, setIsModalUploadFile] = useState(false);
  const [editTask, setEditTask] = useState(null);

  //add task
  const [commissionPercentage, setCommissionPercentage] = useState(null);
  const [description, setDescription] = useState("");
  const [originalPrice, setOriginalPrice] = useState(0);
  const [productLink, setProductLink] = useState("");
  const [productName, setProductName] = useState("");
  const [receivedPoint, setReceivedPoint] = useState(0);
  const [unlockPrice, setUnlockPrice] = useState(0);
  const [status, setStatus] = useState("");
  const [taskId, setTaskId] = useState("");
  //add image
  const [imageFile, setImageFile] = useState("");
  const [page, setPage] = useState(0)
  const [pageSize] = useState(10)
  const [totalCount, setTotalCount] = useState(0)

  useEffect(() => {
    getDataTable();
    getUserAgent()
  }, [userId]);

  const getDataTable = async(pg = page, pgSize = pageSize) => {
    axios
      .get("https://api.tmdtbamboo.com/api/tasks", {
        headers: {
          Authorization: `Bearer ${window.sessionStorage.getItem("token")}`,
        },
        params: {
          userId: userId.userId,
          page: pg,
          size: pgSize
        },
      })
      .then(function (response) {
        // handle success
        setDataTable(response.data);
        setTotalCount(response.data.length);
      })
      .catch(function (error) {
        // handle error
        console.log(error.request);
      })
      .then(function () {
        // always executed
      });
  };

  const getUserAgent = async() => {
    axios
      .get("https://api.tmdtbamboo.com/api/tasks/user-agent", {
        headers: {
          Authorization: `Bearer ${window.sessionStorage.getItem("token")}`,
        },
        params: {
          userId: userId.userId
        },
      })
      .then(function (response) {
        // handle success
        setUserAgent(response.data);
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

  const UpdateUser = () => {
    const data = {
      description: editTask.description,
      originalPrice: editTask.originalPrice,
      productLink: editTask.productLink,
      productName: editTask.productName,
      receivedPoint: editTask.receivedPoint,
      unlockPrice: editTask.unlockPrice,
      commissionPercentage: editTask.unlockPrice * (userAgent.discount / 100),
    };

    axios
      .patch("https://api.tmdtbamboo.com/api/tasks", data, {
        headers: {
          Authorization: `Bearer ${window.sessionStorage.getItem("token")}`,
        },
        params: {
          id: editTask.id,
        },
      })
      .then(function (response) {
        // handle success
        getDataTable();
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
      .delete("https://api.tmdtbamboo.com/api/tasks", {
        headers: {
          Authorization: `Bearer ${window.sessionStorage.getItem("token")}`,
        },
        params: {
          id: record.id,
        },
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
      title: "B???n c?? ch???c ch???n mu???n x??a nhi???m v??? n??y?",
      okText: "X??c nh???n",
      okType: "danger",
      onOk: () => {
        setDataTable((pre) => {
          return pre.filter((user) => user.id !== record.id);
        });
        DeleteTask(record);
      },
      cancelText: "H???y",
      zIndex: 2147483647,
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
      commissionPercentage: commissionPercentage,
      description: description,
      originalPrice: originalPrice,
      productLink: productLink,
      productName: productName,
      receivedPoint: userAgent.creditPointsTask,
      commissionPercentage: unlockPrice * (userAgent.discount / 100),
      unlockPrice: unlockPrice,
    };

    axios
      .post("https://api.tmdtbamboo.com/api/tasks", data, {
        headers: {
          Authorization: `Bearer ${window.sessionStorage.getItem("token")}`,
        },
        params: {
          userId: userId.userId,
        },
      })
      .then(function (response) {
        // handle success
        console.log("Success");
        setIsModalAddTask(false);
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

  const handleCancel = (record) => {
    setIsModalAddTask(false);
    setCommissionPercentage('');
    setDescription('');
    setOriginalPrice('');
    setProductLink('');
    setProductName('');
    setReceivedPoint('');
    setUnlockPrice('');
    setStatus('');
    setTaskId('');
  };

  const onChangeStatus = (record) => {
    setIsModalChangeStatus(true);
    setTaskId(record.id);
  };

  const ChangeTaskStatus = () => {
    axios
      .put(
        "https://api.tmdtbamboo.com/api/tasks/change-status",
        {},
        {
          headers: {
            Authorization: `Bearer ${window.sessionStorage.getItem("token")}`,
          },
          params: {
            id: taskId,
            status: status,
          },
        }
      )
      .then(function (response) {
        // handle success
        console.log("Success");
        setIsModalChangeStatus(false);
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
      .put(
        "https://api.tmdtbamboo.com/api/tasks/product-image",
        formData,
        {
          headers: {
            'Content-Type': 'multipart/form-data',
            Authorization: `Bearer ${window.sessionStorage.getItem("token")}`,
          },
          params: {
            id: taskId,
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
    setTaskId(record.id);
  };

  const columns = [
    {
      title: "STT",
      dataIndex: "key",
      width: 100,
      align: "center",
      key: "index",
      render: (text, record, index) => index,
    },
    {
      title: "T??n s???n ph???m",
      dataIndex: "productName",
      width: 300,
      align: "center",
    },
    {
      title: "M?? t???",
      dataIndex: "description",
      align: "center",
      width: 400,
      render: description => (
        <div  className="display-linebreak">
          {description}
        </div>
      ),
    },
    {
      title: "H??nh ???nh",
      dataIndex: "productImage",
      align: "center",
      render: productImage => (
        <Space key={productImage}>
          { productImage == null ?
          null : <img style={{ width: 200, height: 200 }} src={"https://api.tmdtbamboo.com/images/"+ productImage}/>
          }
        </Space>
      ),
    },
    {
      title: "Li??n k???t s???n ph???m",
      dataIndex: "productLink",
      align: "center",
      width: 300
    },
    {
      title: "Tr???ng th??i",
      dataIndex: "status",
      align: "center",
      width: 100,
      render: status => (
        <Space key={status}>
          {status == 'DOING' ? "??ang ch???" :
            status == 'DONE' ? "???? xong" :
            status == 'REJECTED' ? "???? h???y" :
            status == 'IN_REVIEW' ? "??ang x??? l??" : null
          }
        </Space>
      ),
    },
    {
      title: "Gi?? g???c",
      dataIndex: "originalPrice",
      align: "center",
      width: 100,
    },
    {
      title: "Gi?? b??n",
      dataIndex: "unlockPrice",
      align: "center",
      width: 100,
    },
    {
      title: "Hoa h???ng(%)",
      dataIndex: "commissionPercentage",
      align: "center",
      width: 100,
    },
    {
      title: "??i???m nh???n",
      dataIndex: "receivedPoint",
      align: "center",
      width: 100,
    },
    {
      title: "H??nh ?????ng",
      dataIndex: "",
      key: "x",
      render: (record) => (
        <Space size="middle">
          <div className="row">
            <div className="mb-1">
              <Tag color="blue">
                <a onClick={() => editTaskTable(record)}>S???a</a>
              </Tag>
              <Tag color="red">
                <a onClick={() => onDeleteTask(record)}>X??a</a>
              </Tag>
            </div>
            <div className="mb-1">
              <Tag color="geekblue">
                <a onClick={() => onChangeStatus(record)}>?????i tr???ng th??i</a>
              </Tag>
            </div>
            <div >
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
      <Button type="primary" onClick={() => setIsModalAddTask(true)}>
        ??????Th??m nhi???m v???
      </Button>

      <Table
        columns={columns}
        dataSource={dataTable}
        // loading={dataTable == "" ? true : false}
        noDataText="Kh??ng c?? d??? li???u"
        locale={{ emptyText: "Kh??ng c?? d??? li???u" }}
        pagination={false}
        footer={() => <Pagination/>}
      />

      {/* Modal */}
      <Modal
        title="S???a th??ng tin ng?????i d??ng"
        visible={isModalEditTask}
        onOk={() => {
          setDataTable((pre) => {
            return pre.map((user) => {
              if (user.id === editTask.id) {
                setTimeout(() => {
                  UpdateUser();
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
        okText="X??c nh???n"
        cancelText="H???y"
        zIndex={2147483647}
        centered
      >
        <label>
          <p style={{ marginTop: 5 }}>T??n s???n ph???m: </p>
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
          <p style={{ marginTop: 5 }}>M?? t???: </p>
        </label>
        <TextArea
          row={6}
          value={editTask?.description}
          onChange={(e) => {
            setEditTask((pre) => {
              return { ...pre, description: e.target.value };
            });
          }}
        />

        <label>
          <p style={{ marginTop: 5 }}>Li??n k???t s???n ph???m:</p>
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
          <p style={{ marginTop: 5 }}>Gi?? g???c:</p>
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
          <p style={{ marginTop: 5 }}>Gi?? b??n:</p>
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
          <p style={{ marginTop: 5 }}>??i???m nh???n ???????c:</p>
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
          <p style={{ marginTop: 5 }}>Hoa h???ng({userAgent.discount}%):</p>
        </label>
        <Input
          value={editTask?.unlockPrice * (userAgent.discount / 100)}
          onChange={(e) => {
            setEditTask((pre) => {
              return { ...pre, commissionPercentage: e.target.value };
            });
          }}
        />
      </Modal>

      {/* Modal th??m nhi???m v??? */}

      <Modal
        title="Th??m nhi???m v???"
        visible={isModalAddTask}
        onOk={handleOk}
        onCancel={handleCancel}
        okText="X??c nh???n"
        cancelText="H???y"
        zIndex={2147483647}
        centered
      >
        <label>
          <p style={{ marginTop: 5 }}>T??n s???n ph???m: </p>
        </label>
        <Input
          value={productName}
          onChange={(e) => setProductName(e.target.value)}
        />

        <label>
          <p style={{ marginTop: 5 }}>M?? t???: </p>
        </label>
        <TextArea
          row={6}
          value={description}
          onChange={(e) => setDescription(e.target.value)}
        />

        <label>
          <p style={{ marginTop: 5 }}>Li??n k???t s???n ph???m:</p>
        </label>
        <Input
          value={productLink}
          onChange={(e) => setProductLink(e.target.value)}
        />

        <label>
          <p style={{ marginTop: 5 }}>Gi?? g???c:</p>
        </label>
        <Input
          value={originalPrice}
          onChange={(e) => setOriginalPrice(e.target.value)}
        />

        <label>
          <p style={{ marginTop: 5 }}>Gi?? b??n:</p>
        </label>
        <Input
          value={unlockPrice}
          onChange={(e) => setUnlockPrice(e.target.value)}
        />

        <label>
          <p style={{ marginTop: 5 }}>??i???m nh???n ???????c:</p>
        </label>
        <Input
          value={userAgent.creditPointsTask}
        />

        <label>
          <p style={{ marginTop: 5 }}>Hoa h???ng({userAgent.discount}%):</p>
        </label>
        <Input
          value={unlockPrice * (userAgent.discount / 100)}
          onChange={(e) => setCommissionPercentage(e.target.value)}
        />
      </Modal>

      {/* ?????i tr???ng th??i */}

      <Modal
        title="Danh s??ch nhi???m v???"
        visible={isModalChangeStatus}
        onOk={() => ChangeTaskStatus()}
        onCancel={() => setIsModalChangeStatus(false)}
        okText="X??c nh???n"
        cancelText="H???y"
        zIndex={2000}
        centered
      >
        <label>
          <p style={{ marginTop: 5 }}>Tr???ng th??i:</p>
        </label>
        <div>
          <select
            value={status}
            onChange={(e) => setStatus(e.target.value)}
            style={{
              width: "100%",
              padding: 5,
              borderColor: "#E0E0E0",
            }}
          >
            <option value="DOING">??ang ch???</option>
            <option value="DONE">???? xong</option>
            <option value="REJECTED">???? h???y</option>
          </select>
        </div>
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
};

export default UserTask;
