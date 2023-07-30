const router = require("express").Router();
const passport = require("passport");
const User = require("../models/User");
const CLIENT_URL = "http://localhost:3000/";
const CLIENT_REDIRECT = "http://localhost:3000/login"
router.get("/login/success", (req, res) => {
  if (req.user) {
    res.status(200).json({
      success: true,
      message: "successfull",
      user: req.user,
      //   cookies: req.cookies
    });
  }
});

router.get("/register/success", (req, res) => {
  if (req.user) {
    const existingUser = User.findOne({
        accountId:req.user.accountId,
    });
    if(existingUser.password){
      res.status(200).json({
        success: true,
        message: "successfull",
        flag: true,
        //   cookies: req.cookies
      });
    }
    
  }
});

router.get("/login/failed", (req, res) => {
  res.status(401).json({
    success: false,
    message: "failure",
  });
});

router.get("/logout", (req, res) => {
  req.logout();
  res.redirect(CLIENT_URL);
});

router.get("/google", passport.authenticate("google", { scope: ["profile"] }));

router.get(
  "/google/callback",
  passport.authenticate("google", {
    successRedirect: CLIENT_REDIRECT,
    failureRedirect: "/login/failed",
  })
);

router.get("/github", passport.authenticate("github", { scope: ["profile"] }));

router.get(
  "/github/callback",
  passport.authenticate("github", {
    successRedirect: CLIENT_REDIRECT,
    failureRedirect: "/login/failed",
  })
);

router.get("/facebook", passport.authenticate("facebook", { scope: ["profile"] }));

router.get(
  "/facebook/callback",
  passport.authenticate("facebook", {
    successRedirect: CLIENT_REDIRECT,
    failureRedirect: "/login/failed",
  })
);

router.get("/twitter", passport.authenticate("twitter", { scope: ["profile"] }));

router.get(
  "/twitter/callback",
  passport.authenticate("twitter", {
    successRedirect: CLIENT_REDIRECT,
    failureRedirect: "/login/failed",
  })
);



module.exports = router