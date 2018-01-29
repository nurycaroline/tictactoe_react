import React, { Component } from "react";
import Question from "./Question";
import BoardGame from "./BoardGame";
import Points from "./Points";

export default class Board extends Component {
  constructor(props) {
    super(props);
    this.state = {
      options: {},
      points: {
        playOne: 0,
        playTwo: 0
      },
      turn: {
        playOne: true,
        playTwo: false
      }
    };
  }

  setPoints = (player) => {
    let { playOne, playTwo } = this.state.points;
    playOne = player === "ONEPLAYER" ? playOne + 1 : playOne;
    playTwo = player === "TWOPLAYER" ? playTwo + 1 : playTwo;
    this.setState({points: {playOne, playTwo}})
  }

  handleClick = options => {
    this.setState({ options: options });
  };

  turnChange = () => {
		let { playOne, playTwo } = this.state.turn;
		
    this.setState({
			turn: {
				playOne: !playOne,
        playTwo: !playTwo
      }
    });
  };

  render() {
    let { options, points, turn } = this.state;
    let turnClass =
      Object.keys(options).length > 0
        ? `turn turn-${turn.playOne ? "red" : "blue"}`
        : "";

    return (
      <div>
        {Object.keys(options).length > 0 && (
          <div className={`legenda-${turn.playOne ? "red" : "blue"}`}>
            {turn.playOne ? "Player one" : "Player Two"}
          </div>
        )}
        <div className={`board ${turnClass}`}>
          {Object.keys(options).length === 0 ? (
            <Question handleClick={this.handleClick} />
          ) : (
            <div>
              <div className="header-board">
                <button onClick={() => window.location.reload() }>Reset</button>
                <Points
                  pointsPlayOne={points.playOne}
                  pointsPlayTwo={points.playTwo}
                />
              </div>
              <BoardGame
                turn={turn}
								optionPlayer={options.optionPlayer}
                turnChange={() => this.turnChange()}
                letterPlayOne={options.optionLetter}
                letterPlayTwo={options.optionLetter === "X" ? "O" : "X"}
                setPoints={this.setPoints}
              />
            </div>
          )}
        </div>
      </div>
    );
  }
}
