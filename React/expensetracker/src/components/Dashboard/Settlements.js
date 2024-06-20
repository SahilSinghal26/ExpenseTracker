import React from "react";
import "./Settlements.css"

const Settlements = () => {
  return (
    <div className="settlements-page-container">
      <div className="give-money">
        <h2>You owe: </h2>
      </div>
      <div className="take-money">
        <h2>you are owed:</h2>
      </div>
    </div>
  );
};

export default Settlements;
