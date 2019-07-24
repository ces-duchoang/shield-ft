import React from "react";
import "./Login.scss";
import ShieldIcon from "../../images/shieldicon.png";
import { Layout, Form, Input, Button, Icon, Checkbox, Row, Avatar } from "antd";

export default class Login extends React.Component {
  componentDidMount() {
    document.title = "Đăng nhập";
  }
  render() {
    return (
      <Layout.Content className="login-form-container">
        <Row type="flex" justify="center" align="middle">
          <Form layout="vertical" className="login-form">
            <Row type="flex" justify="center" align="middle">
              <Avatar size={128} src={ShieldIcon} className="login-avatar" />
            </Row>
            <Form.Item>
              <Input
                prefix={
                  <Icon type="user" style={{ color: "rgba(0,0,0,.25)" }} />
                }
                placeholder="Username"
              />
            </Form.Item>
            <Form.Item>
              <Input
                prefix={
                  <Icon type="lock" style={{ color: "rgba(0,0,0,.25)" }} />
                }
                type="password"
                placeholder="Password"
              />
            </Form.Item>
            <Form.Item>
              <Checkbox defaultChecked={true}>Remember me</Checkbox>
              <a className="login-form-forgot" href="">
                Forgot password
              </a>
            </Form.Item>
            <Button
              type="primary"
              htmlType="submit"
              className="login-form-button"
            >
              Log in
            </Button>
          </Form>
        </Row>
      </Layout.Content>
    );
  }
}
