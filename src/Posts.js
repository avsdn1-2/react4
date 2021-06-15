import React, {useEffect,useLayoutEffect, useState} from 'react';
import PropTypes from 'prop-types';
import {PostForm} from "./PostForm";
import {PostList} from "./PostList";
import axios from 'axios';


export function Posts() {
  const [editPostID, setEditPostID] = useState(null);
  const [deletePostID, setDeletePostID] = useState(null);
  const [isLoading, setIsLoading] = useState(true);
  const [posts, setPosts] = useState([]);
  const [isSaved, setIsSaved] = useState(false);

  useLayoutEffect(() => {
    axios.get("https://60bb880442e1d00017620c95.mockapi.io/Posts/")
        .then((response) => {
          setIsLoading(false);
          setPosts(response.data);
          console.log(response.data);
        })
        .catch((error) => {
          console.log(error);

          setIsLoading(false);
          return [];
        });
  },[editPostID,deletePostID,setIsSaved]);


  console.log(posts);


  const handleEditPost = (id) => {
    setEditPostID(id);
  }
  const handleDeletePost = (id) => {
    setDeletePostID(id);

    //alert(deletePostID);
    let foundInd = posts.findIndex((el)=>el.id === deletePostID);
    posts.splice(foundInd,1);
    axios.delete("https://60bb880442e1d00017620c95.mockapi.io/Posts/" + id)
        .then( (response) => {
          console.log(response);
          setIsLoading(false);
        })
        .catch((error) => {
          console.log(error);

          setIsLoading(false);
        });
  }
  const onSubmit = (values) => {
    if (editPostID === null) {
        let newPost = {
            createdAt: new Date().toISOString(),
            title: values.title,
            body:values.body
        }
        axios.post("https://60bb880442e1d00017620c95.mockapi.io/Posts/", newPost)
            .then( (response) => {

                setIsLoading(false);
            })
            .catch((error) => {
                setIsLoading(false);
            });
        setIsSaved(true);
    } else {

        let newPost = {
            id: editPostID,
            createdAt: new Date().toISOString(),
            title: values.title,
            body: values.body
        }


        let foundInd = posts.findIndex((el) => el.id === editPostID);
        if (foundInd > -1) {
            posts[foundInd] = newPost;
            axios.put("https://60bb880442e1d00017620c95.mockapi.io/Posts/" + editPostID, newPost)
                .then((response) => {
                    setPosts(posts);
                    setIsLoading(false);
                })
                .catch((error) => {
                    setIsLoading(false);
                });


            setIsSaved(true);
        }
        //setEditPostID(null);
    }

    if (deletePostID !== null)
    {
      axios.delete("https://60bb880442e1d00017620c95.mockapi.io/Posts/" + deletePostID)
          .then( (response) => {
            console.log(response);
            setIsLoading(false);
          })
          .catch((error) => {
            console.log(error);

            setIsLoading(false);
          });
    }


  };


  return (
      <div>
        <PostForm
            title = {editPostID === null? '': posts[posts.findIndex(el => el.id === editPostID)].title}
            body = {editPostID === null? '': posts[posts.findIndex(el => el.id === editPostID)].body}
            editPost={editPostID === null? false: true}
            handleSubmit={onSubmit}
        />



         <PostList
            posts = { posts }
            handleEditPost = { handleEditPost }
            handleDeletePost = { handleDeletePost }
         />

          {/*

              (posts !== null) &&
              posts.map((post) => (
                      <div key={post.id}>
                          <div>{post.title}</div>
                          <div>{post.body}</div>
                          <div>
                              <button onClick={() => handleEditPost(post.id)}>Edit</button>
                              <button onClick={() => handleDeletePost(post.id)}>Delete</button>
                          </div>
                      </div>
                  )
              )
              */
          }


      </div>

  );
}

Posts.propTypes = {};

