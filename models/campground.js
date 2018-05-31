var mongoose   = require('mongoose');
//var Comment    = require('./comment');

var campgroundSchame = new mongoose.Schema ({
    name:   String,
    image:  String,
    description: String,
    author: { 
        id: {
            type: mongoose.Schema.Types.ObjectId,
            Ref:  'User'
        },
        username: String 
    },
    comments: [
        {
            type: mongoose.Schema.Types.ObjectId,
            ref:  'Comment'
        }
    ]
});
// Convert Schema into Model

module.exports = mongoose.model("Campground", campgroundSchame);
