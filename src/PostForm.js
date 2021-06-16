import React,{useState} from 'react';
import PropTypes from 'prop-types';
import { useForm } from "react-hook-form";

export function PostForm(props) {

  const { register, handleSubmit, setValue, reset,formState: { errors } } = useForm();
  console.log(props.title);
  console.log(props.body);

  return (
      <form onSubmit={handleSubmit(props.handleSubmit)} className="form">
        <div>
          <h4>Title:</h4>
          <input style={{'width':'1000px'}} defaultValue={props.title}  type="text" {...register("title", { required: "Please, enter title" })} />
            
          {errors.title && (
              <div style={{color: "red"}}>{errors.title.message}</div>
          )}

        </div>
        <div>
          <h4>Text:</h4>
          <input style={{'width':'1000px'}} defaultValue={props.body} type="text" {...register("body", { required: "Please, enter body text" })}>

          </input>
          {errors.body && (
              <div style={{color: "red"}}>{errors.body.message}</div>
          )}
        </div>
        <button>{props.editPost == true? 'Save':'Submit'} </button>
          {props.editPost && (
              <button onClick={props.handleCancel}>Cancel</button>
          )}

      </form>
  );

}

PostForm.propTypes = {
    handleSubmit: PropTypes.func.isRequired,
    title: PropTypes.string,
    body: PropTypes.string,
};

PostForm.defaultProps = {
    editPost: null,
    title: '',
    body: ''
};





