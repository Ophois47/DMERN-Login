const Validator = require("validator");
const isEmpty = require("is-empty");

module.exports = function validateLoginInput(data) {
  let errors = {};

  // Convert Empty Fields To An Empty String For Validator Functions
  data.email = !isEmpty(data.email) ? data.email : "";
  data.password = !isEmpty(data.password) ? data.password : "";

  // Email checks
  if (Validator.isEmpty(data.email)) {
    errors.email = "Email Field Required";
  } else if (!Validator.isEmail(data.email)) {
    errors.email = "Invalid Email";
  }
  // Password checks
  if (Validator.isEmpty(data.password)) {
    errors.password = "Password Field Required";
  }

  return {
    errors,
    isValid: isEmpty(errors)
  };
};