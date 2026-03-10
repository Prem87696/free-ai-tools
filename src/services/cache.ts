const cache = new Map<string, { result: string; time: number }>();

const CACHE_TIME = 24 * 60 * 60 * 1000;

export function getCache(prompt: string) {

  const data = cache.get(prompt);

  if (!data) return null;

  if (Date.now() - data.time > CACHE_TIME) {
    cache.delete(prompt);
    return null;
  }

  return data.result;
}

export function setCache(prompt: string, result: string) {

  cache.set(prompt, {
    result,
    time: Date.now()
  });

}
