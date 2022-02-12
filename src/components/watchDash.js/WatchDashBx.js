import React from "react";
import { useHistory } from "react-router-dom";
import { useGlobal } from "../../context/GlobalContext";

function WatchDashBx({ userInfo, id, connAcc, cl, stcl, type }) {
  const { setUserSelected } = useGlobal();
  const history = useHistory();

  return (
    <div
      className={`watchDash__bx ${id === cl ? "click" : ""}`}
      onClick={() => {
        stcl(id);
        setUserSelected(userInfo);
        type = type.slice(0, 2);
        setTimeout(() => {
          history.push(`/home/in`);
        }, 300);
      }}
    >
      <img
        src={connAcc ? userInfo.imgAv : userInfo.photoUrl}
        className="watchDash__img"
        alt=""
      />
      <h4 className="watchDash__nm">{userInfo.userName}</h4>
    </div>
  );
}

export default WatchDashBx;
