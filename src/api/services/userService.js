// const userModel = require('../models/userModel');
const users = [
  { name: 'admin', email: 'root@email.com', password: 'admin', role: 'admin' },
  { name: 'Erick Jacquin', email: 'erickjacquin@gmail.com', password: '12345678', role: 'user' },
];
class UserService {
  static async insert(data) {
    return users.push(data);
  }

  static async getAll() {
    return users;
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

  static async getByLogin(login) {
    return users.find((user) => user.email === login);
  }
}

module.exports = UserService;
