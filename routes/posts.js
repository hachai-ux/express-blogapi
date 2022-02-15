var express = require('express');
var router = express.Router();
var post_controller = require('../controllers/postController');

/* GET users listing. */
router.get('/', post_controller.posts_get);

router.get('/:postid', post_controller.post_get);

router.post('/', post_controller.post_post);

router.put('/:postid', post_controller.post_update);

router.delete('/:postid', post_controller.post_delete);

module.exports = router;
