var express = require('express');
var router = express.Router({ mergeParams: true });
var post_controller = require('../controllers/postController');
var User = require('../models/user');
const passport = require('passport');

//Pseudo authenticated user
router.use((req, res, next) => {
  req.me = User.user;
  next();
});

/* GET users listing. */
router.get('/', post_controller.posts_get);

router.get('/:postid', post_controller.post_get);

router.post('/', passport.authenticate('jwt', {session: false}), post_controller.post_post);

router.put('/:postid', passport.authenticate('jwt', {session: false}), post_controller.post_update);

router.delete('/:postid', passport.authenticate('jwt', {session: false}), post_controller.post_delete);

module.exports = router;
