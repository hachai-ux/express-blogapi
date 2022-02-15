var express = require('express');
var router = express.Router();
var comment_controller = require('../controllers/commentController');

/* GET users listing. */
router.get('/', comment_controller.comments_get);

router.get('/:commentid', comment_controller.comment_get);

router.post('/', comment_controller.comment_post);

router.put('/:commentid', comment_controller.comment_update);

router.delete('/:commentid', comment_controller.comment_delete);

module.exports = router;
