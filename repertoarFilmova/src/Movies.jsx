import React, { useState, useEffect } from "react";
import Movie from "./Movie";
import MovieForm from "./MovieForm";
import { getMovies } from "./services/movieService";
import { useNavigate } from "react-router-dom";

const Movies = () => {
  const today = new Date();
  const day = today.getDate();
  const month = today.getMonth() + 1;
  const year = today.getFullYear();
  const formattedDate = `${day}.${month}.${year}.`;

  const [editingMovie, setEditingMovie] = useState(null);
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
    }
  }, [movies]);

  const handleReaction = (title, action) => {
    const updatedMovies = movies.map((movie) => {
      if (movie.name === title) {
        if (action === "Like") {
          return { ...movie, likes: movie.likes + 1 };
        } else {
          return { ...movie, dislikes: movie.dislikes + 1 };
        }
      }
      return movie;
    });

    setMovies(updatedMovies);
  };

  const handleEditClick = (movie) => {
    navigate(`/movies/edit/${movie.id}`);
  };

  const handleSaveMovie = (movieData) => {
    if (editingMovie) {
      const updatedMovies = movies.map((movie) =>
        movie.title === editingMovie.title
          ? {
              ...movie,
              title: movieData.title,
              hall: movieData.hall,
              price: movieData.price,
              poster: movieData.poster,
            }
          : movie,
      );

      setMovies(updatedMovies);
      setEditingMovie(null);
    } else {
      setMovies([
        ...movies,
        {
          ...movieData,
          likes: Math.floor(Math.random() * 5) + 1,
          dislikes: Math.floor(Math.random() * 5) + 1,
        },
      ]);
    }
  };

  const handleCancelEdit = () => {
    setEditingMovie(null);
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

      <MovieForm
        key={editingMovie ? editingMovie.id : "new"}
        onSaveMovie={handleSaveMovie}
        editingMovie={editingMovie}
        onCancelEdit={handleCancelEdit}
      />

      <br />

      {movies.map((movie, index) => (
        <Movie
          key={index}
          title={movie.name}
          hall={movie.hall}
          price={movie.price}
          poster={movie.poster}
          likes={movie.likes}
          dislikes={movie.dislikes}
          onReact={handleReaction}
          onEdit={handleEditClick}
          movie={movie}
        />
      ))}
    </>
  );
};

export default Movies;
