const { MongoClient } = require('mongodb');

class DBClient {
  constructor() {
    const host = process.env.DB_HOST || 'localhost';
    const port = process.env.DB_PORT || 27017;
    const database = process.env.DB_DATABASE || 'files_manager';

    this.url = `mongodb://${host}:${port}`;
    this.client = new MongoClient(this.url, { useNewUrlParser: true });
  }

  isAlive() {
    try {
      this.client.connect();
      this.client.db().admin().ping();
      return true;
    } catch (error) {
      console.error('MongoDB connection error:', error);
      return false;
    }
  }

  async nbUsers() {
    const collection = this.client.db().collection('users');
    return collection.countDocuments();
  }

  async nbFiles() {
    const collection = this.client.db().collection('files');
    return collection.countDocuments();
  }
}

const dbClient = new DBClient();
module.exports = dbClient;
