const jwt = require('jsonwebtoken');

const jwtKey = require('../_secrets/keys.js').jwtKey;


module.exports = {
  authenticate,
};

// jwt authentication middleware
function authenticate(req, res, next) {
  const token = req.headers.authorization;
  if (token) {
    jwt.verify(token, jwtKey, (err, decodedToken) => {
      if (err) {
          return res.status(401).json({error: `Invalid Token`});
      } else {
        req.decodedToken = decodedToken;

        next();
      }
    });
  } else {
    return res.status(401).json({
      error: 'No token provided, must be set on the Authorization Header',
    });
  }
}