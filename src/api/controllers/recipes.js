const express = require('express');

const router = express.Router();

const verifyJWT = require('../middleware/verifyJWT');

const RecipesService = require('../services/recipesService');

router.get('/recipes', async (req, res) => {
  res.json(await RecipesService.getAll(req));
});

router.get('/recipes/:id', async (req, res) => {
  const { id } = req.params;

  const retorno = await RecipesService.getById(id);
  console.log(retorno);
  return res.status(retorno.status).send(retorno.return);
});

router.post('/recipes', verifyJWT, async (req, res) => {
  const recipe = req.body;

  const isnotvalid = !recipe.name || !recipe.ingredients || !recipe.preparation;

  if (isnotvalid) {
    return res.status(400).json({ message: 'Invalid entries. Try again.' });
  }
  const retorno = await RecipesService.insert(recipe);

  return res.status(retorno.status).send(retorno.return);
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
