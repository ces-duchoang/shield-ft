import React, {useState, useEffect} from 'react';
import {Modal, Form, Input, Radio, Icon} from 'antd';
import {isEmpty} from 'lodash';
import TextArea from 'antd/lib/input/TextArea';
import {
  validateName,
  validateOName,
  validateDescription,
  validateSocialMap,
} from '../../validators/Author';
import PropTypes from 'prop-types';

const AuthorForm = (props) => {
  const [formData, setFormData] = useState({});
  const [alert, setAlert] = useState({});

  useEffect(() => {
    setFormData({...props.formData});
  }, [props.formData]);

  const setFormField = (key, value) => {
    setAlert({});
    setFormData({...formData, [key]: value});
  };

  const setSocialState = (key, value) => {
    setAlert({});
    setFormData({
      ...formData,
      socials: {...formData.socials, [key]: value},
    });
  };

  const isValidForm = () => {
    const alert = {
      name: validateName(formData.name),
      oname: validateOName(formData.oname),
      description: validateDescription(formData.description),
      socials: validateSocialMap(formData.socials),
    };
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
      title={isEmpty(props.formData) ? 'Create' : 'Edit'}
      visible={props.visible}
      centered
      onOk={submit}
      onCancel={close}
    >
      <Form
        {...{
          labelCol: {
            xs: {span: 24},
            sm: {span: 6},
          },
          wrapperCol: {
            xs: {span: 24},
            sm: {span: 18},
          },
        }}
      >
        <Form.Item label="Name" required {...alert.name}>
          <Input
            placeholder="Name"
            value={formData.name}
            onChange={(e) => setFormField('name', e.target.value)}
          />
        </Form.Item>
        <Form.Item label="Original name" {...alert.oname}>
          <Input
            placeholder="Original name"
            value={formData.oname}
            onChange={(e) => setFormField('oname', e.target.value)}
          />
        </Form.Item>
        <Form.Item label="Gender" {...alert.gender}>
          <Radio.Group
            onChange={(e) => setFormField('gender', e.target.value)}
            value={formData.gender || setFormData({...formData, gender: 1})}
          >
            <Radio.Button value={1}>Male</Radio.Button>
            <Radio.Button value={2}>Female</Radio.Button>
          </Radio.Group>
        </Form.Item>
        <Form.Item label="Social" {...alert.socials}>
          <Input
            placeholder="Facebook"
            prefix={
              <Icon type="facebook" style={{color: 'rgba(0,0,0,.25)'}} />
            }
            value={(formData.socials && formData.socials.facebook) || ''}
            onChange={(e) => setSocialState('facebook', e.target.value)}
          />
          <Input
            placeholder="Twitter"
            prefix={
              <Icon type="twitter" style={{color: 'rgba(0,0,0,.25)'}} />
            }
            value={(formData.socials && formData.socials.twitter) || ''}
            onChange={(e) => setSocialState('twitter', e.target.value)}
          />
          <Input
            placeholder="Link"
            prefix={<Icon type="link" style={{color: 'rgba(0,0,0,.25)'}} />}
            value={(formData.socials && formData.socials.link) || ''}
            onChange={(e) => setSocialState('link', e.target.value)}
          />
        </Form.Item>
        <Form.Item label="Description" {...alert.description}>
          <TextArea
            placeholder="Description"
            autosize={{minRows: 5, maxRows: 6}}
            value={formData.description}
            onChange={(e) => setFormField('description', e.target.value)}
          />
        </Form.Item>
      </Form>
    </Modal>
  );
};

AuthorForm.propTypes = {
  props: PropTypes.object,
  callback: PropTypes.func,
  close: PropTypes.func,
  formData: PropTypes.object,
  visible: PropTypes.bool,
};

export default AuthorForm;
