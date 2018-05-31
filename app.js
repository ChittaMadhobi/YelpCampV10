// Generic npm framework imports
var express         = require('express');
var bodyParser      = require('body-parser');
var mongoose        = require('mongoose');
var passport        = require('passport');
var LocalStrategy   = require('passport-local');
var methodOverride  = require('method-override');

//var request = require('request'); // not needed but will eventually for external API calls

// Imports from application
var User = require('./models/user');
var Campground = require('./models/campground');
var Comment = require('./models/comment');

// Router imports from router directory
var indexRoutes = require('./routes/index');
var campgroundRoutes = require('./routes/campgrounds');
var commentRoutes = require('./routes/comments');

// Needs to be deleted eventaully. ... 
//var seedDB = require('./seeds1');

var app = express();
// ##### Connect to mongoose
mongoose.connect('mongodb://localhost/yelp_camp_v10');

// To be removed afterwards ... this seeds the data
// seedDB();

app.use(bodyParser.urlencoded({ extended: true }));
app.set('view engine', 'ejs');
app.use(express.static(__dirname + "/public"));
app.use(methodOverride('_method')); 

app.use(require('express-session')({
    secret: 'Who ever said node js was easy. So much stuff going on here.',
    resave: false,
    saveUninitialized: false
}));
app.use(passport.initialize());
app.use(passport.session());
passport.use(new LocalStrategy(User.authenticate()));
passport.serializeUser(User.serializeUser());
passport.deserializeUser(User.deserializeUser());
// This is passport's utility to get user as middleware to every route
app.use(function (req, res, next) {
    res.locals.currentUser = req.user;
    next()
});

app.use("/", indexRoutes);
app.use("/campgrounds", campgroundRoutes);
app.use("/campgrounds/:id/comments", commentRoutes);

app.listen('3000', function () {
    console.log("YelpCamp Localhost Server started at port 3000");
});