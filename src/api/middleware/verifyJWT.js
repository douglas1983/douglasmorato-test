const jwt = require('jsonwebtoken');

module.exports = async function verifyJWT(req, res, _next) {
  const token = req.headers.authorization;
  if (!token) return res.status(401).json({ auth: false, message: 'No token provided.' });

  jwt.verify(token.split(' ')[1], 'mysecret', async (err, decoded) => {
    if (err) return res.status(500).json({ auth: false, message: 'Failed to authenticate token.' });

    req.decoded = decoded;

    _next();
  });
};
