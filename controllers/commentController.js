var Post = require('../models/post');
var Comment = require('../models/comment');
const { body, validationResult } = require('express-validator');

exports.comments_get = function (req, res, next) {
    //get all comments of a post
    Post.findById(req.params.id)
        .populate('comment')
        .exec(function (err, post) {
            if (err) { return next(err); }
            //Successful, so send JSON
            res.json(post);
        })

}

exports.comment_get = function (req, res, next) {
    res.send('Get Comment');
}

exports.comment_post = function (req, res, next) {
    res.send('Send Comment');;
};

exports.comment_update = function (req, res, next) {
    res.send('Update Comment');;
};

exports.comment_delete = function (req, res, next) {
    res.send('Delete Comment');;
};