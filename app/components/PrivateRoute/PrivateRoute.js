import "./PrivateRoute.scss";
import React from "react";
import { Route } from "react-router-dom";
import { isValidSession } from "../../api/Session";
import { Result } from "antd";

export default ({ component: Component, ...rest }) => {
  return (
    <Route
      {...rest}
      render={props => {
        if (isGrantAccess()) {
          return <Component {...props} />;
        } else {
          return (
            <Result
              status="warning"
              title="Sorry you do not have grant access"
              className="result-center"
            />
          );
        }
      }}
    />
  );
};

const isGrantAccess = () => {
  return (async () => await isValidSession())();
};
