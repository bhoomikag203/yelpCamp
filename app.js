const express = require("express"),
    app = express(),
    bodyParser = require("body-parser"),
    mongoose = require("mongoose"),
    Campground = require('./models/campground'),
    seedDB = require('./seeds.js');

seedDB();
mongoose.connect("mongodb://localhost/yelp_camp", {
    useUnifiedTopology: true,
    useNewUrlParser: true
});
app.use(bodyParser.urlencoded({ extended: true }));
app.set("view engine", "ejs");


// Campground.create({
//         name: "The Mountains",
//         image: "https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcTv2RQ7Vzt_7N3FLiDsWFaXScY17PA0ffrJg-4SU0l2KVRIEMzd&s",
//         description: "This is a huge mountain in the World! But no bathrooms. No water!"
//     },
//     (err, campground) => {
//         if (err) {
//             console.log("SOMETHING WENT WRONG");
//             console.log(err);
//         } else {
//             console.log("Added campground!");
//             console.log(campground);
//         }
//     }
// );

app.get("/", (req, res) => {
    res.render("landing");
});

app.get("/campgrounds", (req, res) => {
    Campground.find({}, (err, allCampgrounds) => {
        if (err) {
            console.log("SOMETHING WENT WRONG");
            console.log(err);
        } else {
            res.render("index", { campgrounds: allCampgrounds });
        }
    });
});

app.post("/campgrounds", (req, res) => {
    var name = req.body.name;
    var image = req.body.image;
    var description = req.body.description;
    var newCampground = {
        name: name,
        image: image,
        description: description
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

app.get("/campgrounds/new", (req, res) => {
    res.render("new");
});

app.get("/campgrounds/:id", (req, res) => {
    // var id = req.params.id;
    Campground.findById(req.params.id, (err, foundCampground) => {
        if (err) {
            console.log(err);
        } else {
            res.render("show", { campground: foundCampground });
        }
    });
});

app.listen(3000, () => {
    console.log(`The YelpCamp Server Has Started!!`);
});