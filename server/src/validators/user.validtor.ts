import { body } from "express-validator";
import { userService } from "../services/user.service";
import { Request } from "express";

class UserValidator {
  public register = [
    body("email")
      .isEmail()
      .normalizeEmail()
      .withMessage("Must Provide Valid email address"),
    body("email").custom(async (value) => {
      const user = await userService.findUserByEmail(value);
      if (user) {
        return Promise.reject("User with that email already exits");
      }
      return true;
    }),
    body("password1")
      .isLength({ min: 8, max: 25 })
      .withMessage("Password must be between 8-25 characters"),
    body("password1")
      .matches(/\d/)
      .withMessage("Password must contain atleast one number"),
    body("password2").custom((value, { req }) => {
      if (value !== req.body.password1) {
        throw new Error("Password does not match");
      }
      return true;
    }),
  ];

  public resetPassword = [
    body("email")
      .isEmail()
      .normalizeEmail()
      .withMessage("Must Provide valid email"),
  ];

  public confirmResetPassword = [
    body("password1")
      .isLength({ min: 8, max: 25 })
      .withMessage("Password must be between 8-25 characters"),
    body("password1")
      .matches(/\d/)
      .withMessage("Password must contain atleast one number"),
    body("password2").custom((value, { req }) => {
      if (value !== req.body.password1) {
        throw new Error("Password does not match");
      }
      return true;
    }),
  ];
}

const userValidator = new UserValidator();
export { userValidator };
