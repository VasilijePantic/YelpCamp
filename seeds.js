var mongoose = require("mongoose");
var Campground = require("./models/camground");
var Comment = require("./models/comment");

var data = [
    {
        name: "Ivica Bog",
        image: "https://upload.wikimedia.org/wikipedia/commons/thumb/6/64/Ivica_Dacic_2013.jpg/250px-Ivica_Dacic_2013.jpg",
        description: "Lorem Ipsum is simply dummy text of the printing and typesetting industry. Lorem Ipsum has been the industry's standard dummy text ever since the 1500s, when an unknown printer took a galley of type and scrambled it to make a type specimen book. It has survived not only five centuries, but also the leap into electronic typesetting, remaining essentially unchanged. It was popularised in the 1960s with the release of Letraset sheets containing Lorem Ipsum passages, and more recently with desktop publishing software like Aldus PageMaker including versions of Lorem Ipsum."
    },
    {
        name: "Nesa Slina",
        image: "http://boljaadvokatura.com/wp-content/uploads/2015/05/863390-stefanovic03-betaphoto-foto-marko-rupena.jpg",
        description: "Lorem Ipsum is simply dummy text of the printing and typesetting industry. Lorem Ipsum has been the industry's standard dummy text ever since the 1500s, when an unknown printer took a galley of type and scrambled it to make a type specimen book. It has survived not only five centuries, but also the leap into electronic typesetting, remaining essentially unchanged. It was popularised in the 1960s with the release of Letraset sheets containing Lorem Ipsum passages, and more recently with desktop publishing software like Aldus PageMaker including versions of Lorem Ipsum."
    },
    {
        name: "Clouds Rest",
        image: "http://images.memes.com/meme/224824",
        description: "Lorem Ipsum is simply dummy text of the printing and typesetting industry. Lorem Ipsum has been the industry's standard dummy text ever since the 1500s, when an unknown printer took a galley of type and scrambled it to make a type specimen book. It has survived not only five centuries, but also the leap into electronic typesetting, remaining essentially unchanged. It was popularised in the 1960s with the release of Letraset sheets containing Lorem Ipsum passages, and more recently with desktop publishing software like Aldus PageMaker including versions of Lorem Ipsum."
    }
]


function seedDB(){
    // remove all campgrounds
    Campground.remove({}, function(err){
        if(err){
            console.log(err);
        }
        console.log("camgrounds removed");
        // add a few camgrounds
        data.forEach(function(seed){
            Campground.create(seed, function(err, campground){
                if(err){
                    console.log(err);
                } else{
                    console.log("added a campground");
                    // create a comment on each campground
                    Comment.create(
                        {
                            text: "this place is great but i wish there was internet",
                            author: "Homer"
                        }, function(err, comment){
                            if(err){
                                console.log(err)
                            } else{
                                campground.comments.push(comment);
                                campground.save();
                                console.log("created new comment");
                            }
                        })
                }
            });
        });
    });
    // add a few comments
};

module.exports = seedDB;