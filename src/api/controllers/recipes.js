const express = require('express');

const router = express.Router();

const verifyJWT = require('../middleware/verifyJWT');

const RecipesService = require('../services/recipesService');

const postOrPut = async (req, res) => {
  const { id } = req.params;
  const recipe = req.body;

  const isnotvalid = !recipe.name || !recipe.ingredients || !recipe.preparation;

  if (isnotvalid) {
    return res.status(400).json({ message: 'Invalid entries. Try again.' });
  }
  const data = id
    ? { ...recipe, _id: id, userId: req.decoded._id }
    : { ...recipe, userId: req.decoded._id };
  return RecipesService.upsert(data);
};

router.get('/recipes', async (req, res) => {
  res.json(await RecipesService.getAll(req));
});

router.get('/recipes/:id', async (req, res) => {
  const { id } = req.params;

  const retorno = await RecipesService.getById(id);
  return res.status(retorno.status).send(retorno.return);
});

router.post('/recipes', verifyJWT, async (req, res) => {
  const retorno = await postOrPut(req, res);

  return res.status(retorno.status).send(retorno.return);
});

router.put('/recipes/:id', verifyJWT, async (req, res) => {
  const retorno = await postOrPut(req, res);
  return res.status(retorno.status).send(retorno.return);
});

router.delete('/recipes/:id', verifyJWT, async (req, res) => {
  const { id } = req.params;
  const retorno = await RecipesService.delete(id);
  return res.status(retorno.status).send(retorno.return);
});

module.exports = {
  router,
};
