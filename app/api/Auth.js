const APICaller = require("./APICaller");

const prefix = "auth";

export default {
  auth(email, password) {
    return APICaller(prefix, "POST", { email, password });
  }
};
