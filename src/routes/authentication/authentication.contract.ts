import Joi from "joi";
import CustomValidation from "../../utils/custom-validation";

// Contract for validating login request
const loginContract = Joi.object({
  password: Joi.string().required(),
  username: Joi.string().required(),
});

// Contract for validating signup request
const signupContract = Joi.object({
  username: Joi.string().required(),
  firstName: Joi.string().required(),
  lastName: Joi.string().required(),
  email: Joi.string().required(),
  password: CustomValidation.passwordValidation("Password"),
});

export { loginContract, signupContract };
