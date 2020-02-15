/* eslint-disable react/display-name */
import './Team.scss';
import React, { useState, useEffect } from 'react';
import {
  PageHeader,
  Input,
  Row,
  Col,
  Button,
  Table,
  Popconfirm,
  message
} from 'antd';
import TeamForm from '../../../components/TeamForm';
import TeamApi from '../../../api/TeamApi';
import moment from 'moment';
import ButtonGroup from 'antd/lib/button/button-group';
import ErrNoti from '../../../utils/ErrorNotification';
import PropTypes from 'prop-types';
import lodash from 'lodash';

const getColumns = actions => [
  {
    title: '#',
    key: '#',
    dataIndex: 'key',
    render: cell => <b key={cell}>{cell}</b>,
    width: 40
  },
  {
    title: 'Name',
    key: 'name',
    dataIndex: 'name',
    width: 140,
    render: text => <a>{text}</a>
  },
  {
    title: 'Description',
    key: 'description',
    dataIndex: 'description',
    render: text => <>{text}</>
  },
  {
    title: 'Update at',
    key: 'update',
    dataIndex: 'updatedDate',
    width: 150,
    render: text => <>{moment(text, moment.ISO_8601).fromNow()}</>
  },
  {
    title: 'Action',
    dataIndex: 'action',
    key: 'action',
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
    align: 'center'
  }
];

const Team = props => {
  const [formData, setFormData] = useState({});
  const [visible, setVisible] = useState(false);
  const [data, setData] = useState([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    TeamApi.list()
      .then(res => {
        setData(res.data.map((team, i) => ({ ...team, key: i + 1 })));
      })
      .catch(ErrNoti)
      .finally(() => setLoading(false));
  }, []);

  const close = () => {
    setVisible(false);
    setFormData({});
  };

  const receiveData = resData => {
    if (lodash.isEmpty(formData)) createTeam(resData);
    else updateTeam(resData);
  };

  const createTeam = team => {
    const load = message.loading(`Creating ${formData.name}`, 0);
    TeamApi.create(team)
      .then(res => {
        setData([...data, { ...res.data, key: data.length + 1 }]);
        message.success(`Created ${formData.name}`);
      })
      .catch(ErrNoti)
      .finally(load);
  };

  const editTeam = team => {
    setFormData(team);
    setVisible(true);
  };

  const updateTeam = ({ ...formData }) => {
    const load = message.loading(`Updating ${formData.name}`, 0);
    setFormData({});
    TeamApi.update(formData)
      .then(res => {
        setData(
          data.map((value, i) => {
            if (value._id === formData._id) {
              return { ...res.data, key: i + 1 };
            }
            return value;
          })
        );
        message.success(`Updated ${formData.name}`);
      })
      .catch(ErrNoti)
      .finally(load);
  };

  const deleteTeam = team => {
    const load = message.loading(`Deleting ${team.name}`, 0);
    TeamApi.delete(team._id)
      .then(res => {
        setData(data.filter(c => c._id !== team._id));
        message.success(`Deleted ${team.name}`);
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
      <Row type="flex" justify="space-between" className="team-dashboar-header">
        <Col span={19}>
          <Button
            type="dashed"
            icon="plus"
            block
            disabled={loading}
            onClick={() => setVisible(true)}
          >
            Create
          </Button>
        </Col>
        <Input.Search
          allowClear
          className="search-dashboard"
          placeholder="Search"
          disabled={loading}
          onSearch={value => console.log(formData)}
          style={{ width: 200 }}
        />
      </Row>
      <Table
        columns={getColumns({ edit: editTeam, delete: deleteTeam })}
        dataSource={data}
        bordered
        rowKey="uid"
        loading={loading}
      />
      <TeamForm
        visible={visible}
        close={close}
        callback={receiveData}
        formData={formData}
      />
    </>
  );
};

Team.propTypes = {
  name: PropTypes.string.isRequired,
  description: PropTypes.string.isRequired,
  history: PropTypes.object.isRequired
};

export default Team;
