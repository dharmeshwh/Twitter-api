import Joi from "joi";

export const postMessageContract = Joi.object({
  content: Joi.string().required(),
});

export const commonUuidBodyContract = Joi.object({
  uuid: Joi.string().uuid().required(),
});

export const updateMessageContract = Joi.object({
  uuid: Joi.string().uuid().required(),
  content: Joi.string().required(),
});
