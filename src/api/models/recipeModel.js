const { MongoClient, ObjectId } = require('mongodb');

const url = process.env.MONGO_DB_URL;
const client = new MongoClient(url, { useUnifiedTopology: true });

// Database Name
const dbName = process.env.DB_NAME;
class RecipeModel {
  static async findAll() {
    const collection = await RecipeModel.collection();
    return collection.find({}).toArray();
  }

  static async findById(id) {
    if (id.length !== 12 && id.length !== 24) {
      console.log(id.length);
      return undefined;
    }
    const oId = new ObjectId(id);
    const collection = await RecipeModel.collection();
    const recipe = await collection.find({ _id: oId }).toArray();

    return recipe[0];
  }

  static async insert(data) {
    try {
      const collection = await RecipeModel.collection();
      const insertResult = await collection.insertOne(data);

      const recipe = { recipe: insertResult.ops[0] };

      return recipe;
    } catch (error) {
      return { message: error };
    }
  }

  static async collection() {
    await client.connect();
    const db = client.db(dbName);
    const collection = db.collection('recipes');
    return collection;
  }
}
module.exports = RecipeModel;
