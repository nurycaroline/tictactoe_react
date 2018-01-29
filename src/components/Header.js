import React from "react";
import logoImg from "../assets/188169.svg";

export const Header = () => {
  return (
    <div className="header">
      <img className="imageLogo" src={logoImg} alt="Tic Tac Toe" />
      <div className="title">
        <span className="red"> TIC </span>
        <span className="grey"> TAC </span>
        <span className="blue"> TOE </span>
      </div>
    </div>
  );
};
