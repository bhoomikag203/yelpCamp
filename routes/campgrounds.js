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

//edit route ('/campgrounds/:id/edit')
router.get('/:id/edit', (req, res) => {
    Campground.findById(req.params.id, (err, foundCampground) => {
        if (err) {
            res.redirect("/campgrounds");
        } else {
            res.render('campgrounds/edit', { campground: foundCampground });
        }
    });
});

//update route
router.put('/:id', (req, res) => {
    //find and update correct campground
    Campground.findByIdAndUpdate(req.params.id, req.body.campground, (err, updatedCampground) => {
        if (err) {
            res.redirect("/campgrounds");
        } else {
            //redirect to show page
            res.redirect("/campgrounds/" + req.params.id);
        }
    });
});

//destroy  ('/campgrounds/:id')
router.delete('/:id', (req, res) => {
    Campground.findByIdAndRemove(req.params.id, (err) => {
        if (err) {
            res.redirect("/campgrounds");
        } else {
            res.redirect("/campgrounds");
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