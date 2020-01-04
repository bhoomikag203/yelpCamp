const express = require('express'),
    app = express(),
    bodyParser = require("body-parser"),
    mongoose = require('mongoose');

mongoose.connect("mongodb://localhost/yelp_camp", { useUnifiedTopology: true, useNewUrlParser: true });
app.use(bodyParser.urlencoded({ extended: true }));
app.set('view engine', 'ejs');

var campgroundSchema = new mongoose.Schema({
    name: String,
    image: String
});

var Campground = mongoose.model("Campground", campgroundSchema);

// Campground.create({
//     name: "The Mountians",
//     image: "https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcTv2RQ7Vzt_7N3FLiDsWFaXScY17PA0ffrJg-4SU0l2KVRIEMzd&s"
// }, (err, campground) => {
//     if (err) {
//         console.log("SOMETHING WENT WRONG");
//         console.log(err);
//     } else {
//         console.log("Added campground!");
//         console.log(campground);
//     }
// });

app.get('/', (req, res) => {
    res.render("landing");
});

app.get('/campgrounds', (req, res) => {
    Campground.find({}, (err, allCampgrounds) => {
        if (err) {
            console.log("SOMETHING WENT WRONG");
            console.log(err);
        } else {
            res.render("campgrounds", { campgrounds: allCampgrounds });
        }
    })
});

app.post('/campgrounds', (req, res) => {
    var name = req.body.name;
    var image = req.body.image;
    var newCampground = {
        name: name,
        image: image
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

app.get('/campgrounds/new', (req, res) => {
    res.render("new");
});

app.listen(3000, () => {
    console.log(`The YelpCamp Server Has Started!!`);
});