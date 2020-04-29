const Comment = require('../models/comment');
const Post = require('../models/post');
const Like = require('../models/like');
const commentEmailWorker = require('../workers/comment_email_worker');
const queue = require('../config/kue');

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
            // if we want to populate just the name of the user (we'll not want to send the password in the API), this is how we do it!
            comment = await comment.populate('user', ['name', 'email']).populate('post', 'user').execPopulate();
            let job = queue.create('emails', comment).save(function(err){
                if(err){
                    console.log('Error in creating queue job : ', err);
                    return;
                }
                console.log('Job Enqueued! - ',job.id);
            });
            if(request.xhr){
                return response.status(200).json({
                    data: {
                        comment: comment
                    },
                    message: "Comment Created!"
                });
            }
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
            await Like.deleteMany({likeable: comment._id, onModel: 'Comment'});
            // send the comment id which was deleted back to the views
            if (request.xhr){
                return response.status(200).json({
                    data: {
                        comment_id: request.query.id
                    },
                    message: "Comment Deleted!"
                });
            }
        }
        request.flash('error', 'Unauthorized!')
        return response.redirect('back');
    }
    catch(err){
        request.flash('error', err);
        console.log('Error ',err);
        return response.redirect('back');
    }
}