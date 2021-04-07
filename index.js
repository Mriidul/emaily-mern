const express = require("express");
const mongoose = require("mongoose");
const passport = require("passport");
const cookieSession = require("cookie-session");
const keys = require("./config/keys");
const bodyParser = require("body-parser");

require("./models/Users");
require("./service/passport");

const app = express();

app.use(bodyParser.json());
app.use(
  cookieSession({
    maxAge: 30 * 24 * 60 * 60 * 1000,
    keys: [keys.cookieKeys],
  })
);

app.use(passport.initialize());
app.use(passport.session());

const connectionParams = {
  useNewUrlParser: true,
  useCreateIndex: true,
  useUnifiedTopology: true,
};

mongoose.connect(keys.mongoURI, connectionParams);

require("./route/authRoutes")(app);
require("./route/billingRoutes")(app);

if (process.env.NODE_ENV === "production") {
  app.use(express.static("./client/build"));

  const path = require("path");
  app.get("*", (req, res) => {
    res.sendFile(path.resolve(__dirname, "client", "build", "index.html"));
  });
}

const PORT = process.env.PORT || 5000;

app.listen(PORT);
