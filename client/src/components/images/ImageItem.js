import React, { useContext } from "react";
import ImageContext from "../../context/image/imageContext";

const ImageItem = ({ image }) => {
  const imageContext = useContext(ImageContext);
  const { deleteImage, setCurrent, clearCurrent } = imageContext;

  const { _id } = image;

  const onDelete = () => {
    console.log("This is image id in ImageItem for onDelete");
    console.log(_id);
    deleteImage(_id);
    clearCurrent();
  };

  return (
    <div className="card bg-light">
      <h3>Image Item</h3>
      <h3>{image.filename}</h3>
      <img src={image.url} alt={image.name} />
      <button
        type="button"
        className="btn btn-warning btn-lg btn-block mb-3 mt-3"
        onClick={() => setCurrent(image)}
      >
        Edit
      </button>
      <button
        type="button"
        className="btn btn-danger btn-lg btn-block mb-3"
        onClick={onDelete}
      >
        Delete
      </button>
    </div>
  );
};

export default ImageItem;
