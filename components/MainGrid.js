import React, {Component} from 'react';
import {Paper,Button} from '@material-ui/core';
import DownArrowSVG from './DownArrowSVG.js'
import Index from '../pages/index';


class MainGrid extends Component{

    constructor(props) {
        super(props);
        this.state= {
            style:{
                backgroundColor:'transparent',
                border: `2px solid ${this.props.mainColor}`,
                padding:20,
                marginTop: '8.98%',
                marginBottom:'8.98%',
                marginLeft:'16%',
                color:this.props.mainColor,
                width:'53.38%',
                transition: '0.3s',
                fontSize: 'x-large',
                pointerEvents: `${this.props.pointerEvent}`
            },
            pointerEvents: `${this.props.pointerEvent}`,
            rand: 0,


        }

    }


    componentDidMount() {
        // if (this.state.pointerEvents === 'none'){
        //     let style = Object.assign({}, this.state.style);
        //     style.pointerEvents = "all"
        //     style.backgroundColor = this.props.mainColor;
        //     style.color = 'black';
        //     this.setState({style});
        // } else if (this.state.pointerEvents === 'all'){
        //     let style = Object.assign({}, this.state.style);
        //     style.backgroundColor = 'transparent';
        //     style.color = this.props.mainColor;
        //     this.setState({style});
        // }

    }

    mouseEnter = ()=>{
        let style = Object.assign({}, this.state.style);
        style.backgroundColor = this.props.mainColor;
        style.color = 'black';
        this.setState({style});
    }

    mouseLeave = ()=>{
        let style = Object.assign({}, this.state.style);
        style.backgroundColor = 'transparent';
        style.color = this.props.mainColor;
        this.setState({style});
    }

    mouseClick = ()=>{
        let style = Object.assign({}, this.state.style);
        style.pointerEvents = 'none';
        this.setState({rand:0})
        const min = 30;
        const max = 270;
        this.setState({rand:min + Math.random() * (max - min)})
        this.props.callbackFromParent(this.props.value, false, this.state.pointerEvents,this.state.style.pointerEvents);


    }


    render(){

        return(
            <Paper  style={this.state.style}
                    onMouseEnter={this.mouseEnter}
                    onMouseLeave={this.mouseLeave}
                    onClick={this.mouseClick }
                    disabled={this.state.button} >
                {this.props.value}x
            </Paper>)}
}
export default MainGrid;


