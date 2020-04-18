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
        <div id = 'post-comments'>
            <form action="/comments/create" id = "new-comment-form" method = "POST">
                <textarea name="content" cols="30" rows="1" placeholder="Add your comment..." required></textarea>
                <input type="hidden" name="post" value="${post._id}">
                <input type="submit" value="Comment">
            </form>
        </div>
    </li>`)
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

    $('.delete-post-button').each(function(){
        deletePost($(this));
    });

    createPost();
}