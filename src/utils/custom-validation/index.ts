import Joi from "joi";
import jwt from "jsonwebtoken";

class CustomValidationClass {
  passwordValidation(name: string) {
    return Joi.string()
      .required()
      .min(8)
      .max(20)
      .pattern(/[*|;@#%^*+=()_\-&$]/)
      .pattern(/[*^\d+$|]/)
      .messages({
        "string.pattern.base": `${name} should contain at least one number or special character!`,
        "string.min": `${name} length should be greater than 8 characters`,
        "string.max": `${name} length should be less than 20 characters`,
      });
  }

  getJwtToken(userUuid: string) {
    const jwtSecret = process.env.JWT_SECRET || "";
    return jwt.sign({ userUuid }, jwtSecret, {
      expiresIn: 60 * 60 * 24 * 365,
    });
  }
}

const CustomValidation = new CustomValidationClass();
export default CustomValidation;
