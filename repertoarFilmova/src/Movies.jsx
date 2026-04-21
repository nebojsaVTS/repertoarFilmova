import React, { useState } from "react";
import Movie from "./Movie";
import MovieForm from "./MovieForm";

const Movies = () => {
  const today = new Date();
  const day = today.getDate();
  const month = today.getMonth() + 1;
  const year = today.getFullYear();
  const formattedDate = `${day}.${month}.${year}.`;

  const [editingMovie, setEditingMovie] = useState(null);

  const [movies, setMovies] = useState([
    {
      title: "Captain America - The First Avenger",
      hall: 2,
      price: 350,
      poster:
        "https://m.media-amazon.com/images/I/51Xp+8qDCbL._AC_UF350,350_QL50_.jpg",
      likes: 0,
      dislikes: 0,
    },
    {
      title: "The Papillon",
      hall: 1,
      price: 300,
      poster:
        "https://m.media-amazon.com/images/M/MV5BMjIxMTMyOTE2NF5BMl5BanBnXkFtZTgwMDYyNzY1NTM@._V1_.jpg",
      likes: 0,
      dislikes: 0,
    },
    {
      title: "The Lost City of Z",
      hall: 5,
      price: 350,
      poster:
        "https://m.media-amazon.com/images/M/MV5BZmU2ODIyMWItMjU3Zi00ZmVhLWIyNDAtMWE5OWU2ZDExMGFiXkEyXkFqcGc@._V1_FMjpg_UX1000_.jpg",
      likes: 0,
      dislikes: 0,
    },
    {
      title: "Klaus",
      hall: 3,
      poster: "https://m.media-amazon.com/images/I/7128yjOjl9L.jpg",
      likes: 0,
      dislikes: 0,
    },
    {
      title: "Bullet Train",
      poster:
        "https://m.media-amazon.com/images/I/71INz6LX8aL._AC_UF894,1000_QL80_.jpg",
      likes: 0,
      dislikes: 0,
    },
  ]);

  const handleReaction = (title, action) => {
    const updatedMovies = movies.map((movie) => {
      if (movie.title === title) {
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
    setEditingMovie(movie);
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
          likes: 0,
          dislikes: 0,
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

      <MovieForm
        key={editingMovie ? editingMovie.title : "new"}
        onSaveMovie={handleSaveMovie}
        editingMovie={editingMovie}
        onCancelEdit={handleCancelEdit}
      />

      <br />

      {movies.map((movie, index) => (
        <Movie
          key={index}
          title={movie.title}
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
