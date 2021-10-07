import React, { useContext, useRef, useEffect } from "react";
import ImageContext from "../../context/image/imageContext";

const ImageFilter = () => {
  const imageContext = useContext(ImageContext);
  const text = useRef("");

  const { filterImages, clearFilter, filtered } = imageContext;

  useEffect(() => {
    if (filtered === null) {
      text.current.value = "";
    }
  });

  const onChange = (e) => {
    if (text.current.value !== "") {
      filterImages(e.target.value);
    } else {
      clearFilter();
    }
  };

  return (
    <form>
      <input
        ref={text}
        type="text"
        placeholder="Search Pictures..."
        onChange={onChange}
      />
    </form>
  );
};

export default ImageFilter;
