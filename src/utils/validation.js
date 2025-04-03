var validator = require("validator");

const validateSignUpData = (req) => {
  const { firstName, lastName, email, password } = req.body;

  console.log(firstName, lastName);

  if (!firstName || !lastName) {
    throw new Error("Name is not valid");
  } else if (!validator.isEmail(email)) {
    throw new Error("Email is not valid");
  } else if (!validator.isStrongPassword(password)) {
    throw new Error("Password is not valid");
  }
};

validateProfileData = (req) => {
  const allowEditFields = [" firstName", "lastName", "age", "gender", "about" ,"skills" , "photoUrl"];

  const isEditAllowed = Object.keys(req.body).every((key) =>
    allowEditFields.includes(key)
  );

  return isEditAllowed;
};

module.exports = {
  validateSignUpData,
  validateProfileData,
};
