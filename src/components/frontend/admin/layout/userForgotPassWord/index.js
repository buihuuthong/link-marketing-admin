import React, { useState, useEffect } from "react";
import { Table, Space, Modal, Input, Button, Tag } from "antd";
import axios from "axios";
import { SearchOutlined } from "@ant-design/icons";
import Highlighter from "react-highlight-words";
import ReactDOM from "react-dom";
import "antd/dist/antd.css";
import { LeftOutlined, RightOutlined  } from '@ant-design/icons';

const UserForgotPassWord = () => {
  const [dataTable, setDataTable] = useState([]);
  const [isModalVisible, setIsModalVisible] = useState(false);
  const [searchText, setSearchText] = useState("");
  const [searchedColumn, setSearchedColumn] = useState();
  const [newPassword, setNewPassword] = useState('')
  const [userId, setUserId] = useState('')
  const [id, setId] = useState('')
  const [isChanged, setIsChanged] = useState(false)
  const [page, setPage] = useState(0)
  const [pageSize] = useState(10)
  const [totalCount, setTotalCount] = useState(0)

  useEffect(() => {
    getDataTable();
  }, []);

  const getDataTable = async(pg = page, pgSize = pageSize) => {
    axios
      .get("https://api.tmdtbamboo.com/api/password-reset/users", {
        headers: {
          'Authorization': `Bearer ${window.sessionStorage.getItem('token')}`
        },
        params: {
          page: pg,
          size: pgSize
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

  const onChangeUserPassword = () => {
    console.log(userId);
    const data = {
      "newPassword": newPassword,
      "userId": userId
    }
    
    axios
      .put("https://api.tmdtbamboo.com/api/password-reset/users/reset-password", data, {
        headers: {
          'Authorization': `Bearer ${window.sessionStorage.getItem('token')}`
        }
      })
      .then(function (response) {
        // handle success
        console.log("Success");
        axios
          .put("https://api.tmdtbamboo.com/api/password-reset/users/mark-changed", {}, {
            headers: {
              'Authorization': `Bearer ${window.sessionStorage.getItem('token')}`
            },
            params: {
              "id": id
            }
          })
          .then(function (response) {
            // handle success
            console.log("Success");
            getDataTable()
            setIsChanged(true)
          })
          .catch(function (error) {
            // handle error
            console.log(error.request);
          })
      })
      .catch(function (error) {
        // handle error
        console.log(error.request);
      })
  };

  const onChangePassword = (record) => {
    setIsModalVisible(true);
    setUserId(record.userId);
    setId(record.id);
  }

  const resetEditing = () => {
    setIsModalVisible(false);
  };

  const onChanged = (record) => {
    Modal.confirm({
      title: "Người dùng " + record.userFullName + " đã được đổi mật khẩu!",
      okText: "Xác nhận",
      cancelText: "Hủy",
    });
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
      render: status => (
        <Space key={status}>
          {status == "CHANGED" ? "Đang xử lí" : status == "DONE" ? "Đã xong" : status == "PENDING" ? "Yêu cầu thay đổi" : null}
        </Space>
      ),
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
          { record.status == "CHANGED" ?
          <Tag color="green">
            <a onClick={() => onChanged(record)}>Đã đổi mật khẩu</a>
          </Tag>
          :
          <Tag color="blue">
            <a onClick={() => onChangePassword(record)}>Đổi mật khẩu</a>
          </Tag>
          }
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
        pagination={false}
        footer={() => <Pagination/>}
      />

      {/* Modal */}
      <Modal
        title="Sửa thông tin người dùng"
        visible={isModalVisible}
        onOk={() => {
          onChangeUserPassword()
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
    </div>
  );
};

export default UserForgotPassWord;
