import React, { useState, useEffect } from "react";
import {
  Table,
  Button,
  Icon,
  PageHeader,
  Modal,
  Input,
  Form,
  Row,
  Col,
  notification
} from "antd";
import ButtonGroup from "antd/lib/button/button-group";
import {
  validateName,
  validateDescription
} from "../../../validators/Category";
import { isEmpty, isNull } from "lodash";
import CategoryAPI from "../../../api/CategoryApi";
import TextArea from "antd/lib/input/TextArea";

const columns = [
  {
    title: "#",
    key: "#",
    dataIndex: "key",
    render: cell => <b key={cell}>{cell}</b>,
    width: 40
  },
  {
    title: "ID",
    key: "ID",
    dataIndex: "_id",
    render: text => <a href="javascript:;">{text}</a>,
    align: "center",
    width: 140
  },
  {
    title: "Name",
    key: "name",
    dataIndex: "name",
    render: text => <a href="javascript:;">{text}</a>
  },
  {
    title: "Create at",
    key: "create",
    dataIndex: "createdAt",
    render: text => <>{text}</>
  },
  {
    title: "Update at",
    key: "update",
    dataIndex: "updated_at",
    render: text => <>{text}</>
  },
  {
    title: "Action",
    dataIndex: "action",
    key: "action",
    render: (cell, row) => (
      <ButtonGroup>
        <Button type="primary" icon="edit" />
        <Button type="danger" icon="delete" />
      </ButtonGroup>
    ),
    width: 100,
    align: "center"
  }
];

const initState = { name: "", description: "" };

export default props => {
  const [visible, setVisible] = useState(false);
  const [formData, setFormData] = useState(initState);
  const [alert, setAlert] = useState({});
  const [data, setData] = useState(null);
  const [loading, setLoading] = useState(false);

  const clearState = () => {
    setFormData(initState);
    setVisible(false);
  };

  const setFormState = (key, value) => {
    setAlert({});
    setFormData({ ...formData, [key]: value });
  };

  useEffect(() => {
    document.title = "Manage category - Dashboard - Shield Manga";
  });

  useEffect(() => {
    setLoading(true);
    CategoryAPI.list()
      .then(res => {
        setData(res.data.map((v, i) => ({ ...v, key: i + 1 })));
      })
      .catch(err => {
        notification.error({
          message: "Error " + err.response.status,
          description: err.response.data.message
        });
      })
      .finally(() => setLoading(false));
  }, []);

  const isValidForm = () => {
    const name = validateName(formData.name);
    const description = validateDescription(formData.description);
    setAlert({ name, description });
    return isEmpty(alert);
  };

  const submit = () => {
    if (isValidForm()) {
      setVisible(false);
      CategoryAPI.create({ ...formData })
        .then(res => {
          setData([...data, { ...res.data, key: data.length + 1 }]);
        })
        .catch(err =>
          notification.error({
            message: "Error " + err.response.status,
            description: err.response.data.message
          })
        )
        .finally(() => clearState());
    }
  };

  return (
    <>
      <PageHeader
        onBack={() => props.history.goBack()}
        title={props.name}
        subTitle={props.description}
      />
      <Table
        columns={columns}
        dataSource={data}
        bordered
        rowKey="uid"
        loading={loading}
        title={() => (
          <Button type="dashed" block onClick={() => setVisible(true)}>
            <Icon type="plus" />
            Create
          </Button>
        )}
      />
      <Modal
        title="Basic Modal"
        visible={visible}
        onOk={() => submit()}
        onCancel={() => clearState()}
        centered
      >
        <Form.Item label="Name" required {...alert.name}>
          <Input
            placeholder="Name"
            value={formData.name}
            onChange={e => setFormState("name", e.target.value)}
          />
        </Form.Item>
        <Form.Item label="Description" required {...alert.description}>
          <TextArea
            placeholder="Description"
            autosize={{ minRows: 5, maxRows: 6 }}
            value={formData.description}
            onChange={e => setFormState("description", e.target.value)}
          />
        </Form.Item>
      </Modal>
    </>
  );
};
