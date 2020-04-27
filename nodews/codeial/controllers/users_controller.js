const User = require('../models/user');
const fs = require('fs');
const path = require('path');
const crypto = require('crypto');
const Token = require('../models/reset_password_token');
const resetPassEmailWorker = require('../workers/reset_pass_email_worker');
const queue = require('../config/kue');

module.exports.profile = function (request, response) {
    User.findById(request.params.id, function(err, user){
        if(err){
            request.flash('error', err)
            console.log('Error ',err);
            return response.redirect('back');
        }
        return response.render('users',{
            title: 'User Profile',
            profile_user: user
        });
    });
}

module.exports.update = async function(request, response){
    if(request.user.id == request.params.id){
        try {
            let user = await User.findById(request.params.id);
            //Without Multer we can't read the request body as it is multipart enctype
            User.uploadedAvatar(request, response, function(err){
                if(err){
                    request.flash('*****Multer Error*****', err)
                    console.log('*****Multer Error*****', err);
                    return response.redirect('back');
                }
                // console.log(request.file);
                user.name = request.body.name;
                user.email = request.body.email;
                if(request.file){
                    //If an avatar is already present, delete it
                    if(user.avatar){
                        try {
                            if (fs.existsSync(path.join(__dirname,'..', user.avatar))) {
                                fs.unlinkSync(path.join(__dirname,'..', user.avatar));
                            }
                        } catch(err) {
                            console.error(err)
                        }
                    }
                    //this is saving the path of the uploaded file into the avatar field in the user
                    user.avatar = User.avatarPath + '/' + request.file.filename;
                }
                user.save();
                request.flash('success', 'User Details Updated!')
                return response.redirect('back');
            })
        } catch (error) {
            request.flash('error', error);
            console.log('Error ',error);
            return response.redirect('back');
        }
    }else{
        return response.status(401).send('Unauthorized');
    }
}

//Render the sign up page
module.exports.signUp = function(request, response) {
    if(request.isAuthenticated()){
        request.flash('error', 'Sign out to access the Sign-Up page');
        return response.redirect('/');
    }
    return response.render('user_sign_up', {
        title : 'Codeial | Sign Up'
    })
}

//Render the sign in page
module.exports.signIn = function(request, response) {
    if(request.isAuthenticated()){
        request.flash('error', 'You are already signed in!');
        return response.redirect('/');
    }
    return response.render('user_sign_in', {
        title : 'Codeial | Sign In'
    })
}

//get the sign up data
module.exports.create = function(request,response){
    if(request.body.password != request.body.confirm_password){
        request.flash('error', 'Passwords do not match!');
        return response.redirect('back');
    }
    User.findOne({email: request.body.email}, function(err, user){
        if(err){
            request.flash('error', 'Error in finding existing user while signing up');
            console.log('Error ',err);
            return response.redirect('back');
        }
        if(!user){
            User.create(request.body, function(err,user){
                if(err){
                    request.flash('error', 'Error in creating user while signing up');
                    console.log('Error ',err);
                    return response.redirect('back');
                }
                request.flash('success', 'User Created!')
                return response.redirect('/users/sign-in');
            })
        }
        else{
            request.flash('error', 'User with given email already exists!');
            return response.redirect('back');
        }
    })
}

//sign in and create a session for the user
module.exports.createSession = function(request,response){
    request.flash('success', 'Logged In Successfully');
    return response.redirect('/');
}

module.exports.destroySession = function(request,response){
    request.logout();
    request.flash('success', 'You are Logged Out');
    return response.redirect('/');
}

module.exports.resetPassword = async function(request, response){
    if(request.isAuthenticated()){
        request.flash('error', 'You are already signed in!');
        return response.redirect('/');
    }
    let accessToken = request.query.accessToken;
    if(accessToken){
        try{
            let token = await Token.findOne({accessToken : accessToken});
            if(!token){
                request.flash('error', 'Wrong or expired access token provided.');
                return response.redirect('/users/reset-password')
            }
            if(!token.isValid){
                request.flash('error', 'Access token invalid.');
                return response.redirect('/users/reset-password')
            }
            return response.render('final_reset_password', {
                title : 'Codeial | Reset Password',
                accessToken : accessToken
            });
        } catch (error) {
            request.flash('error', error);
            console.log('Error ',error);
            return response.redirect('back');
        }
    }
    return response.render('user_reset_password', {
        title : 'Codeial | Reset Password'
    });
}

module.exports.findUserAndReset = async function(request,response){
    try{
        let accessToken = request.query.accessToken;
        if(accessToken){
            let token = await Token.findOne({accessToken : accessToken});
            if(!token){
                request.flash('error', 'Wrong or expired access token provided.');
                return response.redirect('/users/reset-password')
            }
            if(!token.isValid){
                request.flash('error', 'Access token invalid.');
                return response.redirect('/users/reset-password')
            }
            if(request.body.password != request.body.confirm_password){
                request.flash('error', 'Passwords do not match!');
                return response.redirect('back');
            }
            token.populate('user', '_id').execPopulate();
            let user = await User.findById(token.user._id);
            user.password = request.body.password;
            user.save();
            token.isValid = false;
            token.save();
            request.flash('success', 'User Password Reset!')
            return response.redirect('/users/sign-in');
        }
        let user = await User.findOne({email: request.body.email});
        if(!user){
            request.flash('error', 'There is no user registered with given email id.');
            return response.redirect('back');
        }
        else{
            let token = await Token.findOne({user: user.id});
            if(!token){
                token = await Token.create({
                    user: user.id,
                    accessToken: crypto.randomBytes(20).toString('hex'),
                    isValid: true
                });
                request.flash('success','Token Generated and sent to your Email ID.');
            }
            else if(token.isValid){
                request.flash('success','Token resent to your Email ID.');
            }
            else{
                token.accessToken = crypto.randomBytes(20).toString('hex');
                token.isValid = true;
                token.expireAt = new Date();
                token.save();
                request.flash('success','Token Updated and sent to your Email ID.');
            }
            token = await token.populate('user', ['name', 'email']).execPopulate();
            let job = queue.create('reset-emails', token).save(function(err){
                if(err){
                    console.log('Error in creating queue job : ', err);
                    return;
                }
                console.log('Job Enqueued! - ',job.id);
            });
            return response.redirect('back');
        }
    } catch (error) {
        request.flash('error', error);
        console.log('Error ',error);
        return response.redirect('back');
    }
}