const adminAuth = (req, res, next) => {
  console.log("Admin auth is getting checked ");
  const token = "xyz";

  const isAdminAuthorised = token === "xyz";

  if (!isAdminAuthorised) {
    res.status(401).send("You are not authorised");
  } else {
    next();
  }
};

const userAuth = (req, res , next) => {
  console.log("user auth is getting checked ");
  const token = "xyz";

  const isAdminAuthorised = token === "xyz";

  if (!isAdminAuthorised) {
    res.status(401).send("You are not authorised");
  } else {
    next();
  }
};

module.exports = {
  adminAuth,
  userAuth
};
