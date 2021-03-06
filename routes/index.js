const express = require("express");
var router = express.Router();
var passport = require('passport');
var User = require('../models/user');

//root route
router.get("/", (req, res) => {
    res.render("landing");
});

//signup form
router.get('/register', (req, res) => {
    res.render("register")
});

//signup logic
router.post("/register", function(req, res) {
    var newUser = new User({ username: req.body.username });
    User.register(newUser, req.body.password, function(err, user) {
        if (err) {
            req.flash("error", err.message);
            return res.redirect("/register");
        }
        passport.authenticate("local")(req, res, function() {
            req.flash("success", "Welcome to YelpCamp " + user.username);
            res.redirect("/campgrounds");
        });
    });
});

//show login form
router.get('/login', (req, res) => {
    res.render("login");
});

//login logic
router.post("/login", passport.authenticate("local", {
    successRedirect: "/campgrounds",
    failureRedirect: "/login",
    failureFlash: true,
    successFlash: 'Welcome to YelpCamp!'
}), function(req, res) {});

//logout
router.get('/logout', (req, res) => {
    req.logout();
    req.flash("success", "Logged you out!")
    res.redirect('/campgrounds');
});

module.exports = router;