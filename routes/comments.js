var express = require('express');
var router = express.Router({mergeParams: true}); //mergeParams merge the parameters of campground and comments together of else
                                      // it will not find req.params.id that search 
                                      // campground to begin with.

var Campground  = require('../models/campground');
var Comment     = require('../models/comment');

//var middleware = require('../middleware'); //By default, if no js files are specified,
                                           // node will look for index.js in that dir.

// Comments new - going to the form
router.get('/new', isLoggedIn, function (req, res) {
    // find campfround by id
    Campground.findById(req.params.id.trim(), function (err, campground) {
        if (err) {
            console.log('Camp comment new error : ' + err);
        } else {
            res.render('comments/new', { campground: campground });
        }
    });
});

// Comments create ... store it in DB
router.post('/', isLoggedIn, function (req, res) {

    //lookup campground using ID
    Campground.findById(req.params.id.trim(), function (err, campground) {
        if (err) {
            console.log(err);
            res.redirect('/campgrounds');  // Should handle error better
        } else {
            Comment.create(req.body.comment, function (err, comment) {
                if (err) {
                    console.log(err);
                } else {
                    //console.log('comments : ' + comment);
                    // V8 - Add username and id to the comment
                    //console.log("New comment username : " + req.user.username);
                    comment.author._id = req.user._id;
                    comment.author.username = req.user.username;
                    comment.save();  // save the comment
                    // save comment into the database
                    campground.comments.push(comment);
                    campground.save();
                    res.redirect('/campgrounds/' + campground._id);
                }
            })
        }
    });
});

// for editing comments
router.get('/:commets_id/edit', function(req, res){
    //console.log('req=' + JSON.stringify(req.params) + ' commentId=' + req.params.commets_id);
    Comment.findById(req.params.commets_id, function(err, foundComment){
        if (err) {
            console.log('Err = ' + err);
            res.redirect('back');
        } else {
            //console.log('foundComment = ' + foundComment);
            res.render('comments/edit', {campground_id: req.params.id, comment: foundComment});

        }
    });
    // We would need the campground id in the comment show to extract the comment as campground + comment combo
    
});

// COMMETS UPDATE
// Should be /campgrounds/:id/comments/:comment_id
router.put('/:comments_id', checkCommentsOwnership, function(req, res){
    //console.log('req : ' +  JSON.stringify(req.params) + '  req.body.comment: ' + JSON.stringify(req.body.comment));
    //console.log('req.params.comment_id:' + req.params.comments_id + ' req.body.comment:'+req.body.comment.text);

    Comment.findByIdAndUpdate(req.params.comments_id, req.body.comment, function(err, updatedComment){
       if(err) {
            res.redirect('back');   
       } else {
            //console.log('updatedComment:' + updatedComment);
            res.redirect('/campgrounds/' + req.params.id);
       }
    });
});

// COMMENTS DESTROY ROUTE
router.delete('/:comments_id', checkCommentsOwnership, function(req, res){
    // findByIdAndRemove
    Comment.findByIdAndRemove(req.params.comments_id, function(err){
        if (err) {
            console.log('Error destroying comments :' + err);
            res.redirect('back');
        }
        // Send back to show page.
        res.redirect('/campgrounds/' + req.params.id);
    });
});


// Middleware functions
function checkCommentsOwnership(req, res, next){
    console.log('req:' + JSON.stringify(req.params));
    if(req.isAuthenticated()){
        Comment.findById(req.params.comments_id, function(err, foundComment){
            if (err) {
                console.log('Error deleting comment: ' + err);
                res.redirect('back');
            } else {
                //console.log('str=' + JSON.stringify(foundComment));
                console.log('foundComment:' + foundComment);
                console.log('foundComment.author:' + foundComment.author);
                console.log('foundComment.author.id :' + foundComment.author.id);
                console.log('foundComment.author.name :' + foundComment.author.username);
                console.log('foundComment.text :' + foundComment.text);
                //console.log('foundComment.id :' + foundComment.id);
                //console.log('req.user._id: ' + req.user._id);
                //if ( foundComment.author.id.equals(req.user._id)){
                    next();
                //} else {
                //  res.redirect('back');
                //}
            }
        });
    } else {
        res.redirect('back');
    }
}

function isLoggedIn(req, res, next) {
    if (req.isAuthenticated()){
        return next();
    }
    res.redirect('/login');
} 

module.exports = router;