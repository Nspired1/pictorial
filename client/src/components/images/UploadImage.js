import React, { useState, useContext, useEffect } from "react";
import ImageContext from "../../context/image/imageContext";
import AlertContext from "../../context/alert/alertContext";

const ImageUpload = (props) => {
  const [file, setFile] = useState(null);
  const [description, setDescription] = useState("");
  const imageContext = useContext(ImageContext);
  const alertContext = useContext(AlertContext);

  const { addImage, error } = imageContext;
  const { setAlert } = alertContext;

  useEffect(() => {
    if (error === "Please select an image.") {
      setAlert("Please select an image.", "danger");
    }
  });

  // e.target.files is an ARRAY, NOT an object. Hence for a single image we
  //only want the first element of the array [0]
  const changeHandler = (e) => {
    setFile(e.target.files[0]);
  };

  const onChange = (e) => setDescription(e.target.value);

  const onSubmit = (e) => {
    e.preventDefault();
    const formData = new FormData();
    const name = file.name;
    formData.append("image", file);
    formData.append("name", name);
    formData.append("description", description);

    if (!name) {
      setAlert("Please select an image", "danger");
    } else {
      console.log(description);
      console.log(file);
      console.log("This is formData");
      console.log(formData);
      addImage(formData);
      props.history.push("/");
    }
    // fetch or axios POST request OR send to Reducer and have ACTION send POST request
    // in sending a file content-type header should NOT be specified. FILES are NOT JSON.
    // Browsers will annotate automatically headers
    // also pass the whole file to the body of the request.
  };

  const ImageThumb = ({ image }) => {
    return (
      <div>
        <img
          src={URL.createObjectURL(image)}
          alt={image.name}
          style={{
            height: "500px",
            maxWidth: "500px",
            margin: "auto",
            display: "block",
          }}
        />
        <div>
          <p className="form-text">Filename: {file.name}</p>
          <p className="form-text">File type: {file.type}</p>
          <p className="form-text">File size (bytes): {file.size} </p>
        </div>
      </div>
    );
  };

  return (
    <div className="upload-area">
      <div className="upload-wrapper">
        <form action="submit" onSubmit={onSubmit}>
          <div className="mb-3">{file && <ImageThumb image={file} />}</div>
          <div className="mb-3">
            <h1>Image Upload</h1>
            <input
              className="form-control"
              type="file"
              name="imageUpload"
              onChange={changeHandler}
            />
          </div>
          <div className="mb-3">
            <label className="form-label" htmlFor="description">
              Description
            </label>
            <input
              type="text"
              className="form-control"
              name="description"
              value={description}
              onChange={onChange}
            />
          </div>
          <div className="d-grid mb-2">
            <button type="submit" className="btn btn-primary">
              Upload Image
            </button>
          </div>
        </form>
      </div>
    </div>
  );
};

export default ImageUpload;
