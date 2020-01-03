const express = require('express');
var app = express();

app.set('view engine', 'ejs');

app.get('/', (req, res) => {
    res.render("landing");
});

app.get('/campgrounds', (req, res) => {
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
        }
    ];
    res.render("campgrounds", { campgrounds: campgrounds });
});
app.listen(3000, () => {
    console.log(`The YelpCamp Server Has Started!!`);
});