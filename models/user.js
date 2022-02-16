var mongoose = require('mongoose');

var Schema = mongoose.Schema;

var UserSchema = new Schema({
    username: { type: String, required: true, maxLength: 100 },
    password: { type: String, required: true, maxLength: 100 },

})


// Virtual for user's URL
UserSchema
.virtual('url')
.get(function () {
  return '/user' + this._id;
});

const User = mongoose.model('User', UserSchema);

const user = new User({
    username: "User",
    password: "Password123456"
});

//Export model
exports.User = User;
exports.user = user;