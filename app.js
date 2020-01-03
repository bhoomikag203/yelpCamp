const express = require('express');
var app = express();
var bodyParser = require("body-parser");

app.use(bodyParser.urlencoded({ extended: true }));

app.set('view engine', 'ejs');

app.get('/', (req, res) => {
    res.render("landing");
});

var campgrounds = [{
        name: "The Great Hills",
        image: "https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcSBe-BrfrXaf-3F0YjaPzB8sMnaIhINDd1GvQsY3fX7QFn-_SYvow&s"
    },
    {
        name: "The Mountians",
        image: "https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcTv2RQ7Vzt_7N3FLiDsWFaXScY17PA0ffrJg-4SU0l2KVRIEMzd&s"
    },
    {
        name: "Dark Hill",
        image: "https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcRtUc0GWE8NI2WQOOdRV-SUddqQMd2zjaHSVW9IvMExkJzvTmJeaQ&s"
    },
    {
        name: "The Great Hills",
        image: "https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcSBe-BrfrXaf-3F0YjaPzB8sMnaIhINDd1GvQsY3fX7QFn-_SYvow&s"
    },
    {
        name: "The Mountians",
        image: "https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcTv2RQ7Vzt_7N3FLiDsWFaXScY17PA0ffrJg-4SU0l2KVRIEMzd&s"
    },
    {
        name: "Dark Hill",
        image: "https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcRtUc0GWE8NI2WQOOdRV-SUddqQMd2zjaHSVW9IvMExkJzvTmJeaQ&s"
    },
    {
        name: "The Great Hills",
        image: "https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcSBe-BrfrXaf-3F0YjaPzB8sMnaIhINDd1GvQsY3fX7QFn-_SYvow&s"
    },
    {
        name: "The Mountians",
        image: "https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcTv2RQ7Vzt_7N3FLiDsWFaXScY17PA0ffrJg-4SU0l2KVRIEMzd&s"
    },
    {
        name: "Dark Hill",
        image: "https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcRtUc0GWE8NI2WQOOdRV-SUddqQMd2zjaHSVW9IvMExkJzvTmJeaQ&s"
    }


];

app.get('/campgrounds', (req, res) => {
    res.render("campgrounds", { campgrounds: campgrounds });
});

app.post('/campgrounds', (req, res) => {
    var name = req.body.name;
    var image = req.body.image;
    var newCampground = {
        name: name,
        image: image
    };
    campgrounds.push(newCampground);
    res.redirect("/campgrounds");
});

app.get('/campgrounds/new', (req, res) => {
    res.render("new");
});

app.listen(3000, () => {
    console.log(`The YelpCamp Server Has Started!!`);
});