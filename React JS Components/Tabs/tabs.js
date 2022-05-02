class Tabs extends React.Component{
	constructor(props){
		super(props);

		this.state = {
			panelStats: this.props.tabs.map((tab) => {
				if(tab.panelID === this.props.currentPanelID){
					return {id: tab.panelID, active: true, shown: true};
				}
				else{
					return {id: tab.panelID, active: false, shown: false};
				}
			}),

			currentPanelID: this.props.currentPanelID
		};

		this.changeCurrentPanel = this.changeCurrentPanel.bind(this);
		this.showCurrentPanel = this.showCurrentPanel.bind(this);
	}

	changeCurrentPanel(panelID){
		this.setState((state) => {
			const newPanelStats = state.panelStats.map((stats) => {
				if(stats.id === state.currentPanelID){
					return {id: stats.id, active: true, shown: false};
				}
				else{
					return stats;
				}
			});

			return {
				panelStats: newPanelStats, currentPanelID: panelID
			};
		});
	}

	showCurrentPanel(){
		this.setState((state) => {
			const newPanelStats = state.panelStats.map((stats) => {
				if(stats.id === state.currentPanelID){
					return {id: stats.id, active: true, shown: true};
				}
				else{
					return {id: stats.id, active: false, shown: false};
				}
			});

			return {
				panelStats: newPanelStats
			};
		});
	}	

	render(){
		return (
			<>
			<ul className="tabs"role="tablist">
			{
				this.props.tabs.map((tab, key) => (
			  	<li key={key} className="tab-item">
			  	  <a className={'tab-link '+(tab.panelID === this.state.currentPanelID ? 'active' : '')}
			  	  	href={'#'+tab.panelID}
			  	  	aria-controls={tab.panelID} aria-selected={(tab.panelID === this.state.currentPanelID ? 'true' : 'false')}
			  	  	role="tab" data-toggle="tab" onClick={() => this.changeCurrentPanel(tab.panelID)}
			  	  >
			  	  	{tab.link}
			  	  </a>
			  	</li>		
				))
			}
			</ul>
			<div className="tab-content">
			{
				this.props.tabs.map((tab, key) => (
			  	<div key={key} className={
			  			'tab-pane '+
			  			(this.state.panelStats[key].active ? 'active ' : '')+
			  			(this.state.panelStats[key].shown ? 'shown' : '')
			  		}
			  		id={tab.panelID} aria-labelledby={tab.panelID+'-tab'} role="tabpanel"
			  		onTransitionEnd={this.showCurrentPanel}
			  	>
			  	  {tab.panelContent}
			  	</div>	
				))
			}
			</div>
			</>
		);//
	}
}

/*

########## CSS ##########

### BASE STYLE ###

*{
	margin: 0;
	padding: 0;
	box-sizing: border-box;
}

html{
	font-size: 10px;
	scroll-behavior: smooth;
}

body {
  margin: 0;
  font-family: -apple-system, BlinkMacSystemFont, 'Segoe UI', 'Roboto', 'Oxygen',
    'Ubuntu', 'Cantarell', 'Fira Sans', 'Droid Sans', 'Helvetica Neue',
    sans-serif;
  -webkit-font-smoothing: antialiased;
  -moz-osx-font-smoothing: grayscale;
}

code {
  font-family: source-code-pro, Menlo, Monaco, Consolas, 'Courier New',
    monospace;
}

h1,h2,h3,h4,h5,h6,th{
	font-weight: normal;
}

address{
	font-style: normal;
}

a{
	text-decoration: none;
	cursor: pointer;
	color: inherit;
}

button{
	border: none;
	cursor: pointer;
	outline: none;
	background-color: transparent;
}

button:focus{
	outline: none;
}

input, select, textarea{
	outline: none;
}

input:focus, select:focus {
    outline-offset: 0;
}

### TABs STYLE ###

.tabs {
  display: flex;
  list-style: none;
}

.tabs .tab-item {
}

.tabs .tab-link {
  font-size: 1.6rem;
  text-decoration: none;
}

.tabs .tab-link:hover, .tabs .tab-link:focus {
}

.tabs .tab-link.active{
  text-decoration: underline;
}

.tab-content{
  display: flex;
  overflow: hidden;
}

.tab-content > .tab-pane {
  position: absolute;
  top: 0; left: -110%;
  overflow: hidden;
  width: 1px;
  height: 1px;
  flex-shrink: 0;
  font-size: 1.6rem;
  opacity: 0;
  transition: opacity 0.3s ease;
}

.tab-content > .tab-pane.active{
  position: static;
  top: auto; left: auto;
  overflow: visible;
  width: 100%;
  height: auto;
}

.tab-content > .tab-pane.shown{
  opacity: 1;
}

*/