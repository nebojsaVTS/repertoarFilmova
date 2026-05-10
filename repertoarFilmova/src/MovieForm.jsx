import React, { useState, useEffect } from "react";
import { addMovie, getMovieById, updateMovie } from "./services/movieService";
import { useNavigate, useParams } from "react-router-dom";

const MovieForm = ({ onSaveMovie, editingMovie, onCancelEdit }) => {
  const [title, setTitle] = useState(editingMovie ? editingMovie.title : "");
  const [hall, setHall] = useState(editingMovie ? editingMovie.hall : "");
  const [price, setPrice] = useState(editingMovie ? editingMovie.price : "");
  const [poster, setPoster] = useState(editingMovie ? editingMovie.poster : "");
  const [error, setError] = useState("");

  const navigate = useNavigate();
  const { id } = useParams();

  useEffect(() => {
    const loadMovie = async () => {
      if (id) {
        try {
          const response = await getMovieById(id);
          const movie = response.data;

          setTitle(movie.name);
          setHall(movie.hall);
          setPrice(movie.price);
          setPoster(movie.poster);
        } catch (error) {
          setError("Greška pri učitavanju filma.");
        }
      }
    };
    loadMovie();
  }, [id]);

  const handleSubmit = async (e) => {
    e.preventDefault();

    //Validacija
    if (!title || !hall || !price) {
      setError("Sva polja su obavezna");
      return;
    }
    if (hall < 1 || hall > 12) {
      setError("Sala mora biti između 1 i 12.");
      return;
    }

    const movieData = {
      name: title,
      hall: Number(hall),
      price: Number(price),
      poster,
    };

    try {
      if (id) {
        await updateMovie(id, movieData);
      } else {
        await addMovie(movieData);
      }
      setError("");
      navigate("/movies");
    } catch (error) {
      setError("Server nije uspešno obradio zahtev.");
    }

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
        {error && <p style={{ color: "red" }}>{error}</p>}
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
