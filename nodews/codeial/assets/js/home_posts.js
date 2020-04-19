{
    let showNoty = function(type,message){
        new Noty({
            theme: 'bootstrap-v4',
            text: message,
            type: type,
            timeout: 1500
        }).show();
    }

    //Method to submit the form data for new post using AJAX
    let createPost = function(){
        let newPostForm = $('#new-post-form');
        newPostForm.submit(function(e){
            e.preventDefault();
            $.ajax({
                type: 'post',
                url: '/posts/create',
                data: newPostForm.serialize(),
                success: function(data){
                    let newPost = newPostDom(data.data.post, data.data.user_name);
                    $('#posts-list-container>ul').prepend(newPost);
                    //It's required to call deletePost as by default it won't get called until page is reloaded
                    deletePost($(' .delete-post-button',newPost));
                    $('#new-post-form')[0].reset();
                    createComment($(' .new-comment-form',newPost));
                    showNoty('success','Post Published!');
                },
                error: function(error){
                    showNoty('error', err);
                    console.log(error.responseText);
                }
            });
        });
    }

    //Method to create a post in DOM
    let newPostDom = function(post, username){
        return $(`<li id = 'post-${post._id}'>
        <p>
            ${post.content}
            <a class = 'delete-post-button' href="/posts/destroy/${post._id}"><i class="fas fa-times-circle"></i></a>
            <br> 
            <small>
                ${username}
            </small>
        </p>
        <div class = 'post-comments'>
            <div class = 'comments-list'>
                <ul id = 'post-comments-${post._id}'>
                </ul>
            </div>
            <form class = "new-comment-form">
                <textarea name="content" cols="30" rows="1" placeholder="Add your comment..." required></textarea>
                <input type="hidden" name="post" value="${post._id}">
                <input type="hidden" name="post_user_id" value="${post.user}">
                <input type="submit" value="Comment">
            </form>
        </div>
    </li>`);
    }

    //Method to delete a post from DOM
    let deletePost = function(deleteLink){
        $(deleteLink).click(function(e){
            e.preventDefault();
            $.ajax({
                type: 'get',
                url: $(deleteLink).prop('href'),
                success: function(data){
                    $(`#post-${data.data.post_id}`).remove();
                    showNoty('success','Post and associated comments deleted!');
                },
                error: function(error){
                    showNoty('error', err);
                    console.log(error.responseText);
                }
            });
        });
    }

    //Method to submit the form data for new comment using AJAX
    let createComment = function(commentForm){
        commentForm.submit(function(e){
            e.preventDefault();
            $.ajax({
                type: 'post',
                url: '/comments/create',
                data: commentForm.serialize(),
                success: function(data){
                    let newComment = newCommentDom(data.data.comment, data.data.comment_user_name, data.data.post_user_id);
                    $(`#post-comments-${data.data.post_id}`).append(newComment);
                    commentForm[0].reset();
                    showNoty('success', 'Comment Added!');
                },
                error: function(error){
                    showNoty('error', err);
                    console.log(error.responseText);
                }
            });
        });
    }

    let newCommentDom = function(comment, comment_user_name, post_user_id){
        return $(`<li>
        <p>
            ${comment.content}
            <a href="/comments/destroy/?id=${comment._id}&postUserId=${post_user_id}"><i class="fas fa-times-circle"></i></a>
            <br>
            <small>
                ${comment_user_name}
            </small>
        </p>
    </li>`);
    }

    createPost();

    $('.delete-post-button').each(function(){
        deletePost($(this));
    });

    $('.new-comment-form').each(function(){
        createComment($(this));
    });
}