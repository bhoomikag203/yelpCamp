const express = require("express");
var router = express.Router({ mergeParams: true });
var Campground = require('../models/campground');
var Comment = require('../models/comment');
var middleware = require('../middleware');

//new comment route ('/campgrounds/:id/comments/new')
router.get('/new', middleware.isLoggedIn, (req, res) => {
    Campground.findById(req.params.id, (err, campground) => {
        if (err) {
            console.log(err);
        } else {
            res.render("comments/new", { campground: campground });
        }
    });
});

//create comment route '/campgrounds/:id/comments/'
router.post('/', middleware.isLoggedIn, (req, res) => {
    Campground.findById(req.params.id, (err, campground) => {
        if (err) {
            console.log(err);
            res.redirect("/campgrounds");
        } else {
            //create new comment
            Comment.create(req.body.comment, (err, comment) => {
                if (err) {
                    req.flash("error", "Something went wrong");
                    console.log(err);
                } else {
                    //add username and id to comment
                    comment.author.id = req.user._id;
                    comment.author.username = req.user.username;
                    //save comment 
                    comment.save();
                    //connect new comment to campgrounds
                    campground.comments.push(comment);
                    campground.save();
                    //redirect to campground page
                    console.log(comment);
                    req.flash("success", "Successfully added comment");

                    res.redirect('/campgrounds/' + campground._id)
                }
            });
        }
    });
});

//edit comment
router.get('/:comment_id/edit', middleware.isLoggedIn, middleware.checkCommentOwnership, (req, res) => {
    Comment.findById(req.params.comment_id, (err, foundComment) => {
        if (err) {
            res.redirect('back');
        } else {
            res.render("comments/edit", { campground_id: req.params.id, comment: foundComment });
        }
    })
});

//update comment
router.put('/:comment_id', middleware.checkCommentOwnership, (req, res) => {
    Comment.findByIdAndUpdate(req.params.comment_id, req.body.comment, (err, updatedComment) => {
        if (err) {
            res.redirect('back');
        } else {
            //redirect to show page
            res.redirect("/campgrounds/" + req.params.id);
        }
    });
});

//delete comment
router.delete('/:comment_id', middleware.checkCommentOwnership, (req, res) => {
    Comment.findByIdAndRemove(req.params.comment_id, (err) => {
        if (err) {
            res.redirect('back');
        } else {
            req.flash("success", "Comment deleted");

            res.redirect('/campgrounds/' + req.params.id);
        }
    })
});

module.exports = router;