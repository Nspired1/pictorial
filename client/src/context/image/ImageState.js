import React, { useReducer } from "react";
// import uuid from "uuid";
import axios from "axios";
import ImageContext from "./imageContext";
import imageReducer from "./imageReducer";
import {
  ADD_IMAGE,
  DELETE_IMAGE,
  IMAGE_ERROR,
  GET_IMAGES,
  SET_CURRENT,
  CLEAR_CURRENT,
  // UPDATE_CURRENT,
  // UPDATE_IMAGE,
  FILTER_IMAGES,
  CLEAR_FILTER,
} from "../types";

const ImageState = (props) => {
  const initialState = {
    images: null,
    current: null,
    error: null,
    filtered: null,
  };

  const [state, dispatch] = useReducer(imageReducer, initialState);

  // Get Images
  const getImages = async () => {
    try {
      const res = await axios.get("/api/images");
      dispatch({
        type: GET_IMAGES,
        payload: res.data,
      });
    } catch (err) {
      dispatch({
        type: IMAGE_ERROR,
        payload: err.response.msg,
      });
    }
  };

  // Add Image
  const addImage = async (formData) => {
    const config = {
      headers: {
        "Content-Type": "multipart/form-data",
      },
    };

    console.log("This is in POST of ImageState in context");

    console.log(formData);
    try {
      const res = await axios({
        method: "post",
        url: "/api/images",
        data: formData,
        config,
      });
      console.log("This is RESponse from the server");
      console.log(res);
      dispatch({
        type: ADD_IMAGE,
        payload: res.data,
      });
    } catch (err) {
      dispatch({
        type: IMAGE_ERROR,
        payload: err.response.msg,
      });
    }
  };

  // Delete Image
  const deleteImage = async (id) => {
    try {
      await axios.delete(`/api/images/${id}`);
      dispatch({
        type: DELETE_IMAGE,
        payload: id,
      });
    } catch (err) {
      dispatch({ type: IMAGE_ERROR, payload: err.response.msg });
    }
    dispatch({ type: DELETE_IMAGE, payload: id });
  };

  //Set current Image
  const setCurrent = (image) => {
    dispatch({ type: SET_CURRENT, payload: image });
  };

  // Clear Current Image
  const clearCurrent = () => {
    dispatch({ type: CLEAR_CURRENT });
  };

  // Update Image

  // Filter Image
  const filterImages = (text) => {
    dispatch({ type: FILTER_IMAGES, payload: text });
  };

  //Clear Filter
  const clearFilter = () => {
    dispatch({ type: CLEAR_FILTER });
  };

  return (
    <ImageContext.Provider
      value={{
        images: state.images,
        error: state.error,
        current: state.current,
        addImage,
        deleteImage,
        getImages,
        setCurrent,
        clearCurrent,
        filterImages,
        clearFilter,
      }}
    >
      {props.children}
    </ImageContext.Provider>
  );
};

export default ImageState;
