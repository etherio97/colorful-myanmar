const config = require("./config.production");

if (process.env.NODE_ENV === "development") {
  for (let [name, value] of Object.entries(require("./config.development"))) {
    config[name] = value;
  }
}

module.exports = config;
