var Post = require('../models/post');
var Comment = require('../models/comment');
const { body, validationResult } = require('express-validator');

exports.posts_get = function (req, res, next) {
    res.send('Get Posts');
}

exports.post_get = function (req, res, next) {
    res.send('Get Post');
}

exports.post_post = function (req, res, next) {
    res.send('Send Post');;
};

exports.post_update = function (req, res, next) {
    res.send('Update Post');;
};

exports.post_delete = function (req, res, next) {
    res.send('Delete Post');;
};