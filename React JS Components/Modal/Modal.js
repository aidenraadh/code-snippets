import React from 'react';

/*
|--------------------------------------------------------------------------
| Modal
|--------------------------------------------------------------------------
|
| Must declared properties:
|
| #1 heading
| Represents the heading of the modal
|
| heading = (str/JSX)heading
|
| #2 body
| Represents the body of the modal
|
| body = (str/JSX)body
|
| #modalid
| Represents the id of the modal
|
| modalid = (str)modalid
|
| #getToggleMdl
| Represents function from the parent component.
| This function will make the component have access
| to toggleModal() function
|
| modalid = (str)modalid
|
*/

class Modal extends React.Component{

    constructor(props){
        super(props);
        this.modalRef = React.createRef();

        this.toggleModal = this.toggleModal.bind(this);

    }

    toggleModal(modalShown){
    	const modal = this.modalRef.current;
    	let modalOverlay = modal.children[0];
    	let modalContent = modalOverlay.children[0];

      // Show the modal
		  if(modalShown){
		  	modal.classList.add('shown');
		  	modalOverlay.addEventListener('transitionend', function(){
		  		modalContent.classList.add('shown');
		  	}, {once: true});
		  }
		  // Hide the modal
		  else{
		  	modalContent.classList.remove('shown');
		  	modalContent.addEventListener('transitionend', function(){
		  		modal.classList.remove('shown');
		  	}, {once: true});
		  }
    }

    componentDidMount(){
    	// Call parent's getToggleMdl function, give
    	// toggleModal() function as argument so that
    	// the parent can have access to this function
        this.props.getToggleMdl(this.toggleModal);
    }

    render(){

        return (
            <>
			<section id={this.props.modalid} className="modal" ref={this.modalRef}>
				<div className="overlay">
					<div className="content">
					  	<div className="header">
					  	  	<h6>{this.props.heading}</h6>
					  	  	<button type="button" onClick={() => this.toggleModal(false)}>&times;</button>
					  	</div>
					  	<div className="body section_padding">
					  		{this.props.body}
					  	</div>
					  	<div className="footer section_padding"></div>
					</div>  		
				</div>          	
			</section>	
            </>
            //
        );
    }
}

export default Modal;

/*
PARENT COMPONENT STRUCTURE

class Parent extends React.Component{
	constructor(props){
		super(props);

		this.state = {
			toggleModal: null, // state to contain toggleModal() function
		};

		this.getToggleMdl = this.getToggleMdl.bind(this);
	}

	getToggleMdl(toggleModal){
		this.setState({
			toggleModal: toggleModal,
		});
	}

	render(){
		return (
			<>
			<button type="button" onClick={() => this.state.toggleModal(true)}>Open modal</button>
			<Modal
				modalid = {'testModal'}
				heading = {'Modal Heading'}
				body = {<p>Modal body</p>}
				getToggleMdl = {this.getToggleMdl}
			/>
			</>
			//
		);
	}
}
*/

/*
CSS

*{
  margin: 0;
  padding: 0;
  box-sizing: border-box;
}

html{
  font-size: 10px;
}
   
.modal{
  position: fixed;
  top: 0; left: 0;
  z-index: 99;
  width: 100vw;
  height: 100vh;
  visibility: hidden;
}

.modal.shown{
  visibility: visible;
}

.modal .overlay{
  position: absolute;
  top: 0; left: 0;
  display: flex;
  width: 100%;
  height: 100%;
  flex-direction: row;
  justify-content: center;
  align-items: center;
  background-color: rgba(0,0,0,0.3);
  opacity: 0;
  transition: opacity 0.3s;
}

.modal.shown .overlay{
  opacity: 1;
}

.modal .content{
  border-radius: 4px;
  opacity: 0;
  color: #6C7293;
  background-color: #FFFFFF;
  transition: opacity 0.3s;
}

.modal .content.shown{
  opacity: 1;
}

.modal .header{
  display: flex;
  justify-content: space-between;
  border-bottom: 1px solid #ebedf2;
}

.modal h6{
  font-size: 2.4rem;
  font-family: 'Roboto', sans-serif;
  font-weight: 500;
}

.modal .body{
  width: 40rem;
  min-height: 20rem;
  border-bottom: 1px solid #ebedf2;
  font-family: 'Roboto', sans-serif;
  font-size: 1.55rem;
}  

*/