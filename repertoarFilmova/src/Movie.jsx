import React from "react";

const Movie = (props) => {
  return (
    <div style={{ display: "flex", gap: "10px" }}>
      <img src={props.poster} alt="movie" width="120" height="120" />
      <p>
        {props.title}, sala:
        {!props.hall ? " Film još uvek nije u ponudi" : ` ${props.hall}`}, cena:
        {!props.price ? " 300" : ` ${props.price}`}din
      </p>
    </div>
  );
};

export default Movie;
