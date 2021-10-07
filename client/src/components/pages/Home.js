import React from "react";
import Images from "../images/Images";
import ImageFilter from "../images/ImageFilter";

const Home = () => {
  return (
    <div className="grid-3">
      <h1>Home</h1>
      <div>
        {/* ImageForm */}
        <p>Image Form</p>
      </div>
      <div>
        {/* <ImageFilter /> */}
        <Images />
      </div>
    </div>
  );
};

export default Home;
