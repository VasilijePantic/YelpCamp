var express = require("express");
var router = express.Router({mergeParams: true});
var Campground = require("../models/camground");
var Comment = require("../models/comment");
var middleware = require("../middleware");

// =============================================
//               COMMENTS ROUTES
// =============================================

// COMMENTS/NEW
router.get("/new", middleware.isLoggedIn, function(req, res){
    //find campground by id
    Campground.findById(req.params.id, function(err, campground){
        if(err){
            console.log(err)
        } else {
            res.render("comments/new", {campground: campground});
        }
    })
});

// POST COMMENTS
router.post("/", middleware.isLoggedIn, function(req, res){
    //look up camground using id
    Campground.findById(req.params.id, function(err, campground){
        if(err){
            console.log(err);
            res.redirect("/campgrounds");
        } else {
            // create new comment
            Comment.create(req.body.comment, function(err, comment){
                if(err){
                    req.flash("error", "Something went wrong!")
                    console.log(err)
                } else {
                    // add username and id to comment
                    comment.author.id = req.user._id;
                    comment.author.username = req.user.username;
                    // save comment  
                    comment.save();
                    campground.comments.push(comment); // connect new comment to campground
                    campground.save();
                    console.log(comment);
                    req.flash("success", "Comment successfully added!");
                    res.redirect("/campgrounds/" + campground._id); // redirect to campground show page
                }
            });
        }
    });
});

// EDIT COMMENT
router.get("/:comment_id/edit", middleware.checkCommentOwnership, function(req, res){
    Campground.findById(req.params.id, function(err, foundCampground){
        if(err || !foundCampground){
            req.flash("error", "No campground found");
            return res.redirect("back");
        }
        Comment.findById(req.params.comment_id, function(err, foundComment){
            if(err){
                res.redirect("back")
            } else{
                res.render("comments/edit", {campground_id: req.params.id, comment: foundComment});
            }
        });
    })
});

// UPDATE COMMENT
router.put("/:comment_id",middleware.checkCommentOwnership, function(req, res){
    Comment.findByIdAndUpdate(req.params.comment_id, req.body.comment, function(err, updatedComment){
        if(err){
            res.redirect("back")
        } else{
            res.redirect("/campgrounds/" + req.params.id);
        }
    });
});

// DELETE COMMENT
router.delete("/:comment_id",middleware.checkCommentOwnership, function(req, res){
    // find by id and remove
    Comment.findByIdAndRemove(req.params.comment_id, function(err){
        if(err){
            res.redirect("back");
        } else {
            req.flash("success", "Comment deleted!!")
            res.redirect("/campgrounds/" + req.params.id);
        }
    });
});


module.exports = router;
