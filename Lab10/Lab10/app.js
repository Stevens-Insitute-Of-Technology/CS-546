const express = require("express");
const app = express();
const cookieParser = require("cookie-parser");
const configRoutes = require("./routes");
const users = require("./data/users");
const exphbs = require("express-handlebars");
const static = express.static(__dirname + "/public");
const session = require("express-session");

app.use("/public", static);
app.use(cookieParser());
app.use(express.json());
app.use(express.urlencoded({ extended: true }));

app.engine("handlebars", exphbs({ defaultLayout: "main" }));
app.set("view engine", "handlebars");

app.use(
  session({
    name: "AuthCookie",
    secret: "This is SHER-LOCKED",
    saveUninitialized: true,
    resave: false,
  })
);

app.use(async (req, res, next) => {
  const timeStamp = new Date().toUTCString();
  if (req.session.user) {
    console.log(
      "[" +
        timeStamp +
        "]: " +
        req.method +
        " " +
        req.originalUrl +
        " " +
        "(Authenticated User)"
    );
  } else {
    console.log(
      "[" +
        timeStamp +
        "]: " +
        req.method +
        " " +
        req.originalUrl +
        " " +
        "(Non-Authenticated User)"
    );
  }
  next();
});

app.use("/private", (req, res, next) => {
  if (!req.session.user) {
    return res.status(403).render("users/fallback", {
      error: "User Not Logged In",
      title: "Error",
    });
  } else {
    next();
  }
});

configRoutes(app);

app.listen(3000, () => {
  console.log("We've now got a server!");
  console.log("Your routes will be running on http://localhost:3000");
});
