import React, { useState } from "react";

const MovieForm = ({ onSaveMovie, editingMovie, onCancelEdit }) => {
  const [title, setTitle] = useState(editingMovie ? editingMovie.title : "");
  const [hall, setHall] = useState(editingMovie ? editingMovie.hall : "");
  const [price, setPrice] = useState(editingMovie ? editingMovie.price : "");
  const [poster, setPoster] = useState(editingMovie ? editingMovie.poster : "");

  const handleSubmit = (e) => {
    e.preventDefault();

    //Validacija
    if (!title || !hall || !price) {
      alert("Sva polja su obavezna");
      return;
    }
    if (hall < 1 || hall > 12) {
      alert("Sala mora biti između 1 i 12.");
      return;
    }

    const movieData = {
      title,
      hall: Number(hall),
      price: Number(price),
      poster,
    };

    onSaveMovie(movieData);

    setTitle("");
    setHall("");
    setPrice("");
    setPoster("");
  };

  return (
    <form onSubmit={handleSubmit}>
      <div>
        <input
          type="text"
          placeholder="Title"
          value={title}
          onChange={(e) => setTitle(e.target.value)}
        />
        <input
          type="number"
          placeholder="Hall"
          value={hall}
          onChange={(e) => setHall(e.target.value)}
        />
        <input
          type="number"
          placeholder="Price"
          value={price}
          onChange={(e) => setPrice(e.target.value)}
        />
        <input
          type="text"
          placeholder="Poster URL"
          value={poster}
          onChange={(e) => setPoster(e.target.value)}
        />
      </div>
      <div style={{ marginTop: "10px", display: "flex", gap: "10px" }}>
        <button type="submit">
          {editingMovie ? "Save Changes" : "Add Movie"}
        </button>
        {editingMovie && (
          <button type="button" onClick={onCancelEdit}>
            Cancel
          </button>
        )}
      </div>
    </form>
  );
};

export default MovieForm;
