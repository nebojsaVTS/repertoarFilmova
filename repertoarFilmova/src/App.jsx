import React from "react";
import Movie from "./Movie";

const today = new Date();
const day = today.getDate();
const month = today.getMonth() + 1;
const year = today.getFullYear();
const formattedDate = `${day}.${month}.${year}.`;

const App = () => {
  const movies = [
    {
      title: "Captain America - The First Avenger",
      hall: 2,
      price: 350,
    },
    {
      title: "The Papillon",
      hall: 1,
      price: 300,
    },
    {
      title: "The Lost City of Z",
      hall: 5,
      price: 350,
    },
  ];

  return (
    <>
      <h1>Repertoar za danas ({formattedDate})</h1>

      {movies.map((movie, index) => (
        <Movie
          key={index}
          title={movie.title}
          hall={movie.hall}
          price={movie.price}
        />
      ))}
    </>
  );
};

export default App;
