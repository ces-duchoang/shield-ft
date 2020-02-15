import { getError, getSummaryError } from './Common';
import { StringName, StringDescription, StringLink } from './Schema';
import { message } from 'antd';

export const validateName = name =>
  getError(StringName.required().validate(name).error, 'Name');

export const validateDescription = description =>
  getError(StringDescription.validate(description).error, 'Description');

export const validateLogo = link =>
  getSummaryError(StringLink.validate(link).error, 'Logo');

export const validateForm = formData => ({
  name: validateName(formData.name),
  description: validateDescription(formData.description),
  logo: validateLogo(formData.logo)
});

export const validateImage = file => {
  const isJpgOrPng = file.type === 'image/jpeg' || file.type === 'image/png';
  if (!isJpgOrPng) {
    message.error('You can only upload JPG/PNG file!');
  }
  const isLt2M = file.size / 1024 / 1024 < 2;
  if (!isLt2M) {
    message.error('Image must smaller than 2MB!');
  }
  return isJpgOrPng && isLt2M;
};
