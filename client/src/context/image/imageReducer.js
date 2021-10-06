import {
  ADD_IMAGE,
  DELETE_IMAGE,
  IMAGE_ERROR,
  GET_IMAGES,
  SET_CURRENT,
  CLEAR_CURRENT,
  //   UPDATE_CURRENT,
  //   UPDATE_IMAGE,
  FILTER_IMAGES,
  CLEAR_FILTER,
} from "../types";

// note should assign variable to an arrow function before export default as module
// eslint-disable-next-line
export default (state, action) => {
  switch (action.type) {
    case GET_IMAGES:
      return {
        ...state,
        images: action.payload,
        loading: false,
      };
    // ADD_IMAGE has action, then state to add image at the front of the array
    case ADD_IMAGE:
      return {
        ...state,
        images: [action.payload, ...state.images],
        loading: true,
      };
    case DELETE_IMAGE:
      return {
        ...state,
        images: state.images.filter((image) => image._id !== action.payload),
        loading: false,
      };
    case SET_CURRENT:
      return {
        ...state,
        current: action.payload,
      };
    case CLEAR_CURRENT:
      return {
        ...state,
        current: null,
      };
    case IMAGE_ERROR:
      return {
        ...state,
        error: action.payload,
      };
    case FILTER_IMAGES:
      return {
        ...state,
        filtered: state.images.filter((image) => {
          const regex = new RegExp(`${action.payload}`, "gi");
          return image.filename.match(regex);
        }),
      };
    case CLEAR_FILTER:
      return {
        ...state,
        filtered: null,
      };
    default:
      return state;
  }
};
