import React, { Component } from "react";

export default class Board extends Component {
  constructor(props) {
    super(props);
    this.state = {
      turn: "X",

      pos11: "",
      pos12: "",
      pos13: "",
      pos21: "",
      pos22: "",
      pos23: "",
      pos31: "",
      pos32: "",
      pos33: "",

      playOne: true,
      playTwo: false,

      block: false,
      openModalWinner: false,
      mensagemModalWinner: "",
      qtdJogadas: 0
    };
  }

  selectPlayer = () => {
    if (!this.verifyWinner()) {
      this.props.turnChange();

      if (this.props.optionPlayer === "ONEPLAYER") {
        this.setState({ block: true });
        this.playComputer();
      }
    }
  };

  imageLetter = (letter) => {
    if (letter === "X"){
      return "X"
    }else if (letter === "O") {
      return "O"
    }
  }

  clickRow = position => {
    if (!this.state[position]) {
      let { playOne } = this.props.turn;
      let { letterPlayOne, letterPlayTwo } = this.props;

      this.setState(
        {
          [position]: playOne ? this.imageLetter(letterPlayOne) : this.imageLetter(letterPlayTwo),
          qtdJogadas: this.state.qtdJogadas + 1
        },
        this.selectPlayer
      );
    }
  };

  cleaBoard = () => {
    this.setState({
      pos11: "",
      pos12: "",
      pos13: "",
      pos21: "",
      pos22: "",
      pos23: "",
      pos31: "",
      pos32: "",
      pos33: "",
      qtdJogadas: 0
    });
  };

  verifyLines = (letter) => {
    let {pos11, pos12, pos13, pos21, pos22, pos23, pos31, pos32, pos33} = this.state;
    if (
      (pos11 === letter && pos12 === letter && pos13 === letter) ||
      (pos21 === letter && pos22 === letter && pos23 === letter) ||
      (pos31 === letter && pos32 === letter && pos33 === letter)
    ) {
      return true;
    }
    return false;
  };

  verifyColumn = (letter) => {
    let {pos11, pos12, pos13, pos21, pos22, pos23, pos31, pos32, pos33} = this.state;
    if (
      (pos11 === letter && pos21 === letter && pos31 === letter) ||
      (pos12 === letter && pos22 === letter && pos32 === letter) ||
      (pos13 === letter && pos23 === letter && pos33 === letter)
    ) {
      return true;
    }
    return false;
  };

  verifyDiagonal = (letter) => {
    let {
      pos11,
      pos13,
      pos22,
      pos31,
      pos33
    } = this.state;
    if (
      (pos11 === letter && pos22 === letter && pos33 === letter) ||
      (pos13 === letter && pos22 === letter && pos31 === letter)
    ) {
      return true;
    }
    return false;
  };

  verifyWinner = () => {
    let { playOne } = this.props.turn;
    let { letterPlayOne, letterPlayTwo } = this.props;
    let letter = playOne ? letterPlayOne : letterPlayTwo;
    let hasWinner = false;
    let {
      qtdJogadas
    } = this.state;

    if (this.verifyLines(letter) || this.verifyColumn(letter) || this.verifyDiagonal(letter)) {
      hasWinner = true;
    }

    if (hasWinner) {
      this.props.setPoints(playOne ? "ONEPLAYER" : "TWOPLAYER");
      this.cleaBoard();
      this.setState({
        openModalWinner: true,
        mensagemModalWinner: `${playOne ? "ONEPLAYER" : "TWOPLAYER"}, YOU WIN !`
      });
      return true;
    }

    if (qtdJogadas === 9 && !hasWinner) {
      this.setState({
        openModalWinner: true,
        mensagemModalWinner: `Empate !`
      });
      this.cleaBoard();
    }

    return false;
  };

  playComputer = () => {
    let line = Math.floor(Math.random() * 3 + 1);
    let column = Math.floor(Math.random() * 3 + 1);
    let position = `pos${line}${column}`;
    let positionValue = this.state[position];

    if (!positionValue) {
      setTimeout(() => {
        let { letterPlayTwo } = this.props;
        this.setState({ [position]: this.imageLetter(letterPlayTwo), block: false }, () => {
          this.verifyWinner();
          this.props.turnChange();
        });
      }, 1000);
    } else {
      this.playComputer();
    }
  };

  render() {
    let {
      pos11,
      pos12,
      pos13,
      pos21,
      pos22,
      pos23,
      pos31,
      pos32,
      pos33,
      block,
      openModalWinner,
      mensagemModalWinner
    } = this.state;

    return (
      <div>
        <div className="row row-one">
          <div className={`one ${pos11}`} onClick={() => this.clickRow("pos11")}>
            {pos11}
          </div>
          <div className={`two ${pos12}`} onClick={() => this.clickRow("pos12")}>
            {pos12}
          </div>
          <div className={`three ${pos13}`} onClick={() => this.clickRow("pos13")}>
            {pos13}
          </div>
        </div>
        <div className="row row-two">
          <div className={`one ${pos21}`} onClick={() => this.clickRow("pos21")}>
            {pos21}
          </div>
          <div className={`two ${pos22}`} onClick={() => this.clickRow("pos22")}>
            {pos22}
          </div>
          <div className={`three ${pos23}`} onClick={() => this.clickRow("pos23")}>
            {pos23}
          </div>
        </div>
        <div className="row row-three">
          <div className={`one ${pos31}`} onClick={() => this.clickRow("pos31")}>
            {pos31}
          </div>
          <div className={`two ${pos32}`} onClick={() => this.clickRow("pos32")}>
            {pos32}
          </div>
          <div className={`three ${pos33}`} onClick={() => this.clickRow("pos33")}>
            {pos33}
          </div>
        </div>

        {block && <div className={`block`}>Thinking...</div>}

        {openModalWinner && (
          <div className="modal">
            <div className="content">
              <h1>{mensagemModalWinner}</h1>
              <buttom
                className="next"
                onClick={() => this.setState({ openModalWinner: false })}
              >
                {" "}
                NEXT GAME
              </buttom>
            </div>
          </div>
        )}
      </div>
    );
  }
}
