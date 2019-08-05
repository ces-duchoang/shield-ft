import React, { useState, useEffect } from "react";
import {
  Table,
  Button,
  Icon,
  PageHeader,
  message,
  Popconfirm,
  Tag,
  Tooltip
} from "antd";
import ButtonGroup from "antd/lib/button/button-group";
import AuthorApi from "../../../api/AuthorApi";
import AuthorForm from "../../../components/AuthorForm";
import { isEmpty } from "lodash";
import ErrNoti from "../../../utils/ErrorNotification";
import "./Author.scss";

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
    render: text => <a>{text}</a>
  },
  {
    title: "Description",
    key: "description",
    dataIndex: "description",
    render: text => <>{text}</>
  },
  {
    title: "Social",
    key: "socials",
    dataIndex: "socials",
    align: "center",
    width: 40,
    render: socials => (
      <div className="social-cell">
        {socials &&
          Object.entries(socials).map((link, i) => (
            <Tooltip key={link[1] + i} title={link[1]}>
              <a href={link[1]} target="_blank">
                <Icon type={link[0]} />
              </a>
            </Tooltip>
          ))}
      </div>
    )
  },
  {
    title: "Gender",
    key: "gender",
    dataIndex: "gender",
    width: 40,
    align: "center",
    render: gender =>
      gender === 1 ? (
        <Tag color="blue">Male</Tag>
      ) : (
        <Tag color="magenta">Female</Tag>
      )
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
  const [total, setTotal] = useState(1);
  const [loading, setLoading] = useState(false);
  const [formData, setFormData] = useState({});

  useEffect(() => {
    document.title = "Manage author - Dashboard - Shield Manga";
  });

  useEffect(() => {
    fetchPage(1);
  }, []);

  useEffect(() => {
    if (document.location.href.includes("#add")) setVisible(true);
  }, [document.location.href]);

  const fetchPage = page => {
    setLoading(true);
    AuthorApi.list(page)
      .then(res => {
        setData(
          res.data.data.map((v, i) => ({ ...v, key: (page - 1) * 20 + i + 1 }))
        );
        setTotal(res.data.pages * 20);
      })
      .catch(ErrNoti)
      .finally(() => setLoading(false));
  };

  const close = () => {
    setVisible(false);
    setFormData({});
  };

  const receiveData = resData => {
    if (isEmpty(formData)) createAuthor(resData);
    else updateAuthor(resData);
  };

  const createAuthor = formData => {
    const load = message.loading(`Creating ${formData.name}`, 0);
    AuthorApi.create(formData)
      .then(res => {
        setData([...data, { ...res.data, key: data.length + 1 }]);
        message.success(`Created ${formData.name}`);
      })
      .catch(ErrNoti)
      .finally(load);
  };

  const deleteAuthor = author => {
    const load = message.loading(`Deleting ${author.name}`, 0);
    AuthorApi.delete(author._id)
      .then(res => {
        setData(data.filter(a => a._id !== author._id));
        message.success(`Deleted ${author.name}`);
      })
      .catch(ErrNoti)
      .finally(load);
  };

  const editAuthor = author => {
    setFormData(author);
    setVisible(true);
  };

  const updateAuthor = author => {
    const load = message.loading(`Updating ${author.name}`, 0);
    setFormData({});
    AuthorApi.update(author)
      .then(res => {
        setData(data.map(a => (a._id === author._id ? author : a)));
        message.success(`Updated ${author.name}`);
      })
      .catch(ErrNoti)
      .finally(load);
  };

  return (
    <>
      <PageHeader
        onBack={() => props.history.goBack()}
        title={props.name}
        subTitle={props.description}
      />
      <Table
        columns={getColumns({ edit: editAuthor, delete: deleteAuthor })}
        dataSource={data}
        bordered
        rowKey="uid"
        loading={loading}
        pagination={{
          pageSize: 20,
          total: total,
          onChange: fetchPage
        }}
        title={() => (
          <Button type="dashed" block onClick={() => setVisible(true)}>
            <Icon type="plus" />
            Create
          </Button>
        )}
      />
      <AuthorForm
        visible={visible}
        close={close}
        formData={formData}
        callback={receiveData}
      />
    </>
  );
};
