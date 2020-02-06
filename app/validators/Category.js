import Joi from '@hapi/joi';
import {getError} from './Common';

const NameSchema = Joi.string()
    .required()
    .min(3)
    .max(32);
const DescriptionSchema = Joi.string()
    .min(3)
    .max(256);

export const validateName = (name) =>
  getError(NameSchema.validate(name).error, 'Name');

export const validateDescription = (description) =>
  getError(DescriptionSchema.validate(description).error, 'Description');
