import React from "react";

const today = new Date();

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
    <div>
      <h1>{today.toDateString()}</h1>
    </div>
  );
};

export default App;
