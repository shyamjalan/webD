const Post = require('../models/post');
const User = require('../models/user');

module.exports.home = function (request, response) {
    // console.log(request.cookies);
    // response.cookie('user_id', 25);

    // Show all the posts in the db
    // Post.find({}, function(err, posts){
    //     if(err){
    //         console.log('Error in fetching posts!');
    //         return;
    //     }
    //     return response.render('home', {
    //         title: "Codeial | Home",
    //         posts : posts
    //     });
    // });

    // Show all the posts along with user data from db
    Post.find({})
    .populate('user')
    .populate({
        path: 'comments',
        populate: {
            path: 'user'
        }
    })
    .exec(function(err,posts){
        if(err){
            console.log('Error in fetching posts!');
            return;
        }
        User.find({}, function (err, users) {
            if(err){
                console.log('Error in funding all users');
                return;
            }
            return response.render('home', {
                title: "Codeial | Home",
                posts : posts,
                all_users : users
            });
        })
        
    });
}

// module.exports.actionName = function(request,response){}