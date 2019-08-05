import { getError, getMapError } from "./Common";
import { StringName, StringDescription, SocialMap } from "./Schema"


export const validateName = name =>
  getError(StringName.required().validate(name).error, "Name");

export const validateOName = oname =>
  getError(StringName.validate(oname).error, "Original name");

export const validateDescription = description =>
  getError(StringDescription.validate(description).error, "Description");

export const validateSocialMap = socials =>
  getMapError(SocialMap.validate(socials).error);
