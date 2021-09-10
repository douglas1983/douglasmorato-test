const RecipeModel = require('../models/recipeModel');

class RecipesService {
  static async insert(data) {
    try {
      const inserted = await RecipeModel.insert(data);
      console.log(inserted);
      return { status: 201, return: inserted };
    } catch (error) {
      return { status: 500, return: { message: error } };
    }
  }

  static async update(data) {
    // return recipes.push(data);
    return data;
  }

  static async delete(data) {
    return data;
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
