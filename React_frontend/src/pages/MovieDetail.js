import React from "react";
import Details from "../components/AllMovie/Details";
import DetailComment from "../components/AllMovie/DetailComment";
import DetailCommentList from "../components/AllMovie/DetailCommentList";

const MovieDetail = () => {
  return (
    <>
      <Details/>
      <DetailComment/>
      <DetailCommentList/>
    </>
  );
};

export default MovieDetail;
