// All the middleware goes here.


var middlewareObj = {};

middlewareObj.checkCampgroundOwnership = function (req, res, next) {
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




/* middlewareObj.checkCommentOwnership = function (req, res, next) {
    if (req.isAuthenticated()){
        Comment.findById(req.params.comment_id, function(err, foundComment){
            if(err){
                console.log('Comment.findById Err: ' + err);
                res.redirect('back');
            } else {
                console.log('foundComment.author.id='+foundComment.author.id + ' | req.user._id=' +req.user._id);
                if(foundComment.author.id.equals(req.user._id)){
                    next();
                } else {
                    res.redirect('back');
                }
        });
    } else {
       res.redirect('back'); 
    }
}  */

middlewareObj.isLoggedIn = function(req, res, next) {
    if (req.isAuthenticated()){
        return next();
    }
    res.redirect('/login');
}


module.export = middlewareObj; 