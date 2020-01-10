const express = require("express");
var router = express.Router();
var Campground = require('../models/campground');

//index route ('/campgrounds/')
router.get("/", (req, res) => {
    Campground.find({}, (err, allCampgrounds) => {
        if (err) {
            console.log("SOMETHING WENT WRONG");
            console.log(err);
        } else {
            res.render("campgrounds/index", { campgrounds: allCampgrounds });
        }
    });
});

//Create route ('/campgrounds/')
router.post("/", isLoggedIn, (req, res) => {
    var name = req.body.name;
    var image = req.body.image;
    var description = req.body.description;
    var author = {
        id: req.user._id,
        username: req.user.username
    }
    var newCampground = {
        name: name,
        image: image,
        description: description,
        author: author
    };
    Campground.create(newCampground, (err, newlyCreated) => {
        if (err) {
            console.log("SOMETHING WENT WRONG");
            console.log(err);
        } else {
            res.redirect("/campgrounds");
        }
    });
});

//new route ('/campgrounds/new')
router.get("/new", isLoggedIn, (req, res) => {
    res.render("campgrounds/new");
});

//show route ('/campgrounds/:id')
router.get("/:id", (req, res) => {
    // var id = req.params.id;
    Campground.findById(req.params.id).populate("comments").exec((err, foundCampground) => {
        if (err) {
            console.log(err);
        } else {
            res.render("campgrounds/show", { campground: foundCampground });
        }
    });
});

function isLoggedIn(req, res, next) {
    if (req.isAuthenticated()) {
        return next();
    }
    res.redirect('/login');
}

module.exports = router;