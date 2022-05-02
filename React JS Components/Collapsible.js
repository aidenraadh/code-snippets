export default class Collapsible extends React.Component{
    constructor(props){
		super(props);
		this.state = {
			maxHeight: 0,
		};
		this.myRef = React.createRef();
	}

	componentDidUpdate(prevProps){

		if(prevProps.expanded !== this.props.expanded || prevProps.body !== this.props.body){

			this.setState({
				maxHeight: (this.props.expanded ? this.myRef.current.scrollHeight+'px' : 0)
			});
		}
	}

    render(){
		const Tag = (this.props.tag ? this.props.tag : 'div');
		const classes = (this.props.classes ? ' '+this.props.classes : '');
		
		let attr = {...this.props.attr};
		attr['style'] = (attr['style'] ?
			{...attr['style'], maxHeight: this.state.maxHeight} : {maxHeight: this.state.maxHeight}
		);

		return (
			<Tag id={this.props.name} className={'collapsible'+(this.props.expanded ? ' expanded' : '')+classes}
			{...attr} ref={this.myRef}>
				{this.props.body}
			</Tag>
		);
    }
}

/*
CSS

.collapsible{
	overflow: hidden;
	max-height: 0;
	transition: max-height 0.3s;
}
*/

/*
Example:

<Collapsible
	body={'body'}
	expanded={true|false}
	tag={'div'} // optional
	classes={'some classes'} // optional
	attr={{  }} // optional
/>
*/