const marvelRoutes = require("./marvel");

const constructorMethod = (app) => {
  app.use("/", marvelRoutes); // when searched with marvel parameter

  app.use("*", (req, res) => {
    res.status(404).json({
      message:
        "The page you requested does not exists. Please use the below mentioned url(s)",
      marvel: "http://localhost:3000",
    });
  });
};

module.exports = constructorMethod;
