import React,{useState} from 'react';
import PropTypes from 'prop-types';
import { useForm } from "react-hook-form";
import { connect } from "react-redux";
//import updateAction from "./actions";

export function PostForm(props) {

  const { register, handleSubmit, setValue, formState: { errors } } = useForm();
 // const [data,setData] = useState({title:props.title,body:props.body});




  //console.log(data);
  //  alert(props.editPost);
  return (
      <form onSubmit={handleSubmit(props.handleSubmit)} className="form">
        <div>

          <input defaultValue={props.title} type="text" {...register("title", { required: "Please, enter title" })}/>
          {errors.title && (
              <div style={{color: "red"}}>{errors.title.message}</div>
          )}
        </div>
        <div>
          <input defaultValue={props.body} type="text" {...register("body", { required: "Please, enter body text" })}/>
          {errors.body && (
              <div style={{color: "red"}}>{errors.body.message}</div>
          )}
        </div>
        <button>{props.editPost == true? 'Save':'Submit'} </button>
      </form>
  );

}

//connect(({ title, body }) => ({ title, body }), updateAction)(PostForm);

PostForm.propTypes = {
    handleSubmit: PropTypes.func.isRequired,
    title: PropTypes.string,
    body: PropTypes.string,


};





