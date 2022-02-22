var express = require('express');
var router = express.Router();
var passport = require('passport');
const jwt = require('jsonwebtoken');

router.post('/', function(req, res, next) {
  
    passport.authenticate('local', { session: false }, (err, user, info) => {
      
    console.log(err);
      console.log(user);
      console.log(info);

        if (err || !user) {
            return res.status(400).json({
                message: 'Something is not right',
                user : user
            });
        }

        req.login(user, {session: false}, (err) => {
           if (err) {
               res.send(err);
           }

// generate a signed son web token with the contents of user object and return it in the response

        const token = jwt.sign(user.toJSON(), 'your_jwt_secret');
                  return res.json({user, token});
                });
  })(req, res);
});


module.exports = router;
