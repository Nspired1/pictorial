import React, { useContext, useEffect, Fragment } from "react";
import ImageItem from "./ImageItem";
import ImageContext from "../../context/image/imageContext";
import AlertContext from "../../context/alert/alertContext";

const Images = () => {
  const imageContext = useContext(ImageContext);
  const alertContext = useContext(AlertContext);

  const { images, getImages, error } = imageContext;
  const { setAlert } = alertContext;

  useEffect(() => {
    getImages();
    if (error === "Image not found." || error === "That is not authorized") {
      setAlert(error, "danger");
    }
    // eslint-disable-next-line
  }, []);

  return (
    <Fragment>
      {images.map((image) => (
        <ImageItem key={image._id} image={image} />
      ))}
    </Fragment>
  );
};

export default Images;
