import React,{useState,useEffect} from 'react';
import PropTypes from 'prop-types';
import { useForm } from "react-hook-form";
import './My_app.css';

export function PostForm(props) {

  const { register, handleSubmit, setValue, reset, formState: { errors} } = useForm();

    const submit = (values) => {
        props.handleSubmit(values);
        reset({ title: '',body: '' } );
    };

    const cancel = (values) => {
        props.handleCancel(values);
        reset({ title: '',body: '' } );
    };

    useEffect(() => {
        if (props.editedPost) {
            setValue( 'title', props.editedPost.title);
            setValue('body', props.editedPost.body);
        }
    }, [props.editedPost]);


  return (
      <form onSubmit={handleSubmit(submit)} className="form" >
          <div>{props.editedPost == null? 'Create': 'Edit' }</div>
          <div className="wrap">
               <div className="lab">Title</div>
               <div>

                  <input style={{'width':'1000px'}} type="text" {...register("title", { required: "Please, enter title" })} />

                  {errors.title && (
                      <div style={{color: "red"}}>{errors.title.message}</div>
                  )}

               </div>
          </div>
          <div className="wrap">
                <div className="lab">Text</div>
                <div>

                  <input style={{'width':'1000px'}} type="text" {...register("body", { required: "Please, enter body text" })}>

                  </input>
                  {errors.body && (
                      <div style={{color: "red"}}>{errors.body.message}</div>
                  )}
                </div>
          </div>
        <button>{props.editedPost == null? 'Submit': 'Save'} </button>
          {props.editedPost && (
              <button onClick={cancel}>Cancel</button>
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





