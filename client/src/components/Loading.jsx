import React from "react";
import LoadingPikachu from "./Images/LoadingPikachu.gif"

function Loading(){
  return (
    <div className="loading-container">
      <div className="loading-img-info">
        <img src={LoadingPikachu} alt="img not found"/>
        <h2 className="loading-text">Loading...</h2>
      </div>
    </div>
  )
}

export default Loading;