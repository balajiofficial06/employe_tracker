const jwt = require("jsonwebtoken");

module.exports = async (req, res, next) => {
  try {
    const token = req.headers.authorization.split(" ")[1];
    jwt.verify(token, process.env.JWTSECRET, (err, decoded) => {
      if (err) {
        console.log(token);
        console.log("new");
        return res.status(401).send({ message: "auth failed", success: false });
      } else {
        req.userId = decoded.user;
        next();
      }
    });
  } catch (error) {
    return res.status(500).send({ message: "Auth failed", success: false });
  }
};
