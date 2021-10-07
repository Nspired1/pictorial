import React, { useContext } from "react";
import { useHistory } from "react-router-dom";
import ImageContext from "../../context/image/imageContext";

const ImageItem = ({ image }) => {
  const imageContext = useContext(ImageContext);
  const history = useHistory();

  const { deleteImage, clearCurrent } = imageContext;
  const { _id } = image;

  //pending on getting Edit component operational
  // const routeChange = () => {
  //   let path = "/edit";
  //   history.push(path);
  // };

  const onDelete = () => {
    deleteImage(_id);
    clearCurrent();
  };

  return (
    <div className="card bg-light" style={{ maxWidth: "500px" }}>
      <img src={image.url} alt={image.name} />
      <div className="card-body">
        <p className="card-text">{image.description}</p>
        {/* <button
          type="button"
          className="btn btn-warning btn-lg"
          onClick={routeChange}
        >
          Edit
        </button>
        <button
          type="button"
          className="btn btn-success btn-lg"
          style={{ position: "relative", left: 10 }}
        >
          Like
        </button> */}
        <button
          type="button"
          className="btn btn-danger btn-lg "
          onClick={onDelete}
        >
          Delete
        </button>
      </div>
    </div>
  );
};

export default ImageItem;
