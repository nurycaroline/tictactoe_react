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
							<div className='buttoms'>
								<buttom onClick={() => this.changeStatePlayer("ONEPLAYER")} className='buttom b-red'>ONE PLAYER</buttom>
								<buttom onClick={() => this.changeStatePlayer("TWOPLAYER")} className='buttom b-blue'>TWO PLAYER</buttom>
							</div>
						</div>
					: letter ? 
						<div>
							<h1 className='title grey'>Would you like to be X or O?</h1>
							<div className='buttoms'>
								<buttom onClick={() => this.changeStateLetter("X")} className='buttom b-red'>X</buttom>
								<buttom onClick={() => this.changeStateLetter("O")} className='buttom b-blue'>O</buttom>
							</div>
						</div>
					: ""
				}
			</div>
		)
	}
}