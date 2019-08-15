import React, { useState, useEffect } from "react";
import { isEmpty } from "lodash";
import { Input, Form, Modal, Upload, Button, Icon, notification } from "antd";
import TextArea from "antd/lib/input/TextArea";
import "./TeamForm.scss";
import { validateForm, validateImage } from "../../validators/Team";
import ImageUploader from "../../api/ImageUpload";

export default props => {
  const [formData, setFormData] = useState({});
  const [alert, setAlert] = useState({});
  const [file, setFile] = useState([]);
  const [uploading, setUploading] = useState(false);

  useEffect(() => {
    setFormData({ ...props.formData });
  }, [props.formData]);

  useEffect(() => {
    if (!_.isEmpty(file)) {
      setUploading(true);
      ImageUploader.uploadImage(file[0].originFileObj)
        .then(res => setFormField("logo", res.data.secure_url))
        .catch(err => notification.error("Upload image failed"))
        .finally(() => setUploading(false));
    }
  }, [file]);

  const setFormField = (key, value) => {
    setAlert({});
    setFormData({ ...formData, [key]: value });
  };

  const isValidForm = () => {
    const alert = validateForm(formData);
    setAlert(alert);
    return _.values(alert).every(_.isEmpty);
  };

  const submit = () => {
    if (isValidForm()) {
      props.callback(formData);
      close();
    }
  };

  const close = () => {
    setFormData({});
    setAlert({});
    props.close();
  };

  return (
    <Modal
      title={isEmpty(props.formData) ? "Create" : "Edit"}
      visible={props.visible}
      onOk={submit}
      onCancel={close}
      centered
    >
      <Form
        {...{
          labelCol: {
            xs: { span: 24 },
            sm: { span: 6 }
          },
          wrapperCol: {
            xs: { span: 24 },
            sm: { span: 18 }
          }
        }}
      >
        <Form.Item required label="Name" {...alert.name}>
          <Input
            placeholder="Name"
            value={formData.name}
            onChange={e => setFormField("name", e.target.value)}
          />
        </Form.Item>
        <Form.Item label="Description" {...alert.description}>
          <TextArea
            autosize={{ minRows: 5, maxRows: 6 }}
            placeholder="Description"
            value={formData.description}
            onChange={e => setFormField("description", e.target.value)}
          />
        </Form.Item>
        <Form.Item label="Logo" {...alert.logo}>
          <Input
            placeholder="Logo"
            value={formData.logo}
            onChange={e => setFormField("logo", e.target.value)}
          />
          <Upload
            className="upload-team-logo"
            accept="image/*"
            fileList={file}
            multiple={false}
            onChange={e => {
              if (e.fileList.length === 0) setFile([]);
              else validateImage(e.file) && setFile([e.file]);
            }}
            listType="picture"
            customRequest={file => {}}
          >
            <Button type="dashed" disabled={uploading} block>
              <Icon type={uploading ? "loading" : "upload"} /> Upload
            </Button>
          </Upload>
        </Form.Item>
      </Form>
    </Modal>
  );
};
