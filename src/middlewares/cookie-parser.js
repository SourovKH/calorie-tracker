const parseCookie = (req, res, next) => {
  const cookie = req.cookie;

  if (!cookie) {
    req.cookies = {};
    next();
    return;
  }

  const cookies = Object.fromEntries(
    cookie.split("&").map((c) => c.split("="))
  );
  req.cookies = cookies;
  next();
};

module.exports = parseCookie;
