var express = require("express");
var router = express.Router();
const passport = require("passport");
const LocalStrategy = require("passport-local");
const User = require("../model/users");
const { isLoggedIn } = require("../utils/auth");

passport.use(User.createStrategy());
/* GET home page. */
router.get("/", function (req, res, next) {
  res.render("index", { title: "Express" });
});

router.get("/current", (req, res) => {
  res.send(req.user);
});

router.post("/register", async (req, res) => {
  try {
    const { username, email, password, role } = req.body;
    const newuser = new User({ username, email, role });
    await User.register(newuser, password);
    res.status(200).send("user registered");
  } catch (error) {
    res.status(400).send(error);
  }
});

router.post(
  "/login",
  passport.authenticate("local"),
  function (req, res, next) {
    res.status(200).send("User LogedIn");
  }
);

router.get("/logout", function (req, res, next) {
  req.logout(() => {
    res.send("user logged out");
  });
});

module.exports = router;
