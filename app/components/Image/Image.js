import "./Image.scss";
import React, { useState } from "react";
import { Spin } from "antd";
import ShieldSvg from "../../images/diamond-shaped-war-shield.svg";

const antIcon = <img className="shield-loading" src={ShieldSvg} />;

export default props => {
  const [loading, setLoading] = useState(true);
  const [isFailed, setFailed] = useState(false);
  const loadFailed = () => {
    setLoading(false);
    setFailed(true);
  };
  const loadSuccess = () => {
    setLoading(false);
    setFailed(false);
  };
  return (
    <div className={`shield-image ${props.className}`}>
      <img
        className="image-content"
        src={props.src}
        onLoad={loadSuccess}
        onError={loadFailed}
      />
      {loading && <Spin className="loading-cpn" indicator={antIcon} />}
    </div>
  );
};
