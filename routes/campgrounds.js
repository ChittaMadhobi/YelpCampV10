var express = require('express');
var router = express.Router();

var Campground = require('../models/campground');
var middleware = require('../middleware'); //By default, if no js files are specified,
                                           // node will look for index.js in that dir.


router.get('/', function (req, res) {
    // Get all the campgrounds
    Campground.find({}, function (err, campgroundsFromDB) {
        //console.log(req.user);
        if (err) {
            console.log('Error : ' + err);
        } else {
            // campground.ejs is renamed into index.ejs
            res.render('campgrounds/index', { campVar: campgroundsFromDB, currentUser: req.user });
        }
    });
});

// CREATE - add new campground
router.post('/', middleware.isLoggedIn, function (req, res) {
    // get data from form and add to campground array
    var campName = req.body.campName;
    var campImage = req.body.campImage;
    var campDes = req.body.campDescribe;
    var campAuthor = {
        id: req.user._id,
        username: req.user.username
    };
    var newCampground = { name: campName, image: campImage, description: campDes, author: campAuthor };
  
    //campgrounds.push(newCampground); Not needed because the array is gone ... now we get it from DB
    Campground.create(newCampground, function (err, newCamp) {
        if (err) {
            console.log('Error (while create new) : ' + err);
        } else {
            //console.log('Saved in DB with author : ' + newCamp);
            res.redirect('/campgrounds');  // This needs to be here because of call back
        }
    });
});

// NEW - show form to create new campground
router.get('/new', isLoggedIn,  function (req, res) {
    res.render('campgrounds/new');
});

// SHOW Template for a specific campground
router.get('/:id', function (req, res) {
    //find the campground with provided id
    // We would get the details from mongo via a method provided by mongoose
    // Campground.findById(id, callback);
    Campground.findById(req.params.id.trim()).populate('comments').exec(function (err, foundCampground) {
        //Campground.findById('5b04398d5af4ea1a2418ade8', function(err, foundCampground){

        if (err) {
            console.log('Error :' + err + " id=<" + req.params.id + ">");
        } else {
            //console.log('Details: <' + foundCampground._id + '>' + ' req.params.id<' + req.params.id.trim() + '>' );
            //console.log('campgrouds : ' + foundCampground);
            res.render('campgrounds/show', { campground: foundCampground });
        }
    });
});

// Edit Campgroud route. Here we need a form to edit. '/campground' is defined a dfault campground router root in app.js
router.get('/:id/edit', checkCampgroundOwnership, function (req, res){
    Campground.findById(req.params.id.trim(), function(err, foundCampground){
        if (err) {
            console.log('It should never come here ... unless major issues. But, err must be handled.');
        } else {
            res.render('campgrounds/edit', {campground: foundCampground});
        }
    });
});

// Check the rest document for put. /campgrounds is default router in campground router 
// Update campground route. This is where the form submits to be updated. 

router.put('/:id', checkCampgroundOwnership, function(req, res){
    
    Campground.findByIdAndUpdate(req.params.id, req.body.campground, function(err, updatedCampground){
        if (err) {
            res.redirect('/campgrounds');
        } else {
            res.redirect('/campgrounds/' + req.params.id);
        }
    });
});

// DESTROY CAMPGROUND ROUTE
router.delete('/:id', checkCampgroundOwnership, function(req, res){
    //console.log('Inside delete');
    Campground.findByIdAndRemove(req.params.id, function(err){
        if (err) {
            console.log('Deletion Error : ' + err);
        }
        res.redirect('/campgrounds');
    });
});


// ------------------------------

function checkCampgroundOwnership (req, res, next) {
    if (req.isAuthenticated()) {
        Campground.findById(req.params.id, function (err, foundCampground) {
            if (err) {
                res.redirect('back'); // takes flow back to where it came from
            } else {
                if (foundCampground.author.id.equals(req.user._id)) {
                    next();
                } else {
                    res.redirect('back');
                }
            }
        });
    }
}

function isLoggedIn(req, res, next) {
    if (req.isAuthenticated()){
        return next();
    }
    res.redirect('/login');
}

module.exports = router;