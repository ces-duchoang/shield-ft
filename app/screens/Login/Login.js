import React from "react";
import "./Login.scss";
import ShieldIcon from "../../images/shieldicon.png";
import { Layout, Form, Input, Button, Icon, Checkbox, Row, Avatar } from "antd";
import Particles from "react-particles-js";
import { validateEmail, validatePassword } from "../../validators/Account";

export default class Login extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
      email: "",
      password: "",
      alert: {}
    };
  }
  componentDidMount() {
    document.title = "Đăng nhập";
  }
  setFormState = (key, value) => {
    this.setState({ [key]: value, alert: {} });
  };
  handleSubmit = e => {
    e.preventDefault();
    if (!this.isValidForm()) {
      //TODO: call api auth
    }
  };
  isValidForm = () => {
    const email = validateEmail(this.state.email);
    const password = validatePassword(this.state.password);
    this.setState({ alert: { email, password } });
    return email || password;
  };
  render() {
    return (
      <Layout.Content className="login-form-container">
        <Particles
          className="ani-bg"
          params={{
            particles: {
              number: {
                value: 50
              },
              size: {
                value: 3
              }
            },
            interactivity: {
              events: {
                onhover: {
                  enable: true,
                  mode: "repulse"
                }
              }
            }
          }}
        />
        <Row type="flex" justify="center" align="middle" className="form-row">
          <Form
            layout="vertical"
            className="login-form"
            onSubmit={e => this.handleSubmit(e)}
          >
            <Row type="flex" justify="center" align="middle">
              <Avatar size={128} src={ShieldIcon} className="login-avatar" />
            </Row>
            <Form.Item {...this.state.alert.email}>
              <Input
                prefix={
                  <Icon type="user" style={{ color: "rgba(0,0,0,.25)" }} />
                }
                placeholder="Email"
                onChange={e => {
                  this.setFormState("email", e.target.value);
                }}
              />
            </Form.Item>
            <Form.Item {...this.state.alert.password}>
              <Input
                prefix={
                  <Icon type="lock" style={{ color: "rgba(0,0,0,.25)" }} />
                }
                type="password"
                placeholder="Password"
                onChange={e => {
                  this.setFormState("password", e.target.value);
                }}
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
