import config from "config";

const config_support=function () {
    if (!config.get("jwtPrivateKey")) {
        throw new Error("Fatal Error: jwtPrivate key is no defined");
      }
  }

export default config_support;