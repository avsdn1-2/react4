import React,{useState} from 'react';
import PropTypes from 'prop-types';


export function PostList(props) {


  return (
      (props.posts !== null) &&
      props.posts.map((post)=>(
              <div key={post.id}>
                  <div>{post.title}</div>
                  <div>{post.body}</div>
                  <div>
                      <button onClick={() => props.handleEditPost(post.id)}>Edit</button>
                      <button onClick={() => props.handleDeletePost(post.id)}>Delete</button>
                  </div>
              </div>
          )
      )
  );

}

//connect(({ title, body }) => ({ title, body }), updateAction)(PostForm);

PostList.propTypes = {
    handleEditPost: PropTypes.func.isRequired,
    handleDeletePost: PropTypes.func.isRequired,



};





