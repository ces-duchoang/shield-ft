import React, { useState, useEffect } from "react";
import {
  Table,
  Button,
  Icon,
  PageHeader,
  notification,
  message,
  Popconfirm
} from "antd";
import ButtonGroup from "antd/lib/button/button-group";
import CategoryAPI from "../../../api/CategoryApi";
import TypeForm from "../../../components/TypeForm";
import { isEmpty } from "lodash";
import ErrNoti from "../../../utils/ErrorNotification";
import moment from "moment";

const getColumns = actions => [
  {
    title: "#",
    key: "#",
    dataIndex: "key",
    render: cell => <b key={cell}>{cell}</b>,
    width: 40
  },
  {
    title: "Name",
    key: "name",
    dataIndex: "name",
    width: 140,
    render: text => <a href="javascript:;">{text}</a>
  },
  {
    title: "Description",
    key: "description",
    dataIndex: "description",
    render: text => <>{text}</>
  },
  {
    title: "Update at",
    key: "update",
    dataIndex: "updated_at",
    width: 150,
    render: text => <>{moment(text, moment.ISO_8601).fromNow()}</>
  },
  {
    title: "Action",
    dataIndex: "action",
    key: "action",
    render: (cell, row) => (
      <ButtonGroup>
        <Button onClick={e => actions.edit(row)} type="primary" icon="edit" />
        <Popconfirm
          title="Are you sure delete this?"
          onConfirm={() => actions.delete(row)}
          okText="Yes"
          cancelText="No"
        >
          <Button type="danger" icon="delete" />
        </Popconfirm>
      </ButtonGroup>
    ),
    width: 100,
    align: "center"
  }
];

export default props => {
  const [visible, setVisible] = useState(false);
  const [data, setData] = useState(null);
  const [loading, setLoading] = useState(false);
  const [formData, setFormData] = useState({});

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

  const close = () => {
    setVisible(false);
    setFormData({});
  };

  const receiveData = resData => {
    if (isEmpty(formData)) createCategory(resData);
    else updateCategory(resData);
  };

  const createCategory = formData => {
    CategoryAPI.create({ ...formData })
      .then(res => {
        setData([...data, { ...res.data, key: data.length + 1 }]);
        message.success(`Created ${formData.name}`);
      })
      .catch(err => ErrNoti(err));
  };

  const editCategory = category => {
    setFormData(category);
    setVisible(true);
  };

  const updateCategory = ({ ...formData }) => {
    setFormData({});
    CategoryAPI.update(formData)
      .then(res => {
        message.success(`Updated ${formData.name}`);
        setData(
          data.map(value => {
            if (value._id === formData._id) return formData;
            return value;
          })
        );
      })
      .catch(err => ErrNoti(err));
  };

  const deleteCategory = category => {
    CategoryAPI.delete(category._id)
      .then(res => {
        message.success(`Deleted ${category.name}`);
        setData(data.filter(c => c._id !== category._id));
      })
      .catch(err => ErrNoti(err));
  };

  return (
    <>
      <PageHeader
        onBack={() => props.history.goBack()}
        title={props.name}
        subTitle={props.description}
      />
      <Table
        columns={getColumns({ edit: editCategory, delete: deleteCategory })}
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
      <TypeForm
        visible={visible}
        close={close}
        callback={receiveData}
        formData={formData}
      />
    </>
  );
};
