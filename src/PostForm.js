import React from 'react';
import PropTypes from 'prop-types';
import { useForm } from "react-hook-form";

export function PostForm(props) {

  const { register, handleSubmit, formState: { errors } } = useForm();

  return (
      <form onSubmit={handleSubmit(props.handleSubmit)} className="form">
        <div>
          <input type="text" {...register("title", { required: "Please, enter title" })}/>
          {errors.title && (
              <div style={{color: "red"}}>{errors.title.message}</div>
          )}
        </div>
        <div>
          <input type="text" {...register("body", { required: "Please, enter body text" })}/>
          {errors.body && (
              <div style={{color: "red"}}>{errors.body.message}</div>
          )}
        </div>
        <button>Submit</button>
      </form>
  );

}

PostForm.propTypes = {
    handleSubmit: PropTypes.func.isRequired
};





