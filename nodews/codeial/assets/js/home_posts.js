{
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
                },
                error: function(error){
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


    createPost();
}