import React, { useState, useEffect } from "react";
import { validateName, validateDescription } from "../../validators/Category";
import { Modal, Form, Input } from "antd";
import TextArea from "antd/lib/input/TextArea";
import { isEmpty } from "lodash";

const initState = { name: "", description: "" };

export default props => {
  const [formData, setFormData] = useState(initState);
  const [alert, setAlert] = useState({});
  
  const setFormState = (key, value) => {
    setAlert({});
    setFormData({ ...formData, [key]: value });
  };

  const clearState = () => {
    setFormData(initState);
    setAlert({});
    props.close();
  };

  const isValidForm = () => {
    const alert = {
      name: validateName(formData.name),
      description: validateDescription(formData.description)
    };
    setAlert(alert);
    return _.values(alert).every(_.isEmpty);
  };

  const submit = () => {
    if (isValidForm()) {
      props.callback(formData);
      clearState();
    }
  };

  useEffect(() => {
    setFormData(props.formData);
    return () => {};
  }, [props.formData]);

  return (
    <Modal
      title={isEmpty(props.formData) ? "Create" : "Edit"}
      visible={props.visible}
      onOk={submit}
      onCancel={clearState}
      centered
    >
      <Form.Item label="Name" required {...alert.name}>
        <Input
          placeholder="Name"
          value={formData.name}
          onChange={e => setFormState("name", e.target.value)}
        />
      </Form.Item>
      <Form.Item label="Description" {...alert.description}>
        <TextArea
          placeholder="Description"
          autosize={{ minRows: 5, maxRows: 6 }}
          value={formData.description}
          onChange={e => setFormState("description", e.target.value)}
        />
      </Form.Item>
    </Modal>
  );
};
