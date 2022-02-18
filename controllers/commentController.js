var Post = require('../models/post');
var Comment = require('../models/comment');
const { body, validationResult } = require('express-validator');

exports.comments_get = function (req, res, next) {
    //get all comments of a post
    Comment.find({ 'post': req.params.postid })
        .exec(function (err, comments) {
            if (err) { return next(err); }
            //Successful, so send JSON
            return res.json(comments);
        })

}

exports.comment_get = function (req, res, next) {
    Comment.findById(req.params.commentid)
        .exec(function (err, comment) {
            if (err) { return next(err); }
            //Successful, so render
            return res.json(comment);
        });
}

exports.comment_post = [

    // Validate and sanitise fields.
    body('name', 'Name must be specified').trim().isLength({ min: 1 }).escape(),
    body('text', 'Text must be specified').trim().isLength({ min: 1 }).escape(),

    // Process request after validation and sanitization.
    (req, res, next) => {

        // Extract the validation errors from a request.
        const errors = validationResult(req);
        console.log(req.params.postid);
        // Create a BookInstance object with escaped and trimmed data.
        var comment = new Comment(
            {
                name: req.body.name,
                timestamp: Date.now(),
                text: req.body.text,
                post: req.params.postid,
            });

        if (!errors.isEmpty()) {
            // There are errors. Post error messages
            return res.json(errors);
        }
        else {
       
            comment.save(function (err) {
                if (err) { return next(err); }
                //successful
                return res.json(comment);
            });
        }
    }
];

exports.comment_update = [

     
    // Validate and sanitise fields.
    body('name', 'Name must be specified').trim().isLength({ min: 1 }).escape(),
    body('text', 'Text must be specified').trim().isLength({ min: 1 }).escape(),


    // Process request after validation and sanitization.
    (req, res, next) => {

        // Extract the validation errors from a request.
        const errors = validationResult(req);

    
        var comment = 
          { text: req.body.text,
           };

        if (!errors.isEmpty()) {
            // There are errors. Post error messages
                    return res.json(errors);
        }
        else {
       
            Comment.findByIdAndUpdate(req.params.commentid, comment, {}, function (err, thecomment) {
                if (err) { return next(err); }
                   //successful
                   return res.json(comment);
                });
        }
    }
];


exports.comment_delete = function (req, res, next) {
    Comment.findByIdAndRemove(req.params.commentid, function deleteComment(err) {
        if (err) { return next(err); }
                    
            
    });
    return res.json({deleted: req.params.commentid});
};