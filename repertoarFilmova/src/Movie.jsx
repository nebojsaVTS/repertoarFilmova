const Movie = (props) => {
  return (
    <div style={{ display: "flex" }}>
      <img src="https://i.pinimg.com/736x/aa/f7/05/aaf705e06726ce3881288ae4be3ac5fe.jpg" />
      <h2>
        {props.title}, {props.hall}, {props.price}
      </h2>
    </div>
  );
};

export default Movie;
