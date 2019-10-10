const Validator = require("validator");
const isEmpty = require("is-empty");

module.exports = function validateRegisterInput(data) {
  let errors = {};

  // Convert Empty Fields to Empty String For Validator Functions
  data.name = !isEmpty(data.name) ? data.name : "";
  data.email = !isEmpty(data.email) ? data.email : "";
  data.password = !isEmpty(data.password) ? data.password : "";
  data.password2 = !isEmpty(data.password2) ? data.password2 : "";

  // Name Checks
  if (Validator.isEmpty(data.name)) {
    errors.name = "Name Field Required";
  }

  // Email Checks
  if (Validator.isEmpty(data.email)) {
    errors.email = "Email Field Required";
  } else if (!Validator.isEmail(data.email)) {
    errors.email = "Invalid Email";
  }

  // Password Checks
  if (Validator.isEmpty(data.password)) {
    errors.password = "Password Field Required";
  }

  if (Validator.isEmpty(data.password2)) {
    errors.password2 = "Confirm Password Field Is Required";
  }

  if (!Validator.isLength(data.password, { min: 6, max: 30 })) {
    errors.password = "Password Must Be At Least 6 Characters";
  }

  if (!Validator.equals(data.password, data.password2)) {
    errors.password2 = "Passwords Must Match";
  }

  return {
    errors,
    isValid: isEmpty(errors)
  };
};