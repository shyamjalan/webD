import React from 'react';

function Post(props){
    let postStyle = {
        color: 'grey'
    }

    return(
        <li className="PostItem" style={postStyle}>
            {props.post.content}
            <br></br>
            <small>{props.post.user.name}</small>
        </li>
    );
}

export default Post;