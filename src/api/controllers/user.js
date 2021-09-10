const express = require('express');

const verifyJWT = require('../middleware/verifyJWT');

const router = express.Router();
const UserService = require('../services/userService');

const validatorEmail = require('../../utils/validatorEmail');

router.get('/users', async (req, res) => {
  res.json(await UserService.getAll(req));
});

router.get('/users/:id', async (req, res) => {
  const id = parseInt(req.params.id, 10);

  res.json(await UserService.getById(id));
});

// eslint-disable-next-line complexity
const postuser = async (req, res) => {
  const user = req.body;

  if (!user.email || !user.password || !user.name) {
    return res.status(400).json({ message: 'Invalid entries. Try again.' });
  }

  if (!validatorEmail(user.email)) {
    return res.status(400).json({ message: 'Invalid entries. Try again.' });
  }

  const retorno = await UserService.insert(user);

  const status = !retorno.user ? 409 : 201;

  return res.status(status).send(retorno);
};

router.post('/users', postuser);

router.post('/users/admin', verifyJWT, async (req, res) => {
  if (req.decoded.role !== 'admin') {
    return res.status(403).json({ message: 'Only admins can register new admins' });
  }
  req.body = { ...req.body, role: 'admin' };
  return postuser(req, res);
});

module.exports = {
  router,
};
