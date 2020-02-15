import './LinkUpload.scss';
import React from 'react';
import { Input, Upload, Button, Icon } from 'antd';

const LinkUpload = props => {
  return (
    <>
      <Input placeholder="Logo" />
      <Upload
        className="upload-team-logo"
        accept="image/*"
        multiple={false}
        listType="picture"
      >
        <Button type="dashed" block>
          <Icon type="upload" /> Upload
        </Button>
      </Upload>
    </>
  );
};

export default LinkUpload;
