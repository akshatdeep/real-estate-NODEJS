var express = require("express");
var router = express.Router();
const { isLoggedIn } = require("../utils/auth");
const upload = require("../utils/multer");
const Property = require("../model/property");

/* GET users listing. */
router.get("/", function (req, res, next) {
  res.send("respond with a resource");
});

function verifyrole(req, res, next) {
  if (req.user.role === "seller") {
    next();
  } else {
    res.send("Only seller the permission to create property");
  }
}

router.post(
  "/",
  verifyrole,
  isLoggedIn,
  upload.single("image"),
  async (req, res, next) => {
    try {
      const newproperty = new Property({
        ...req.body,
        image: req.file.filename,
        owener: req.user._id,
      });
      await newproperty.save();
      res.status(200).redirect("/user");
    } catch (error) {
      res.status(400).send(error);
    }
  }
);

module.exports = router;
