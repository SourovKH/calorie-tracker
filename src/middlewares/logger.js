const logger = (req, res, next) => {
  const { url, method, headers } = req;
  console.log({ url, method, headers });
  next();
};

module.exports = logger;
