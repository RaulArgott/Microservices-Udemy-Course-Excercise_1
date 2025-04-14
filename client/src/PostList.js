import React, { useState, useEffect } from "react";
import axios from "axios";
import CommentCreate from "./CommentCreate";
import CommentList from "./CommentList";

/**
 * A component that displays a list of posts with their associated comments.
 *
 * The component fetches the list of posts from the server and renders a
 * list of cards, each card representing a post. Each card contains the
 * title of the post and a CommentCreate component to allow the user to
 * add new comments to the post.
 *
 * @returns {ReactElement} The rendered component.
 */
const PostList = () => {
    const [posts, setPosts] = useState({});
    const fetchPosts = async () => {
        const res = await axios.get('http://posts.com/posts');
        setPosts(res.data);
    }

    useEffect(() => {
        fetchPosts();
    }, []);

    const renderedPosts = Object.values(posts).map(post => {
        return (
            <div className="card" style={{ width: "30%", marginBottom: "20px" }} key={post.id}>
                <div className="card-body">
                    <h3>{post.title}</h3>
                    <CommentList comments={post.comments} />
                    <CommentCreate postId={post.id} />
                </div>
            </div>
        );
    });
    return (
        <div className="d-flex flex-row flex-wrap justify-content-between">
            {renderedPosts}
        </div>
    );
};

export default PostList;