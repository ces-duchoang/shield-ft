import './Image.scss';
import React, { useState } from 'react';
import { Spin } from 'antd';
import ShieldSvg from '../../images/diamond-shaped-war-shield.svg';
import PropTypes from 'prop-types';

const antIcon = <img className="shield-loading" src={ShieldSvg} />;

const Image = props => {
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
      {isFailed && <div>Reload</div>}
    </div>
  );
};

Image.propTypes = {
  src: PropTypes.string,
  className: PropTypes.string
};

export default Image;
