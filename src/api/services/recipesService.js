// const userModel = require('../models/userModel');
const recipes = [
  {
    name: 'Frango do jacquin',
    ingredients: 'Frango',
    preparation: '10 min no forno',
  },
  {
    name: 'Frango do jacquin',
    ingredients: 'Frango',
    preparation: '10 min no forno',
  },
];
class RecipesService {
  static async insert(data) {
    return recipes.push(data);
  }

  static async update(data) {
    return recipes.push(data);
  }

  static async delete(data) {
    return recipes.push(data);
  }

  static async getAll() {
    return recipes;
  }

  static async getById(id) {
    return {
      id,
      name: 'Erick Jacquin',
      email: 'erickjacquin@gmail.com',
      password: '12345678',
      role: 'user',
    };
  }
}

module.exports = RecipesService;
