import React, {Component} from 'react';
import Index from '../pages/index';
class DownArrowSVG extends Component{


    constructor(props) {
        super(props);
        this.state= {
            rectHeight:this.props.arrowSize,

            };

    }
    x=30;

    arrowStyle={
        width:this.x,
        height:this.props.arrowSize+30,
        display: 'block',
        marginLeft: 'auto',
        marginRight: 'auto'}



    triangle ={
        fill: 'transparent',
    stroke: 'white',
    strokeWidth: 8,
    transition: 'all 0.8s ease-in-out',
    }




    render(){
        return(
                <div style={{width:this.x,
                    height:this.props.arrowSize+30,
                    display: 'block',
                    marginLeft: 'auto',
                    marginRight: 'auto'}}>
                <div  style={{width:this.x, height:this.props.arrowSize}}>
                    <svg width="33.3%" height="100%" style={{marginLeft:'33%'}}>
                    <rect width="100%" height="100%" style={{fill:this.props.arrowColor}} />
                    Sorry, your browser does not support inline SVG.
                </svg></div>
                    <div>
                    <svg height={this.x} width={this.x}>
                        <polygon points={`${this.x}, ${this.x - this.x} ${this.x / 2}, ${this.x} ${this.x-this.x}, ${this.x-this.x}`} fill={this.props.arrowColor}  />
                        Sorry, your browser does not support inline SVG.
                    </svg>
                </div>
                </div>

        )
    }
}


export default DownArrowSVG;