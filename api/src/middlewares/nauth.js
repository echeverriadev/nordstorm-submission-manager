module.exports = (req, res, next) => {
  // We try to get te token and the expiration in the cookies first, if they exist we validate if the cookie is valid.
  let nauthToken = req.cookies.nauthToken;
  let nauthExpirationTime = req.cookies.nauthExpirationTime;

  // if tokenExpiration and token are empty, we redirect to nauth login page.
  if (nauthToken === undefined && nauthExpirationTime === undefined) {
    res.status(401).json({
      error: {
        code: 0,
        message:
          "Authentication failed, due to missing or invalid credentials.",
        info: "",
        reference: ""
      }
    });
  }

  next();
};
