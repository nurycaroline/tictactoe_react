import React, {Component } from  "react";

export default class Question extends Component {
	constructor(props){
		super(props);
		this.state = {
			player: true, 
			optionPlayer: "",
			letter: false,
			optionLetter: ""
		}
	}

	changeStatePlayer = (optionPlayer) => {
		this.setState({
			player: false,
			optionPlayer: optionPlayer,
			letter: true
		})
	}

	changeStateLetter = (optionLetter) => {
		let {optionPlayer} = this.state;
		this.props.handleClick({
			optionPlayer, optionLetter
		})
	}
	
	render() {
		let {player, letter} = this.state;
		return(
			<div>
				{
					player ?
						<div>
							<h1 className='title grey'>How do you want to play?</h1>
							<div className='buttons'>
								<button onClick={() => this.changeStatePlayer("ONEPLAYER")} className='button b-red'>ONE PLAYER</button>
								<button onClick={() => this.changeStatePlayer("TWOPLAYER")} className='button b-blue'>TWO PLAYER</button>
							</div>
						</div>
					: letter ? 
						<div>
							<h1 className='title grey'>Would you like to be X or O?</h1>
							<div className='buttons'>
								<button onClick={() => this.changeStateLetter("X")} className='button b-red'>X</button>
								<button onClick={() => this.changeStateLetter("O")} className='button b-blue'>O</button>
							</div>
						</div>
					: ""
				}
			</div>
		)
	}
}