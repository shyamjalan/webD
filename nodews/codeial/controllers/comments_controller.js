const Comment = require('../models/comment');
const Post = require('../models/post');

module.exports.create = async function(request,response){
    try{
        let post = await Post.findById(request.body.post);

        if(post){
            let comment = await Comment.create({
                content: request.body.content,
                post: request.body.post,
                user: request.user._id
            });
            post.comments.push(comment);
            post.save();
            request.flash('success', 'Comment Added!')
            return response.redirect('back');
        }
        else{
            request.flash('error', 'Post not found!');
            return response.redirect('back');
        }
    }
    catch(err){
        request.flash('error', err);
        console.log('Error ',err);
        return response.redirect('back');
    }
}

module.exports.destroy = async function(request,response){
    try{
        let postUserId = request.query.postUserId;
        let comment = await Comment.findById(request.query.id);
        if(comment.user == request.user.id || postUserId == request.user.id){
            let postId = comment.post;
            comment.remove();
            let post = await Post.findByIdAndUpdate(postId, {$pull: {comments: request.query.id}});
        }
        request.flash('success', 'Comment Deleted!')
        return response.redirect('back');
    }
    catch(err){
        request.flash('error', err);
        console.log('Error ',err);
        return response.redirect('back');
    }
}