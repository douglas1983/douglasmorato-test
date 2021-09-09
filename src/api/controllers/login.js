const express = require('express');

const router = express.Router();

const jwt = require('jsonwebtoken');

const verifyJWT = require('../../utils/verifyJWT');
const userService = require('../services/userService');

router.post('/logged', verifyJWT, async (req, res, _next) => {
  const funcionario = await userService.getById(req.decoded.id);
  return res.json({
    auth: true,
    funcionario,
  });
});

router.post('/login', async (req, res, _next) => {
  // esse teste abaixo deve ser feito no seu banco de dados

  const user = await userService.getByLogin(req.body.user);

  if (user && req.body.password === user.password) {
    // auth ok
    const { id } = user; // esse id viria do banco de dados
    const nome = user.name;
    const token = jwt.sign({ id, nome }, process.env.SECRET, {
      expiresIn: 60 * 60 * 8, // expires in 8 horas
    });
    return res.json({ auth: true, token, user });
  }

  res.status(401).json({ message: 'Login ou senha inválidos!' });
});

module.exports = {
  router,
};
