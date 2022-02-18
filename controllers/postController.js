var Post = require('../models/post');
var Comment = require('../models/comment');
const { body, validationResult } = require('express-validator');
const App = require('../app');
//const db = App.db; doesnt't work for some reason

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

    // Process request after validation and sanitization.
    (req, res, next) => {

        console.log(req.me);
        // Extract the validation errors from a request.
        const errors = validationResult(req);

        // Create a BookInstance object with escaped and trimmed data.
        var post = new Post(
          { title: req.body.title,
            timestamp: Date.now(),
            text: req.body.text,
            user: req.me,
            state: 'unpublished'
           });

        if (!errors.isEmpty()) {
            // There are errors. Post error messages
                    res.json(errors);
        }
        else {
       
            post.save(function (err) {
                if (err) { return next(err); }
                   //successful
                   res.json(post);
                });
        }
    }
];



exports.post_update =  [

     
    // Validate and sanitise fields.
    body('title', 'Title must be specified').trim().isLength({ min: 1 }).escape(),
    body('text', 'Text must be specified').trim().isLength({ min: 1 }).escape(),
    body('state', 'State must "published" or "unpublished"').custom((value)=> (value === "unpublished") || (value === "published")).trim().isLength({ min: 1 }).escape(),

    // Process request after validation and sanitization.
    (req, res, next) => {
           console.log(req.params.postid);
        console.log(req.me);
        // Extract the validation errors from a request.
        const errors = validationResult(req);

    
        var post = 
          { title: req.body.title,
            timestamp: Date.now(),
            text: req.body.text,
            user: req.me,
            state: req.body.state
           };

        if (!errors.isEmpty()) {
            // There are errors. Post error messages
                    res.json(errors);
        }
        else {
       
            Post.findByIdAndUpdate(req.params.postid, post, {}, function (err, thepost) {
                if (err) { return next(err); }
                   //successful
                   res.json('post');
                });
        }
    }
];


//Delete post and it's comments
exports.post_delete = async function (req, res, next) {
    //Use transaction to reverse if if either deleting posts or comments fails
    //Use deletemany to delete all comments
    //use req.params.postid, not req.body.postid



    async function deletePostAndComments() {

        try {
            
            const session = await App.db.startSession();
            await session.withTransaction(async () => {
                Post.findByIdAndRemove(req.params.postid, function deletePost(err) {
                    if (err) { return next(err); }
                    
            
                })

                console.log(req.params.postid);
                await Comment.deleteMany({ 'post': req.params.postid });
            });
            session.endSession();
            res.json({ deleted: req.params.postid});
        }
        catch (error) {
            res.json(error);
        }
    }
    deletePostAndComments();
      
}
