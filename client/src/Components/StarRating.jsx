import React from "react";

const StarRating = ({ rating }) => {
  const stars = [];
  for (let i = 1; i <= 5; i++){
    if (i <= rating){
        stars.push(<i className="fas fa-star" key={i}></i>);
    } else if (i === Math.ceil(rating) && !Number.isInteger(rating)) {
        stars.push(<i className="fas fa-star-half-alt" key={i}></i>);
    } else {
        stars.push(<i className="far fa-star" key={i}></i>)
    }
  }
  return (
    <>
        {stars}
    </>
  );
};

export default StarRating;
