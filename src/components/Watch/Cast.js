import React from "react";

function Cast({ data }) {
  return (
    <div className="cast">
      <h3 className="heading__second">Cast & Crew</h3>
      <div className="cast__bx">
        {data.map((el, id) => {
          return (
            <div className="cast__itm" key={id}>
              <div className="cast__img">
                <img
                  src={`http://image.tmdb.org/t/p/original${el.profile_path}`}
                  alt=""
                />
              </div>
              <div className="cast__inf">
                <div>{el.name}</div>
                <div>{el.character}</div>
              </div>
            </div>
          );
        })}
      </div>
    </div>
  );
}

export default Cast;
