var Post = require('../models/post');
var Comment = require('../models/comment');
const { body, validationResult } = require('express-validator');

exports.posts_get = function (req, res, next) {
    //Get all posts
    Post.find()
        .populate('comment')
        .exec(function (err, posts) {
            if (err) { return next(err); }
            //Successful, so send JSON
            res.json(posts);
        })
}

exports.post_get = function (req, res, next) {
     Post.findById(req.params.postid)
        .exec(function (err, post) {
            if (err) { return next(err); }
            //Successful, so render
            res.json(post);
        });
}

exports.post_post = [

    // Validate and sanitise fields.
    body('title', 'Title must be specified').trim().isLength({ min: 1 }).escape(),
    body('text', 'Text must be specified').trim().isLength({ min: 1 }).escape(),
    body('user', 'User must be specified').trim().isLength({ min: 1 }).escape(),

    // Process request after validation and sanitization.
    (req, res, next) => {

        // Extract the validation errors from a request.
        const errors = validationResult(req);

        // Create a BookInstance object with escaped and trimmed data.
        var postinstance = new PostInstance(
          { title: req.body.title,
            timestamp: Date.now(),
            text: req.body.text,
            user: req.body.user,
            comment: {},
            state: 'unpublished'
           });

        if (!errors.isEmpty()) {
            // There are errors. Post error messages
                    res.json(errors);
        }
        else {
       
            postinstance.save(function (err) {
                if (err) { return next(err); }
                   //successful
                   res.send('Post created in DB');
                });
        }
    }
];

};

exports.post_update = function (req, res, next) {
    res.send('Update Post');;
};

exports.post_delete = function (req, res, next) {
    res.send('Delete Post');;
};