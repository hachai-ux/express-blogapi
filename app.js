require('dotenv').config()
var User = require('./models/user');
var createError = require('http-errors');
var express = require('express');
var cors = require('cors')
var path = require('path');
var cookieParser = require('cookie-parser');
var logger = require('morgan');
const passport = require('passport');
const LocalStrategy = require('passport-local').Strategy;



const passportJWT = require("passport-jwt");
const JWTStrategy = passportJWT.Strategy;
const ExtractJWT = passportJWT.ExtractJwt;



passport.use(new LocalStrategy(
    function (username, password, cb) {

//this one is typically a DB call. Assume that the returned user object is pre-formatted and ready for storing in JWT
     
  
      return User.User.findOne({username, password})
                .then(user => {
                    if (!user) {
                        return cb(null, false, {message: 'Incorrect username or password.'});
                    }
                return cb(null, user, {message: 'Logged In Successfully'});
                })
                .catch(err => cb(err));
  }));

  passport.use(new JWTStrategy({
        jwtFromRequest: ExtractJWT.fromAuthHeaderAsBearerToken(),
        secretOrKey : 'your_jwt_secret'
    },
    function (jwtPayload, cb) {

        //find the user in db if needed. This functionality may be omitted if you store everything you'll need in JWT payload.
        return User.User.findOneById(jwtPayload.id)
            .then(user => {
                return cb(null, user);
            })
            .catch(err => {
                return cb(err);
            });
    }
));

var indexRouter = require('./routes/index');
var postsRouter = require('./routes/posts');
var commentsRouter = require('./routes/comments');
var usersRouter = require('./routes/users');
var loginRouter = require('./routes/login');

var app = express();

//Set up mongoose connection
var mongoose = require('mongoose');
var mongoDB = process.env.MONGODB_URI;
mongoose.connect(mongoDB, { useNewUrlParser: true , useUnifiedTopology: true});
var db = mongoose.connection;
db.on('error', console.error.bind(console, 'MongoDB connection error:'));



// view engine setup
app.set('views', path.join(__dirname, 'views'));
app.set('view engine', 'pug');

app.use(cors());
app.use(logger('dev'));
app.use(express.json());
app.use(express.urlencoded({ extended: false }));
app.use(cookieParser());
app.use(express.static(path.join(__dirname, 'public')));

app.use('/', indexRouter);
app.use('/api/login', loginRouter);
app.use('/api/posts',postsRouter);
app.use('/api/posts/:postid/comments',commentsRouter);
app.use('/users', passport.authenticate('jwt', {session: false}), usersRouter);



// catch 404 and forward to error handler
app.use(function(req, res, next) {
  next(createError(404));
});

// error handler
app.use(function(err, req, res, next) {
  // set locals, only providing error in development
  res.locals.message = err.message;
  res.locals.error = req.app.get('env') === 'development' ? err : {};

  // render the error page
  res.status(err.status || 500);
  res.render('error');
});

exports.app = app;
exports.db = db;