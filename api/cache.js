const cache = new Map();
const TTL = 30 * 60 * 1000; // 30 minutes

export function getCachedData(url) {
  const data = cache.get(url);

  if (!data) return null;

  if (Date.now() - data.time > TTL) {
    cache.delete(url);
    return null;
  }

  return data.value;
}

export function saveCache(url, value) {
  cache.set(url, {
    value,
    time: Date.now(),
  });
}
