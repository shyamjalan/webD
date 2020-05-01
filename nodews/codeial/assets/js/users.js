function filePreview(input) {
    if (input.files && input.files[0]) {
        var reader = new FileReader();
        reader.onload = function (e) {
            $('#uploadForm + img').remove();
            $('#uploadForm').after('<img src="'+e.target.result+'" width="450" height="300"/>');
        };
        reader.readAsDataURL(input.files[0]);
    }
}

function addFriend(addLink){
    $(addLink).click(function(e){
        e.preventDefault();

        $.ajax({
            type: 'post',
            url: $(addLink).prop('href'),
            success: function(data){
                if(data.redirect){
                    window.location.href = data.redirect;
                }
                $('#friend-toggle-button').empty();
                $('#friend-toggle-button').append(`<a class = 'remove' href="/users/friendship/remove/?from_user=${data.friendship.from_user}&to_user=${data.friendship.to_user}"><button>Unfriend</button></a>`);
                removeFriend($('#friend-toggle-button a'));
            },
            error: function(error){
                showNoty('error', error.responseText);
                console.log(error.responseText);
            }
        });
    });
}

function removeFriend(removeLink){
    $(removeLink).click(function(e){
        e.preventDefault();

        $.ajax({
            type: 'post',
            url: $(removeLink).prop('href'),
            success: function(data){
                if(data.redirect){
                    window.location.href = data.redirect;
                }
                $('#friend-toggle-button').empty();
                $('#friend-toggle-button').append(`<a class = 'add' href="/users/friendship/add/?to_user=${data.to_user}"><button>Add Friend</button></a>`);
                addFriend($('#friend-toggle-button a'));
            },
            error: function(error){
                showNoty('error', error.responseText);
                console.log(error.responseText);
            }
        });
    });
}

friendLink = $('#friend-toggle-button a');
if(friendLink.attr('class') == 'add'){
    addFriend(friendLink);
}
else{
    removeFriend(friendLink);
}

$("#file").change(function () {
    filePreview(this);
});