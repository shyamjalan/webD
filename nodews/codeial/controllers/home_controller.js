const Post = require('../models/post');
const User = require('../models/user');

module.exports.home = async function (request, response) {
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

    try{
        let posts = await Post.find({})
        .sort('-createdAt')
        .populate('user')
        .populate({
            path: 'comments',
            populate: {
                path: 'user'
            }
        });

        let users = await User.find({});

        return response.render('home', {
            title: "Codeial | Home",
            posts : posts,
            all_users : users
        });
    }catch(err){
        request.flash('error', err);
        console.log('Error ',err);
        return response.redirect('back');
    }
    
}

// module.exports.actionName = function(request,response){}