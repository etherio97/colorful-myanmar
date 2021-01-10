import config from "./config.production";

if (process.env.NODE_ENV === "development") {
  let update = async () => {
    const dev = await import("./config.development");

    for (let [key, value] of Object.entries(dev)) {
      config[key] = value;
    }
  };

  update();
}

export default config;
