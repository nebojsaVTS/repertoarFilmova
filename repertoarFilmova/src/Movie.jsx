import React from "react";

const Movie = (props) => {
  return (
    <div style={{ display: "flex", gap: "10px", marginBottom: "20px" }}>
      <div style={{ display: "flex", flexDirection: "column" }}>
        <div style={{ display: "flex", gap: "10px", alignItems: "center" }}>
          <img src={props.poster} alt="movie" width="110" height="150" />

          <div>
            <p>
              {props.title},{" "}
              {!props.hall
                ? "Film još uvek nije u ponudi"
                : `sala: ${props.hall}`}
              , cena: {!props.price ? 300 : props.price}din
            </p>

            <p>
              Likes: {props.likes} | Dislikes: {props.dislikes}
            </p>
          </div>
        </div>

        <div style={{ display: "flex", gap: "15px", marginTop: "5px" }}>
          <button onClick={() => props.onReact(props.title, "Like")}>
            Like
          </button>
          <button onClick={() => props.onReact(props.title, "Dislike")}>
            Dislike
          </button>
          <button onClick={() => props.onEdit(props.movie)}>Edit</button>
        </div>
      </div>
    </div>
  );
};

export default Movie;
