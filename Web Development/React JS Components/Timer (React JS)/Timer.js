import React from 'react';
import ReactDOM from 'react-dom';

class Timer extends React.Component{
	constructor(props){
		super(props);
		const date = new Date(this.props.endTime * 1000);
		this.state = {
			endTime: this.props.endTime, // End time in seconds
			hours: date.getHours()-7, // Hours left
			minutes: date.getMinutes(), // Minutes left
			seconds: date.getSeconds(), // Seconds left
		};

		this.countDown = this.countDown.bind(this);
	}

	countDown(){
		// Update endTime
		this.setState((state) => {
			const date = new Date((state.endTime * 1000)-1);
			return {
				endTime: --state.endTime,
				hours: date.getHours()-7,
				minutes: date.getMinutes(),
				seconds: date.getSeconds(),
			};
		});
	}

	componentDidMount(){
		//Only when end time is not zero
		if(this.state.endTime !== 0){
			setTimeout(this.countDown, 1000);
		}
	}

	componentDidUpdate(){
		//Only when end time is not zero
		if(this.state.endTime !== 0){
			setTimeout(this.countDown, 1000);
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