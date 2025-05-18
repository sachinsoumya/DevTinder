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
  console.log(req.body) //* working...
  const allowEditFields = ["firstName", "lastName", "age", "gender", "about" ,"skills" , "photoUrl"];

  console.log(Object.keys(req.body))//* working..

  const isEditAllowed = Object.keys(req.body).every((key) =>
    allowEditFields.includes(key)
  );

  console.log(isEditAllowed); //* working

  return isEditAllowed;
};

module.exports = {
  validateSignUpData,
  validateProfileData,
};
