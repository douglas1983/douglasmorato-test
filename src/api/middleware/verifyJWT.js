const jwt = require('jsonwebtoken');

module.exports = async function verifyJWT(req, res, _next) {
  const token = req.headers.authorization;
  if (!token) return res.status(401).json({ message: 'No token provided.' });

  jwt.verify(token.split(' ')[1], 'mysecret', async (err, decoded) => {
    if (err) return res.status(401).json({ message: 'jwt malformed' });

    req.decoded = decoded;

    _next();
  });
};
