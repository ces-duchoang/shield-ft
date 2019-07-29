import "./Dashboard.scss";
import React, { useState } from "react";
import SideBar from "../../components/sidebar";
import { Layout, Breadcrumb, Result, Row, Icon } from "antd";
import { Switch, Route } from "react-router-dom";
import PrivateRoute from "../../components/PrivateRoute";
import Category from "./Category";

const { Sider, Footer, Header, Content } = Layout;

export default () => {
  document.title = "Dashboard - Shield Manga";
  return (
    <Layout style={{ height: "100%" }}>
      <Row type="flex" justify="start" style={{ height: "100%" }}>
        <SideBar />
        <Layout.Content>
          <Switch>
            <PrivateRoute path="/category" exact component={Category} />
            <Route component={Welcome} />
          </Switch>
        </Layout.Content>
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
