import React, { useContext, useState } from "react";
import ImageContext from "../../context/image/imageContext";

const EditImage = () => {
  const imageContext = useContext(ImageContext);
  const { image, updateContact } = imageContext;
  const [description, setDescription] = useState("");

  const onChange = (e) => setDescription(e.target.value);

  const onSubmit = (e) => {
    e.preventDefault();
    updateContact(description);
  };

  return (
    <div>
      <h1>This is EDIT</h1>
      <img
        src={image}
        alt={""}
        style={{
          height: "500px",
          maxWidth: "500px",
          margin: "auto",
          display: "block",
        }}
      />{" "}
      <form action="submit" onSubmit={onSubmit}>
        <div className="mb-3">
          <h1>Edit Image Description</h1>
          <input
            className="form-control"
            type="text"
            name="description"
            onChange={onChange}
          />
        </div>
      </form>
    </div>
  );
};

export default EditImage;

//
//
//   const history = useHistory();
//

//   const onChange = (e) => setDescription(e.target.value);
//   const onSubmit = (e) => {
//     e.preventDefault();
//   };

//   return (
//     <div>
//       <img
//         src={image}
//         alt={image.name}
//         style={{
//           height: "500px",
//           maxWidth: "500px",
//           margin: "auto",
//           display: "block",
//         }}
//       />{" "}
//       <div>
//         <p className="form-text">Filename: {image.name}</p>
//       </div>
//       <form action="submit" onSubmit={onSubmit}>
//         <div className="mb-3">
//           <h1>Edit Image Description</h1>
//           <input
//             className="form-control"
//             type="text"
//             name="description"
//             onChange={onChange}
//           />
//         </div>
//       </form>
//     </div>
//   );
