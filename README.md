# YelpCamp
CRUD YelpApp for Campgrounds created using Express with REST routes,Mongo DB,Passport..

YelpCamp App is a bit more complex app created in Express with some Bootstrap styling. 
This app uses all the REST routes and its a CRUD app. 
This app also stores information regarding users and their data using MongoDB.

This app's purpose is to share,find,post and comment Campground sites all around the world. 

First,there is a landing page with 5 fade-in and out images and a "View all campgrounds" button. Clicking that button will get you to the homepage - /campgrounds.

On the home page (or /campgrounds), you will be able to see all the campgrounds posted with "more info" button on their bottom side. Clicking that button will present that specific campground along with it's name,price,image and full description. You will also be able to see all the comments.
There is also a "Add a new campground" button. It leads you to a form which you need to fill so you can add a new campground.

On the top of the page,in the header which is included on nearly every page,there is a navbar where you can register,login or logout.
For you to add a new Campground,comment,edit or delete something, you will need to be logged in first. 
You are also only able to edit and delete your own campgrounds and comments.
When logged in, you are able to comment on any campground,not only yours.
For this to work-passport,passport-local and passport-local-mongoose are being used along side with custom middleware to make sure that the user is registered and logged in. Middleware also checks if the post which you are trying to alter or chage is yours,or from a different user.

Also, Flash messages are included to let you know when you successfully make a comment,or when you log out for example.

This app is created as a final part of Backend Development from Udemy's "Web Developer Bootcamp" course.
