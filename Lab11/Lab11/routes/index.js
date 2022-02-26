const constructorMethod = (app) => {
  app.get("/", function (request, response) {
    response.render("pages/index", {});
  });

  app.use("*", (req, res) => {
    res.sendStatus(404);
  });
};

module.exports = constructorMethod;
