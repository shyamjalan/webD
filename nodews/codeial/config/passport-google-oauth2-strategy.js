const passport = require('passport');
const googleStartegy = require('passport-google-oauth').OAuth2Strategy;
const crypto = require('crypto');
const User = require('../models/user');
const env = require('./environment');

//Tell passport to use the particular strategy for google login
passport.use(new googleStartegy({
        clientID: env.google_client_id,
        clientSecret: env.google_client_secret,
        callbackURL: env.google_callback_url
    },
    function(accessToken, refreshToken, profileInfo, done){
        //Find a User
        User.findOne({email: profileInfo.emails[0].value}).exec(function(err, user){
            if(err){
                console.log("Error in google strategy-passport",err);
                return;
            }
            // console.log(profileInfo);
            // console.log(accessToken);
            // console.log(refreshToken);
            if(user){
                // If found, set this user as request.user
                return done(null, user);
            }
            else{
                // If not found, create the user and set it as request.user
                User.create({
                    name: profileInfo.displayName,
                    email: profileInfo.emails[0].value,
                    password: crypto.randomBytes(20).toString('hex')
                }, function(err, user){
                    if(err){
                        console.log("Error in google strategy-passport",err);
                        return;
                    }
                    return done(null, user);
                });
            }
        });
    }
));

module.exports = passport;