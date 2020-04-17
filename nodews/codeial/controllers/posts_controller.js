const Post = require('../models/post');
const Comment = require('../models/comment');

module.exports.create = async function(request,response){
    try{
        await Post.create({
            content : request.body.content,
            user : request.user._id
        });
        request.flash('success', 'Post Published!')
        return response.redirect('back');
    }
    catch(err){
        request.flash('error', err);
        console.log('Error ',err);
        return response.redirect('back');
    }
}


    module.exports.destroy = async function(request,response){
    try{
        let post = await Post.findById(request.params.id);

        //.id means converting the object id into string
        if(post.user == request.user.id){
            post.remove();
            await Comment.deleteMany({post : request.params.id});
            request.flash('success', 'Post and associated comments deleted!')
        } else {
            request.flash('error', 'You cannot delete this post!')
        }
        return response.redirect('back');
    }
    catch(err){
        request.flash('error', err);
        console.log('Error ',err);
        return response.redirect('back');
    } 
}
