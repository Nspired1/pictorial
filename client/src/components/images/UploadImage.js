import React, { useState, useContext } from "react";
import ImageContext from "../../context/image/imageContext";

const ImageUpload = (props) => {
  const [file, setFile] = useState("");
  const imageContext = useContext(ImageContext);

  const { addImage } = imageContext;

  // e.target.files is an ARRAY, NOT an object. Hence for a single image we
  //only want the first element of the array [0]
  const changeHandler = (e) => {
    setFile(e.target.files[0]);
  };

  const onSubmit = (e) => {
    e.preventDefault();
    var formData = new FormData();
    var name = file.name;
    formData.append("image", file);
    formData.append("name", name);

    // fetch or axios POST request OR send to Reducer and have ACTION send POST request
    // in sending a file content-type header should NOT be specified. FILES are NOT JSON.
    // Browsers will annotate automatically headers
    // also pass the whole file to the body of the request.
    console.log(name);
    console.log(file);
    console.log("This is formData");
    console.log(formData);
    addImage(formData);

    props.history.push("/");
  };

  const ImageThumb = ({ image }) => {
    return (
      <img
        src={URL.createObjectURL(image)}
        alt={image.name}
        style={{
          maxHeight: "500px",
          maxWidth: "500px",
          margin: "10px 20px 10px 20px",
        }}
      />
    );
  };

  return (
    <div>
      <form
        action="submit"
        onSubmit={onSubmit}
        style={{ border: "solid 2px", padding: "10px" }}
      >
        <div>{file && <ImageThumb image={file} />}</div>
        <div>
          <input type="file" name="profileImage" onChange={changeHandler} />
        </div>
        <p>Filename: {file.name}</p>
        <p>File type: {file.type}</p>
        <p>File size: {file.size} bytes</p>

        <button className="btn btn-primary">Upload Image</button>
      </form>
    </div>
  );
};

export default ImageUpload;
