const express = require('express');

const router = express.Router();

const verifyJWT = require('../../utils/verifyJWT');

const UserService = require('../services/userService');

router.get('/users', verifyJWT, async (req, res) => {
  res.json(await UserService.getAll(req));
});

router.get('/users/:id', verifyJWT, async (req, res) => {
  const id = parseInt(req.params.id, 10);

  res.json(await UserService.getById(id));
});

router.post('/users', verifyJWT, async (req, res) => {
  const retorno = await UserService.insert(req.body);

  const status = retorno.nativeError ? 422 : 200;

  res.status(status).send(retorno);
});

router.put('/users/:id', verifyJWT, async (req, res) => {
  const id = parseInt(req.params.id, 10);

  if (id !== req.body.id) {
    res.json('ID do parametro é diferente do ID do corpo da Área');
    console.log('ID do parametro é diferente do ID do corpo da Área');
    throw new Error('ID do parametro é diferente do ID do corpo da Área');
  }

  const religiao = await UserService.getById(id);

  if (religiao.length <= 0) {
    res.json('Área não encontrado para o id');
    console.log('Área não encontrado para o id');
    throw new Error('Área não encontrado para o id');
  }

  const retorno = await UserService.insert(req.body);

  const status = retorno.nativeError ? 422 : 200;

  res.status(status).send(retorno);
});

module.exports = {
  router,
};
