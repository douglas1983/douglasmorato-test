const express = require('express');

const router = express.Router();

const verifyJWT = require('../middleware/verifyJWT');

const RecipesService = require('../services/recipesService');

router.get('/recipes', verifyJWT, async (req, res) => {
  res.json(await RecipesService.getAll(req));
});

router.get('/recipes/:id', verifyJWT, async (req, res) => {
  const id = parseInt(req.params.id, 10);

  res.json(await RecipesService.getById(id));
});

router.post('/recipes', verifyJWT, async (req, res) => {
  const retorno = await RecipesService.insert(req.body);

  const status = retorno.nativeError ? 422 : 200;

  res.status(status).send(retorno);
});

router.put('/recipes/:id', verifyJWT, async (req, res) => {
  const id = parseInt(req.params.id, 10);

  if (id !== req.body.id) {
    res.json('ID do parametro é diferente do ID do corpo da Área');
    console.log('ID do parametro é diferente do ID do corpo da Área');
    throw new Error('ID do parametro é diferente do ID do corpo da Área');
  }

  const religiao = await RecipesService.getById(id);

  if (religiao.length <= 0) {
    res.json('Área não encontrado para o id');
    console.log('Área não encontrado para o id');
    throw new Error('Área não encontrado para o id');
  }

  const retorno = await RecipesService.insert(req.body);

  const status = retorno.nativeError ? 422 : 200;

  res.status(status).send(retorno);
});

module.exports = {
  router,
};
