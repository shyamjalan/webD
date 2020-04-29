const Like = require('../models/like');
const Comment = require('../models/comment');
const Post = require('../models/post');

module.exports.toggleLike = async function(request, response){
    try {
        //likes/toggle/?id=abcdef&type=[Post/Comment]
        let likeable;
        let deleteLike = false;
        if(request.query.type == 'Post'){
            likeable = await Post.findById(request.query.id).populate('likes');
        }
        else{
            likeable = await Comment.findById(request.query.id).populate('likes');
        }
        //check if a like already exists
        let existingLike = await Like.findOne({
           likeable: request.query.id,
            onModel: request.query.type,
            user: request.user._id
        });
        //if a like already exists then delete it
        if(existingLike){
            likeable.likes.pull(existingLike._id);
            likeable.save();
            existingLike.remove();
            deleteLike = true;
        }
        //else make a new like
        else{
            let newLike = await Like.create({
                user: request.user._id,
                likeable: request.query.id,
                onModel: request.query.type
            });
            likeable.likes.push(newLike._id);
            likeable.save();
        }
        return response.json(200, {
            message: 'Request Completed',
            data: {
                deleteLike: deleteLike
            }
        })
    } catch (error) {
        console.log('Error : ', error);
        return response.json(500, {
            message: 'Internal Server Error'
        });
    }
}