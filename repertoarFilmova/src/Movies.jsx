import React, { useState, useEffect } from "react";
import Movie from "./Movie";
import {
  getMovies,
  likeMovie,
  dislikeMovie,
  deleteMovie,
} from "./services/movieService";
import { useNavigate } from "react-router-dom";

const Movies = () => {
  const today = new Date();
  const day = today.getDate();
  const month = today.getMonth() + 1;
  const year = today.getFullYear();
  const formattedDate = `${day}.${month}.${year}.`;

  const [bestMovie, setBestMovie] = useState(null);

  const [movies, setMovies] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState("");

  const navigate = useNavigate();

  useEffect(() => {
    console.log("Postavka filmova");

    const loadMovies = async () => {
      try {
        const response = await getMovies();
        setMovies(response.data);
        setError("");
      } catch (error) {
        setError("Greska pri ucitavanju sa servera");
      } finally {
        setLoading(false);
      }
    };

    loadMovies();

    return () => {
      console.log("Sklanjanje filmova");
    };
  }, []);

  useEffect(() => {
    if (movies.length > 0) {
      let topMovie = movies[0];

      movies.forEach((movie) => {
        const currentScore = movie.likes - movie.dislikes;
        const topScore = topMovie.likes - topMovie.dislikes;

        if (currentScore > topScore) {
          topMovie = movie;
        }
      });

      setBestMovie(topMovie);
    } else {
      setBestMovie(null);
    }
  }, [movies]);

  const handleReaction = async (id, action) => {
    try {
      if (action === "Like") {
        await likeMovie(id);
      } else {
        await dislikeMovie(id);
      }
      const response = await getMovies();
      setMovies(response.data);
    } catch (error) {
      setError("Greška pri reakciji na film.");
    }
  };

  const handleDelete = async (id) => {
    try {
      await deleteMovie(id);

      const response = await getMovies();
      setMovies(response.data);
    } catch (error) {
      setError("Greška pri brisanju filma.");
    }
  };

  const handleEditClick = (movie) => {
    navigate(`/movies/edit/${movie.id}`);
  };

  return (
    <>
      <h1>Repertoar za danas ({formattedDate})</h1>

      {loading && <p>Učitavanje filmova...</p>}
      {error && <p style={{ color: "red" }}>{error}</p>}

      {bestMovie && (
        <div
          style={{
            marginBottom: "20px",
            padding: "10px",
            border: "1px solid black",
          }}
        >
          <h2>Najbolje ocenjen film</h2>
          <p>
            {bestMovie.name} | Ocena: {bestMovie.likes - bestMovie.dislikes}
          </p>
          <p>
            Likes: {bestMovie.likes} | Dislikes: {bestMovie.dislikes}
          </p>
        </div>
      )}

      {movies.map((movie) => (
        <Movie
          key={movie.id}
          title={movie.name}
          hall={movie.hall}
          price={movie.price}
          poster={movie.poster}
          likes={movie.likes}
          dislikes={movie.dislikes}
          onReact={handleReaction}
          onEdit={handleEditClick}
          onDelete={handleDelete}
          movie={movie}
        />
      ))}
    </>
  );
};

export default Movies;
