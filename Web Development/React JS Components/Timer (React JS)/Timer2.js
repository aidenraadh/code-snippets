import React from 'react';
import ReactDOM from 'react-dom';

class Timer2 extends React.Component{
	constructor(props){
		super(props);
		this.state = {
			endTime: this.props.endTime, // End time in seconds
			passedTime: 0, // Passed time in seconds
			hours: 0, // Passed hours
			minutes: 0, // Passed minutes
			seconds: 0, // Passed seconds
		};

		this.countUp = this.countUp.bind(this);
	}

	countUp(){
		// Update endTime
		this.setState((state) => {
			const date = new Date((state.passedTime * 1000)+1);
			return {
				passedTime: ++state.passedTime,
				hours: date.getHours()-7,
				minutes: date.getMinutes(),
				seconds: date.getSeconds(),
			};
		});
	}

	componentDidMount(){
		//Only when end time is not zero
		if(this.state.passedTime <= this.state.endTime){
			setTimeout(this.countUp, 1000);
		}
	}

	componentDidUpdate(){
		//Only when end time is not zero
		if(this.state.passedTime <= this.state.endTime){
			setTimeout(this.countUp, 1000);
		}
	}

	render(){
		return (
			<>
			<span>
			{
				this.state.hours < 10 ?
				'0'+String(this.state.hours):
				this.state.hours
			}
			</span> : 
			<span>
			{
				this.state.minutes < 10 ?
				'0'+String(this.state.minutes):
				this.state.minutes
			}
			</span> : 
			<span>
			{
				this.state.seconds < 10 ?
				'0'+String(this.state.seconds):
				this.state.seconds
			}
			</span>								
			</>
			//
		);
	}
}

ReactDOM.render(
	<Timer 
	//Duration of the timer, must be in seconds
	endTime={10}
	/>,
	document.getElementById('Timer')
);	

