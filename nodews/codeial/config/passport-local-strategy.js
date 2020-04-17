const passport = require('passport');

const LocalStrategy = require('passport-local').Strategy;
const User = require('../models/user');

//Authentication using passport
passport.use(new LocalStrategy({
       usernameField: 'email',
       passReqToCallback: true
    },
    function(request, email, password, done){
        //Find a user and establish identity
        User.findOne({email: email}, function(err, user){
            if(err){
                request.flash('error', err);
                console.log('Error ',err);
                return done(err);
            }
            if(!user || user.password != password){
                request.flash('error', 'Invalid Username/Password');
                return done(null,false);
            }
            return done(null, user);
        });
    }
));

//Seializing the user to decide which key is to be kept in the cookies
passport.serializeUser(function(user, done){
    done(null,user.id);
});

//Deserializing the user from the key in the cookies
passport.deserializeUser(function(id, done){
    User.findById(id, function(err, user){
        if(err){
            request.flash('error', 'Error in finding user --> Passport');
            console.log('Error ',err);
            return done(err);
        }
        return done(null, user);
    });
});

//check if the user is authenticated
passport.checkAuthentication = function(request, response, next){
    //if user is signed in, pass on the request to the next function (controller's action)
    if(request.isAuthenticated()){
        return next();
    }
    // if the user is not signed in
    return response.redirect('/users/sign-in');
}

passport.setAuthenticatedUser = function(request, response, next){
    if(request.isAuthenticated()){
        //request.user contains the current sign-in user from the session cookie, we are just sending it to the locals for the views
        response.locals.user = request.user;
    }
    next()
}

module.exports = passport;