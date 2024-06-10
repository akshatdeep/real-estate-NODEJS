var express = require("express");
var router = express.Router();
const { isLoggedIn } = require("../utils/auth");
const Appointment = require("../model/appointment")

function verifyrole(req, res, next) {
  if (req.user.role == "buyer") {
    next();
  } else {
    res.send(
      "Only buyer have the permission to get appointment property<a href='/user/profile'>Profile</a>"
    );
  }
}

router.get("/:propertyid", isLoggedIn, verifyrole, (req, res) => {
  res.render("createappointment", {
    user: req.user,
    pid: req.params.propertyid,
  });
});


router.post("/:propertyid", isLoggedIn, verifyrole,async (req, res) => {
    try {
        const newappointment = new Appointment({
            ...req.body,
            user:req.user,
            property:req.params.propertyid
        })
        await newappointment.save()
        res.redirect("/user/profile")
    } catch (error) {
        res.send(error)
    }
})

module.exports = router;
