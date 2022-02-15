var mongoose = require('mongoose');

var Schema = mongoose.Schema;

var CommentSchema = new Schema({
    timestamp: { type: Date, default: Date.now},
    text: { type: String, required: true, maxLength: 500 },
    name: { type: String, required: true, maxLength: 50 },

})

// Virtual for URL
CommentSchema
.virtual('url')
.get(function () {
  return '/comments/' + this._id;
});



//Export model
module.exports = mongoose.model('Comment', CommentSchema);