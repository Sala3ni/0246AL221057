const cache = new Map();

const get = (key) => {
  return cache.get(key);
};

const set = (key, value, ttl = 3600) => {
  cache.set(key, { value, expires: Date.now() + ttl * 1000 });
};

const del = (key) => {
  return cache.delete(key);
};

const clear = () => {
  cache.clear();
};

module.exports = { get, set, del, clear };