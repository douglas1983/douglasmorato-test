const { MongoClient } = require('mongodb');

const url = process.env.MONGO_DB_URL;
const client = new MongoClient(url, { useUnifiedTopology: true });

// Database Name
const dbName = process.env.DB_NAME;
class UserModel {
  static async findAll() {
    await client.connect();
    const db = client.db(dbName);
    const collection = db.collection('users');
    return collection.find({}).toArray();
  }

  static async findById(id) {
    await client.connect();
    const db = client.db(dbName);
    const collection = db.collection('users');
    const user = await collection.find({ _id: id }, { projection: { password: 0 } }).toArray();

    return user[0];
  }

  static async findByEmail(email) {
    await client.connect();
    const db = client.db(dbName);
    const collection = db.collection('users');
    const user = await collection.find({ email }).toArray();

    return user.length > 0 ? user[0] : null;
  }

  static async insert(data) {
    try {
      await client.connect();
      const db = client.db(dbName);
      const collection = db.collection('users');
      const insertResult = await collection.insertOne(data);

      const user = await this.findById(insertResult.ops[0]._id);
      return { user };
    } catch (error) {
      return { message: error };
    }
  }
}
module.exports = UserModel;
