import React from "react";

const AuthorInfo = () => {
  return (
    <div>
      <h2>Informacije o autoru</h2>
      <p style={{ width: "600px", textAlign: "justify" }}>
        Autor aplikacije je Nebojša Nedeljković.
        <br />
        <br />
        Lorem ipsum dolor sit amet, consectetur adipiscing elit. Ovaj autor se
        bavi razvojem modernih web aplikacija koristeći React. Cilj ovog
        projekta je testiranje funkcionalnosti rutiranja.
      </p>
    </div>
  );
};
export default AuthorInfo;
