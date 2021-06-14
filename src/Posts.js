import React, {useState} from 'react';
import PropTypes from 'prop-types';
import {PostForm} from "./PostForm";
import axios from 'axios';


export function Posts() {
  const [isLoading, setIsLoading] = useState(true);
  let posts = [];
  const onSubmit = (values) => {
    let newPost = {
      createdAt: new Date().toISOString(),
      title: values.title,
      body:values.body
    }

    axios.post("https://60bb880442e1d00017620c95.mockapi.io/Posts/", newPost)
        .then( (response) => {
          console.log(response);
          setIsLoading(false);
        })
        .catch((error) => {
          console.log(error);

          setIsLoading(false);
          });

       // });



    posts.push(newPost)
    console.log(posts);

    //console.log("onSubmit", values);
  };



  return (
        <PostForm handleSubmit={onSubmit}/>
  );
}

Posts.propTypes = {};

