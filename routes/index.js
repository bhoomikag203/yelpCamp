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
            console.log(err);
            return res.render("register");
        }
        passport.authenticate("local")(req, res, function() {
            console.log(newUser);
            res.redirect("/campgrounds");
        });
    });
});

//show login form
router.get('/login', (req, res) => {
    res.render("login");
});

//login logic
router.post('/login', passport.authenticate("local", {
    successRedirect: "/campgrounds",
    failureRedirect: "/login"
}), (req, res) => {
    res.send("Logged in");
});

//logout
router.get('/logout', (req, res) => {
    req.logout();
    res.redirect('/campgrounds');
});

module.exports = router;