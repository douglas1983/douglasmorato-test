// const userModel = require('../models/userModel');

class UserService {
  static async insert(data) {
    return { ...data };
  }

  static async getAll(req) {
    return { name: 'teste' };
  }

  static async getById(id) {
    return { ...id };
  }

  static async getByLogin(login) {
    return { ...login };
  }
}

module.exports = UserService;
