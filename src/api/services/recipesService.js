const RecipeModel = require('../models/recipeModel');

class RecipesService {
  static async upsert(data) {
    try {
      const status = data._id ? 200 : 201;
      const inserted = await RecipeModel.insertOrUpdate(data);
      console.log(inserted, 'service');
      return { status, return: inserted };
    } catch (error) {
      return { status: 500, return: { message: error } };
    }
  }

  static async delete(id) {
    return RecipeModel.deleteById(id);
  }

  static async getAll() {
    return RecipeModel.findAll();
  }

  static async getById(id) {
    const recipe = await RecipeModel.findById(id);

    return recipe
      ? { status: 200, return: recipe }
      : { status: 404, return: { message: 'recipe not found' } };
  }
}

module.exports = RecipesService;
