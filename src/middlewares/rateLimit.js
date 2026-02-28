const requests = new Map();
const WINDOW_TIME = 60 * 1000; // 1 minute
const MAX_REQUESTS = 1000;

setInterval(() => {
  const now = Date.now();
  requests.forEach(({ firstTime }, ip) => {
    if (now - firstTime > WINDOW_TIME) {
      requests.delete(ip);
    }
  });
}, WINDOW_TIME / 2);

const rateLimiter = (req, res, next) => {
  const ip = req.ip;
  const now = Date.now();

  if (!requests.has(ip)) {
    requests.set(ip, { count: 1, firstTime: now });
    return next();
  }

  let { count, firstTime } = requests.get(ip);
  if (now - firstTime < WINDOW_TIME) {
    if (count < MAX_REQUESTS) {
      count += 1;
      requests.set(ip, { count, firstTime });
      return next();
    }
    return res.status(429).json({ message: 'Too many requests. Please try again later.' });
  }

  requests.set(ip, { count: 1, firstTime: now });
  next();
};

module.exports = rateLimiter;
