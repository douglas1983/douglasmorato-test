const express = require('express');

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
router.post('/users', async (req, res) => {
  const user = req.body;

  if (!user.email || !user.password || !user.name) {
    return res.status(400).json({ message: 'Invalid entries. Try again.' });
  }

  if (!validatorEmail(user.email)) {
    return res.status(400).json({ message: 'Invalid entries. Try again.' });
  }

  const retorno = await UserService.insert(user);

  const status = !retorno.user ? 409 : 201;

  res.status(status).send(retorno);
});

module.exports = {
  router,
};
