import React from "react";
import { useParams } from "react-router-dom";
import { useLocation } from "react-router";

const MovieDetail = ({ location }) => {
  return (
    <div style={{ width: "1000px", height: "1000px" }}>
      {location.state.form}
    </div>
  );
};

export default MovieDetail;
