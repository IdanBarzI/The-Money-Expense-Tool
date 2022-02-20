import React, { useContext } from "react";
import "./EndMonthMoney.css";
import AppContext from "../../../context/AppContext";

const EndMonthMoney = () => {
  const context = useContext(AppContext);
  return (
    <div className="continer">
      <div className="txt">
        the money you will have at the end of the month:
      </div>
      <div className="money">{context?.user.endMonthMoney}$</div>
    </div>
  );
};

export default EndMonthMoney;
