const Comment = require('../models/comment');
const Post = require('../models/post');

module.exports.create = function(request,response){
    Post.findById(request.body.post, function(err, post){
        if(err){
            console.log('Error in finding the post to comment');
            return;
        }
        if(post){
            Comment.create({
                content: request.body.content,
                post: request.body.post,
                user: request.user._id
            }, function(err, comment){
                if(err){
                    console.log('Error in creating a comment');
                    return;
                }
                post.comments.push(comment);
                post.save();
                return response.redirect('back');
            });
        }
    });
}

module.exports.destroy = function(request,response){
    Comment.findById(request.query.id, function(err, comment){
        if(err){
            console.log('Error in finding the comment to delete.');
            return;
        }
        let postUserId = request.query.postUserId;
        if(comment.user == request.user.id || postUserId == request.user.id){
            let postId = comment.post;
            comment.remove();
            Post.findByIdAndUpdate(postId, {$pull: {comments: request.query.id}}, function(err,post){
                if(err){
                    console.log('Error in finding the post on which comment is done.');
                }
                return response.redirect('back');
            });
        }
        else{
            return response.redirect('back');
        }
    });
}