var mongoose = require('mongoose');

var Schema = mongoose.Schema;

var PostSchema = new Schema({
    title: { type: String, required: true, maxLength: 100 },
    timestamp: { type: Date, default: Date.now},
    text: { type: String, required: true, maxLength: 2000 },
    user: { type: Schema.Types.ObjectId, required: true, ref: 'User' },
    comment: { type: Schema.Types.ObjectId, required: true, ref: 'Comment' },
    state: { type: String, required: true, enum: ['unpublished', 'published'] }

})


// Virtual for message's URL
PostSchema
.virtual('url')
.get(function () {
  return '/posts/' + this._id;
});

//Export model
module.exports = mongoose.model('Post', PostSchema);