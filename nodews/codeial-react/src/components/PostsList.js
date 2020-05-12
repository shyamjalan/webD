import React from 'react';
import Axios from 'axios';
import Post from './Post';

class PostsList extends React.Component{
    constructor(props){
        super(props);
        this.state = {
            posts: []
        }
        this.getPosts();
    }

    getPosts(){
        Axios.get('http://localhost:8000/api/v1/posts').then((data) => {
            this.setState({
                posts: data.data.posts
            });
        });
    }

    render(){
        return(
            <div>
                <h1>Codeial Posts</h1>
                <ul>
                    {
                        this.state.posts.map((post) => <Post post={post} key={post._id}></Post>)
                    }
                </ul>
            </div>
        );
    }
}

export default PostsList;