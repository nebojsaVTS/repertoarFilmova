import React from "react";

const Movie = (props) => {
  return (
    <div style={{ display: "flex", gap: "10px" }}>
      <img
        src="https://i.pinimg.com/736x/aa/f7/05/aaf705e06726ce3881288ae4be3ac5fe.jpg"
        alt="movie"
        width={"60px"}
        height={"60px"}
      />
      <p>
        {props.title}, sala:{props.hall}, cena:{props.price}din
      </p>
    </div>
  );
};

export default Movie;
