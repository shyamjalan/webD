const User = require('../models/user');

module.exports.profile = function (request, response) {
    if(request.cookies.user_id){
        User.findById(request.cookies.user_id, function(err, user){
            if(err){
                console.log('Error in finding user in Profile loading ',err);
                return;
            }
            if(user){
                return response.render('users',{
                    title: 'User Profile',
                    user: user
                });
            }
            else{
                return response.redirect('/users/sign-in');
            }
        });
    }
    else{
        return response.redirect('/users/sign-in');
    }
}

//Render the sign up page
module.exports.signUp = function(request, response) {
    return response.render('user_sign_up', {
        title : 'Codeial | Sign Up'
    });
}

//Render the sign in page
module.exports.signIn = function(request, response) {
    return response.render('user_sign_in', {
        title : 'Codeial | Sign In'
    });
}

//get the sign up data
module.exports.create = function(request,response){
    if(request.body.password != request.body.confirm_password){
        return response.redirect('back');
    }
    User.findOne({email: request.body.email}, function(err, user){
        if(err){
            console.log('Error in finding user in signing up ',err);
            return;
        }
        if(!user){
            User.create(request.body, function(err,user){
                if(err){
                    console.log('Error in creating user while signing up ',err);
                    return;
                }
                return response.redirect('/users/sign-in');
            })
        }
        else{
            return response.redirect('back');
        }
    })
}

//sign in and create a session for the user
module.exports.createSession = function(request,response){
    //find the user
    User.findOne({email : request.body.email}, function(err, user){
        if(err){
            console.log('Error in finding user in signing in ',err);
            return;
        }
        //handle user found
        if(user){
            //handle password which don't match
            if(user.password != request.body.password){
                return response.redirect('back');
            }
            //handle session creation
            response.cookie('user_id', user.id);
            return response.redirect('/users/profile');
        }
        else{
        //handle user not found
        return response.redirect('back');
        }
    });   
}

module.exports.deleteSession = function(request,response){
    response.clearCookie('user_id');
    return response.redirect('/users/sign-in');
}