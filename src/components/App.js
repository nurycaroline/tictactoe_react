import React, { Component } from "react";
import "../assets/style.css";
import { Header } from "./Header";
import Board from "./Board";

class App extends Component {
  render() {
    return (
      <div>
        <Header />
        <Board />
      </div>
    );
  }
}

export default App;
