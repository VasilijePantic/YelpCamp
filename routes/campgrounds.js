var express = require("express");
var router = express.Router();
var Campground = require("../models/camground");
var middleware = require("../middleware");

//==================
//INDEX ROUTE -shows all camgrounds
//==================

router.get("/", function(req, res){
    //show campgrounds
    Campground.find({}, function(err, allCampgrounds){
       if(err){
           console.log(err);
           res.send("no campgrounds");
       } else{ //render them
            res.render("campgrounds/index", {campgrounds: allCampgrounds});       
       }
    });
});



//====================
// - CREATE ROUTE - adds a new camground to a db
//====================

router.post("/", middleware.isLoggedIn,function(req, res){
// get data from the form and add to campgrounds array
    var name = req.body.name;
    var price = req.body.price;
    var image = req.body.image;
    var desc = req.body.description;
    var author = {
        id: req.user._id,
        username: req.user.username
    };
    var newCampground = {name: name, image: image, description: desc, author: author, price: price};
    // create a new campground and save it to a DB
    Campground.create(newCampground, function(err, newlyCreated){
        if(err){
            console.log(err);
        } else{
            //redirect to campgrounds page
            res.redirect("/campgrounds");            
        }
    });
});

//====================================
// NEW ROUTE - shows a FORM to send the post request
//====================================

router.get("/new", middleware.isLoggedIn, function(req, res) {
    res.render("campgrounds/new");
});




//====================================
// SHOW ROUTE - to show a specific element from the db
//====================================
    // order is important bcs /new has to come before /:id,otherwise /new wont work
router.get("/:id", function(req, res){
    //find campground with provided id
    //new mongoose method .findById
    Campground.findById(req.params.id).populate("comments").exec(function(err, foundCampground){
        if(err){
            console.log(err);
        } else{
            console.log(foundCampground);
                //render show template  with that campground
            res.render("campgrounds/show", {campground: foundCampground});        
        }
    });
});


//================================
// EDIT ROUTE
//================================

router.get("/:id/edit", middleware.checkCampgroundOwnership, function(req, res){
    Campground.findById(req.params.id, function(err, foundCampground){
        res.render("campgrounds/edit", {campground: foundCampground});
    })            
});


//================================
// UPDATE ROUTE
//================================

router.put("/:id", middleware.checkCampgroundOwnership, function(req, res){
    // find and update the correct campg
    Campground.findByIdAndUpdate(req.params.id, req.body.campground, function(err, updatedCampground){
        if(err){
            res.redirect("/campgrounds");
        } else {
            res.redirect("/campgrounds/" + req.params.id);
        }
    })
    // redirect to show page
});


//================================
// DESTROY ROUTE
//================================

router.delete("/:id",middleware.checkCampgroundOwnership, function(req, res){
    Campground.findByIdAndRemove(req.params.id, function(err){
        if(err){
            res.redirect("/campgrounds")
        } else{
            res.redirect("/campgrounds")
        }
    });
});




module.exports = router;
