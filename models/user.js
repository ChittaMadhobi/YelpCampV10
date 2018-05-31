var mongoose                = require('mongoose');
var passportLocalMongooes   = require('passport-local-mongoose');

var UserSchema = new mongoose.Schema({
    username:   String,
    password:   String
});
// UserSchema is associated with passport-local-mongoose
UserSchema.plugin(passportLocalMongooes);
// The UserSchema is exported for use elsewhere
module.exports = mongoose.model('User', UserSchema);