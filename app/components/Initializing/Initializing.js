import './Initializing.scss';
import React from 'react';
import { Spin } from 'antd';

const Initializing = props => (
  <div className="loading-container">
    <Spin tip="INITIALIZING..." size="large" />
  </div>
);

export default Initializing;
