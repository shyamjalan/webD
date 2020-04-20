const User = require('../models/user');
const fs = require('fs');
const path = require('path');

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