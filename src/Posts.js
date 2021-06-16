import React, {useEffect, useState} from 'react';
import PropTypes from 'prop-types';
import {PostForm} from "./PostForm";
import {PostList} from "./PostList";
import axios from 'axios';


export function Posts() {
  const [editPostID, setEditPostID] = useState(null);
  const [deletePostID, setDeletePostID] = useState(null);
  const [isLoading, setIsLoading] = useState(true);
  const [posts, setPosts] = useState([]);
  const [counter, setCounter] = useState(0);

  //стягиваем все посты
  useEffect(() => {
    axios.get("https://60bb880442e1d00017620c95.mockapi.io/Posts/")
        .then((response) => {
          setIsLoading(false);
          setPosts(response.data);
          setCounter(response.data.length);
        })
        .catch((error) => {
          console.log(error);

          setIsLoading(false);
          return [];
        });
  },[editPostID,deletePostID,counter]);



  const handleEditPost = (id) => {
    setEditPostID(id);
  }

  const handleDeletePost = (id) => {
    setDeletePostID(id);

    let foundInd = posts.findIndex((el)=>el.id === deletePostID);
    posts.splice(foundInd,1);
    setCounter(counter - 1); //уменьшаем счетчик всех постов
    axios.delete("https://60bb880442e1d00017620c95.mockapi.io/Posts/" + id)
        .then( (response) => {
          setIsLoading(false);
        })
        .catch((error) => {
          setIsLoading(false);
        });
  }

  const onSubmit = (values) => {
    //сохранение нового поста
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

        setCounter(counter + 1); //увеличиваем счетчик всех постов

    } else { //сохранение отредактированного поста
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

            setEditPostID(null); //устанавливаем свойство, содержащее ID редактируемого поста в начальное состояние
        }
    }
    //удаление поста
    if (deletePostID !== null)
    {
      axios.delete("https://60bb880442e1d00017620c95.mockapi.io/Posts/" + deletePostID)
          .then( (response) => {
            setIsLoading(false);
          })
          .catch((error) => {
            setIsLoading(false);
          });
        setDeletePostID(null); //устанавливаем свойство, содержащее ID удаляемого поста в начальное состояние
    }

  };


  return (
      <div>
        <PostForm
            editedPost = {editPostID === null? null: posts[posts.findIndex(el => el.id === editPostID)]}
            handleCancel = {() => handleEditPost(null)}
            handleSubmit = {onSubmit}
        />

          {
              posts.length == 0 ? <p>Loading</p> :
              <PostList
                  posts={posts}
                  handleEditPost={handleEditPost}
                  handleDeletePost={handleDeletePost}
              />
          }

      </div>

  );
}

Posts.propTypes = {};

