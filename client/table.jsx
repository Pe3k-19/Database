import React from "react";
import { Table } from "antd";
import { Button } from "antd";
import { DownloadOutlined } from "@ant-design/icons";
import "antd/dist/antd.css";

function handleDelete() {
  return console.log("delete");
}
function handleGet() {
  return console.log("Get");
}
function handlePost() {
  return console.log("post");
}
function handlePut() {
  return console.log("put");
}

const columns = [
  {
    title: "Task Title",
    dataIndex: "title",
  },
  {
    title: "Action",
    dataIndex: "",
    key: "x",
    render: () => <a onClick={() => handleDelete()}>Delete</a>,
  },
];
const data = [
  {
    key: "1",
    title: "Umyť auto",
  },
  {
    key: "2",
    title: "Uvariť čaj",
  },
  {
    key: "3",
    title: "Kúpiť chlieb",
  },
  {
    key: "4",
    title: "Upiecť koláč",
  },
];

export default function MyTable() {
  return (
    <div>
      <Table columns={columns} dataSource={data} className="table" />
      <div className="navigation">
        <Button
          type="primary"
          icon={<DownloadOutlined />}
          size="normal"
          onClick={() => handleGet()}
        >
          Get Task
        </Button>
        <Button type="primary" onClick={() => handlePost()}>
          Post Task
        </Button>
        <Button onClick={() => handlePut()}>Put Task</Button>
      </div>
    </div>
  );
}
