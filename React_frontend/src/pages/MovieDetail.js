import React from "react";
import { useParams } from "react-router-dom";
import { useLocation } from "react-router";
import Details from "../components/AllMovie/Details";

const MovieDetail = () => {
  const location = useLocation();
  const movie = location.state?.movie;

  console.log(movie);
  return (
    <>
      <Details movie={movie} key={movie.id} />
    </>
  );
};

export default MovieDetail;
