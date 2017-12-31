var express     = require("express"),
app             = express(),
bodyParser      = require("body-parser"),
mongoose        = require("mongoose"),
flash           = require("connect-flash"),
passport        = require("passport"),
LocalStrategy   = require("passport-local"),
methodOverride  = require("method-override"),
Campground      = require("./models/camground"),
Comment         = require("./models/comment"),
User            = require("./models/user"),
seedDB          = require("./seeds");

// requiring router files
var commentRoutes    = require("./routes/comments"),
    campgroundRoutes = require("./routes/campgrounds"),
    indexRoutes      = require("./routes/index");


//connecting app.js with a DB
mongoose.connect(process.env.DATABASEURL, {useMongoClient: true});
// mongoose.connect("mongodb://vasa:pasvord@ds135917.mlab.com:35917/yelp_camp_94", {useMongoClient: true});
mongoose.Promise = global.Promise;
app.use(bodyParser.urlencoded({extended: true}));
app.set("view engine","ejs");
app.use(express.static(__dirname + "/public"));
app.use(methodOverride("_method"));
app.use(flash());
// seedDB();  // seed the DB

//==============================
// PASSPORT CONFIGURATION
//==============================

app.use(require("express-session")({
    secret: "Bademi Lesnici i Orasi",
    resave: false,
    saveUninitialized: false
}));
app.use(passport.initialize());
app.use(passport.session());
passport.use(new LocalStrategy(User.authenticate()));
passport.serializeUser(User.serializeUser());
passport.deserializeUser(User.deserializeUser());

// MIDDLEWARE - for currentUser - it will be called on every route
app.use(function(req, res, next){
    res.locals.currentUser = req.user;
    res.locals.error =  req.flash("error");
    res.locals.success =  req.flash("success");
    next();
});

// USING ROUTES
app.use("/", indexRoutes);
app.use("/campgrounds", campgroundRoutes);
app.use("/campgrounds/:id/comments", commentRoutes);



//====================================
app.listen(port=3000, function(){
console.log("The YelpCamp started started!"); 
});