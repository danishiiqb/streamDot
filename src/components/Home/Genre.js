import React from "react";

function Genre({ children, src }) {
  return (
    <div className="genre">
      <div className="genre__img-bx">
        <img src={src} alt="" />
      </div>
      <h4>{children}</h4>
    </div>
  );
}

export default Genre;
