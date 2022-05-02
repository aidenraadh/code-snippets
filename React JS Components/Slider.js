import React from 'react';

export default class Slider extends React.Component{
	constructor(props){
        super(props);
        this.wrapper = React.createRef();

        this.state = {
            current_item: 1,
            trans_dur: 0,
            is_animating: false,
        };

        this.prev = this.prev.bind(this);
        this.next = this.next.bind(this);
    }

    prev(){
        this.setState((state, props) => {
            let updtd_state = {};

            if(!state.is_animating){
                updtd_state['current_item'] = state.current_item-1;
                updtd_state['trans_dur'] = (props.slide_dur ? props.slide_dur : 300);
                updtd_state['is_animating'] = true;
            }

            return updtd_state;
        });
    }

    next(){
        this.setState((state, props) => {
            let updtd_state = {};

            if(!state.is_animating){
                updtd_state['current_item'] = state.current_item+1;
                updtd_state['trans_dur'] = (props.slide_dur ? props.slide_dur : 300);
                updtd_state['is_animating'] = true;
            }

            return updtd_state;
        });
    }
    
    componentDidMount(){
        const cloned_first_item = this.wrapper.current.firstChild.cloneNode(true);
        cloned_first_item.setAttribute('aria-hidden', true);

        const cloned_last_item = this.wrapper.current.lastChild.cloneNode(true);
        cloned_last_item.setAttribute('aria-hidden', true);
        
        this.wrapper.current.insertBefore(cloned_last_item, this.wrapper.current.firstChild);
        this.wrapper.current.append(cloned_first_item);

        const items_l = this.props.items.length;
        this.wrapper.current.addEventListener('transitionend', () => {
            this.setState((state) => {
                let updtd_state = {};

                if(state.current_item === 0 || state.current_item === items_l + 1){
                    switch(state.current_item){
                        case 0: updtd_state['current_item'] = items_l; break;
                        case (items_l+1): updtd_state['current_item']= 1; break;
                        default: null;        
                    }

                    updtd_state['trans_dur'] = 0;
                }
                updtd_state['is_animating'] = false;

                return updtd_state;
            });
        });
    }

	render(){
        const root = this.props.root;
        const Tag = (this.props.tag ? this.props.tag : 'div');
        const classes = (this.props.classes ? ' '+this.props.classes : '');
    
        return (<>
            <Tag className={'slider'+classes} id="testslider" {...this.props.attr}>
                <div className="slider-wrapper" ref={this.wrapper} style={{
                    transitionDuration: this.state.trans_dur+'ms',
                    transform: 'translateX('+(-1*this.state.current_item)+'00%)',
                }}>
                    {this.props.items.map((item, key) => (

                    <div className="slider-item" key={key}>
                        {item}
                    </div>

                    ))}                      
                </div>
            </Tag>
            <button type="button" onClick={this.prev}>Prev</button>
            <button type="button" onClick={this.next}>Next</button>
        </>);
	}
}

/* 
Example:

<Slider
    items={array_of_JSX}
    slide_dur={600} // optional
    tag={'div'} // optional
    classes={'some_classes'} // optional
    attr={{id: 'test'}} // optional
/>

 */

 /*
 CSS

 .slider{
    display: flex;
    overflow-x: hidden;
}

.slider-wrapper{
    display: flex;
    width: 100%;
    overflow-x: visible;
    transition-property: transform;
    transition-duration: 0;
}

.slider-item{
    flex-shrink: 0;
    width: 100%;
}
 */
 