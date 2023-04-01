const redis = require('redis');
const { promisify } = require('util');

/**
 * Represents a Redis client.
 */
class RedisClient {
  /**
   * Creates a new RedisClient instance.
   */
  constructor() {
    this.client = redis.createClient();

    this.client.on('error', (error) => {
      console.error('Redis connection error:', error);
    });

    this.getAsync = promisify(this.client.get).bind(this.client);
    this.setexAsync = promisify(this.client.setex).bind(this.client);
    this.delAsync = promisify(this.client.del).bind(this.client);
  }

  /**
   * Checks if this client's connection to the Redis server is active.
   * @returns {boolean}
   */
  async isAlive() {
    try {
      await this.client.pingAsync();
      return true;
    } catch (error) {
      console.error('Redis connection error:', error);
      return false;
    }
  }

  /**
   * Retrieves the value of a given key.
   * @param {String} key The key of the item to retrieve.
   * @returns {String | Object}
   */
  async get(key) {
    return this.getAsync(key);
  }

  /**
   * Stores a key and its value along with an expiration time.
   * @param {String} key The key of the item to store.
   * @param {String | Number | Boolean} value The item to store.
   * @param {Number} duration The expiration time of the item in seconds.
   * @returns {Promise<void>}
   */
  async set(key, value, duration) {
    return this.setexAsync(key, duration, value);
  }

  /**
   * Removes the value of a given key.
   * @param {String} key The key of the item to remove.
   * @returns {Promise<void>}
   */
  async del(key) {
    return this.delAsync(key);
  }
}

const redisClient = new RedisClient();
export default redisClient;
