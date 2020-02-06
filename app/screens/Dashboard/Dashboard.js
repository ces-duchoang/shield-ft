import './Dashboard.scss';
import React, {useEffect} from 'react';
import SideBar from '../../components/sidebar';
import {Layout, Result, Row, Icon} from 'antd';
import {Switch, Route} from 'react-router-dom';
import PrivateRoute from '../../components/PrivateRoute';
import {menuSet} from './routes';

const {Content} = Layout;

const Dashboard = () => {
  useEffect(() => {
    document.title = 'Dashboard - Shield Manga';
  });
  const Routes = menuSet.map((set) => (
    <PrivateRoute
      key={set.endpoint}
      path={set.endpoint}
      component={set.component}
      {...set}
    />
  ));
  return (
    <Layout style={{height: '100%'}}>
      <Row type="flex" justify="start" style={{height: '100%'}}>
        <SideBar menuSet={menuSet} />
        <Content className="dashboard-container">
          <Switch>
            {Routes}
            <Route component={Welcome} />
          </Switch>
        </Content>
      </Row>
    </Layout>
  );
};

const Welcome = () => (
  <Result
    icon={<Icon type="smile" theme="twoTone" />}
    title="Hello, welcome back user!"
    className="result-center"
  />
);

export default Dashboard;
