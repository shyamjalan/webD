const User = require('../models/user');

module.exports.profile = function (request, response) {
    response.render('users',{
        title: 'Profile'
    })
}

//Render the sign up page
module.exports.signUp = function(request, response) {
    return response.render('user_sign_up', {
        title : 'Codeial | Sign Up'
    })
}

//Render the sign in page
module.exports.signIn = function(request, response) {
    return response.render('user_sign_in', {
        title : 'Codeial | Sign In'
    })
}

//get the sign up data
module.exports.create = function(request,response){
    if(request.body.password != request.body.confirm_password){
        return response.redirect('back');
    }
    User.findOne({email: request.body.email}, function(err, user){
        if(err){
            console.log('Error in finding user in signing up');
            return;
        }
        if(!user){
            User.create(request.body, function(err,user){
                if(err){
                    console.log('Error in creating user while signing up');
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
    return response.redirect('/users/profile');
}