const logger = (req, res, next) => {
  const { url, method } = req;
  console.log({ url, method });
  next();
};

module.exports = logger;