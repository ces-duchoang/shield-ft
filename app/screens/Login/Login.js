import React from "react";
import "./Login.scss";
import { Layout, Form, Input, Button, Icon } from "antd";

export default class Login extends React.Component {
  componentDidMount() {
    document.title = "Đăng nhập";
  }
  render() {
    return (
      <Layout>
        <Layout.Content>
          {/* <Form layout="inline" onSubmit={this.handleSubmit}> */}
          {/* <Form.Item> */}
          <Input
            prefix={<Icon type="user" style={{ color: "rgba(0,0,0,.25)" }} />}
            placeholder="Username"
          />
          {/* </Form.Item> */}
          {/* <Form.Item> */}
          <Input
            prefix={<Icon type="lock" style={{ color: "rgba(0,0,0,.25)" }} />}
            type="password"
            placeholder="Password"
          />
          {/* </Form.Item> */}
          {/* <Form.Item> */}
          <Button type="primary" htmlType="submit">
            Log in
          </Button>
          {/* </Form.Item> */}
          {/* </Form> */}
        </Layout.Content>
      </Layout>
    );
  }
}


