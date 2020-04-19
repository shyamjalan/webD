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
                    let newPost = newPostDom(data.data.post);
                    $('#posts-list-container>ul').prepend(newPost);
                    //It's required to call deletePost as by default it won't get called until page is reloaded
                    deletePost($(' .delete-post-button',newPost));
                    newPostForm[0].reset();
                    createComment($(' .new-comment-form',newPost));
                    showNoty('success','Post Published!');
                },
                error: function(error){
                    showNoty('error', error.responseText);
                    console.log(error.responseText);
                }
            });
        });
    }

    //Method to create a post in DOM
    let newPostDom = function(post){
        return $(`<li id = 'post-${post._id}'>
        <p>
            ${post.content}
            <a class = 'delete-post-button' href="/posts/destroy/${post._id}"><i class="fas fa-times-circle"></i></a>
            <br> 
            <small>
                ${post.user.name}
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
                    showNoty('error', error.responseText);
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
                    let newComment = newCommentDom(data.data.comment);
                    $(`#post-comments-${data.data.comment.post._id}`).append(newComment);
                    deleteComment($(' .delete-comment-button',newComment));
                    commentForm[0].reset();
                    showNoty('success', 'Comment Added!');
                },
                error: function(error){
                    showNoty('error', error.responseText);
                    console.log(error.responseText);
                }
            });
        });
    }

    let newCommentDom = function(comment){
        return $(`<li id = 'comment-${comment._id}'>
        <p>
            ${comment.content}
            <a class = 'delete-comment-button' href="/comments/destroy/?id=${comment._id}&postUserId=${comment.post.user}"><i class="fas fa-times-circle"></i></a>
            <br>
            <small>
                ${comment.user.name}
            </small>
        </p>
    </li>`);
    }

    let deleteComment = function(deleteLink){
        $(deleteLink).click(function(e){
            e.preventDefault();

            $.ajax({
                type: 'get',
                url: $(deleteLink).prop('href'),
                success: function(data){
                    $(`#comment-${data.data.comment_id}`).remove();
                    showNoty('success','Comment Deleted!');
                },error: function(error){
                    showNoty('error', error.responseText);
                    console.log(error.responseText);
                }
            });

        });
    }

    createPost();

    $('.delete-post-button').each(function(){
        deletePost($(this));
    });

    $('.new-comment-form').each(function(){
        createComment($(this));
    });

    $('.delete-comment-button').each(function(){
        deleteComment($(this));
    });
}