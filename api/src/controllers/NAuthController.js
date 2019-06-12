const axios = require("axios");
const moment = require("moment");

class NAuthController {
  constructor() {
    this.client_id = process.env.NA_CLIENT_ID;
    this.redirect_uri = process.env.NA_REDIRECT_URI;
    this.baseUrl = process.env.NA_BASE_URL;
    this.loginUri = process.env.NA_LOGIN_URI;
    this.env = process.env.NA_ENV;
    this.claims = process.env.NA_CLAIMS;
    this.userInfoUri = process.env.NA_USER_INFO_URI;
    this.logoutUri = process.env.NA_LOGOUT_URI;
    this.skipIwa = true;
  }

  /**
   * Logings into nauth
   */
  async login(req, res, next) {
    let nauthToken = req.cookies.nauthToken;
    let nauthExpirationTime = req.cookies.nauthExpirationTime;

    if (nauthExpirationTime === undefined && nauthToken === undefined) {
      this.getOktaUrl()
        .then(response => {
          let data = response.data;
          res.status(200).json({
            status: 200,
            oktaUrl: data.data,
            logged: false
          });
        })
        .catch(error => {
          res.send({ error });
        });
    } else {
      if (new Date(nauthExpirationTime) > new Date()) {
        res.status(200).json({
          status: 200,
          logged: true
        });
      } else {
        this.getOktaUrl()
          .then(response => {
            let data = response.data;
            res.status(200).json({
              status: 200,
              oktaUrl: data.data,
              logged: false
            });
          })
          .catch(error => {
            res.send({ error });
          });
      }
    }
  }

  getOktaUrl() {
    return axios.get(`${this.baseUrl}${this.loginUri}`, {
      params: {
        client_id: this.client_id,
        redirect_uri: this.redirect_uri,
        env: this.env,
        claims: this.claims,
        is_implicit: "true",
        skip_iwa: this.skipIwa
      }
    });
  }

  /**
   * Sets cookie
   * @param {*} req
   * @param {*} res
   * @param {*} next
   */
  setCookie(req, res, next) {
    let body = req.body;
    let nauthToken = body.token;
    let nauthExpiration = parseInt(body.expirationTime);
    axios
      .get(`${this.baseUrl}${this.userInfoUri}`, {
        params: {
          env: this.env,
          client_id: this.client_id
        },
        headers: {
          Authorization: "Bearer " + nauthToken
        }
      })
      .then(response => {
        let data = response.data;
        if (data.status === 200) {
          let dataObject = data.data;
          let email = dataObject.email;
          let fullName = dataObject.full_name;
          let lanId = dataObject.user;
          let options = {
            expires: new Date(Date.now() + nauthExpiration * 1000)
          };

          // Set cookies
          res.cookie("nauthToken", nauthToken, options);
          res.cookie(
            "nauthExpirationTime",
            new Date(Date.now() + nauthExpiration * 1000),
            options
          );
          res.cookie("nauthEmail", email, options);
          res.cookie("nauthFullName", fullName, options);
          res.cookie("nauthLanId", lanId, options);

          res.status(200).json({
            status: 200,
            logged: true
          });
        } else {
          res.status(data.status).json({
            status: data.status,
            logged: false,
            message: data.message
          });
        }
      })
      .catch(error => {
        res.send({ error });
      });
  }

  /**
   * Logouts
   * @param {*} req
   * @param {*} res
   * @param {*} next
   */
  async logout(req, res, next) {
    console.log(req.cookies);
    axios
      .post(`${this.baseUrl}${this.logoutUri}`, {
        client_id: this.client_id,
        token: req.cookies.nauthToken,
        env: this.env
      })
      .then(response => {
        let data = response.data;
        res.cookie("rememberme", "1", {
          expires: new Date(Date.now() + 900000),
          httpOnly: true
        });
        // Set cookies
        let options = {
          expires: new Date(Date.now() - 3600)
        };

        res.cookie("nauthToken", "", options);
        res.cookie("nauthExpirationTime", "", options);
        res.cookie("nauthEmail", "", options);
        res.cookie("nauthFullName", "", options);
        res.cookie("nauthLanId", "", options);

        res.status(data.status).json({
          status: data.status,
          message: data.message
        });
      })
      .catch(error => {
        res.send({ error });
      });
  }
}

module.exports = new NAuthController();
