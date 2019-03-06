import React, {Component} from 'react';
class TelegramIcon extends Component{

        state= {
                color: "#bbcecc"
        };


        mouseEnter = ()=>{
                this.setState({color:"#37f1e2"});
        };

        mouseLeave = ()=>{
                this.setState({color:'#bbcecc'});
        };

        render(){
                return  (
    <svg
        role="img"
        xmlns="http://www.w3.org/2000/svg"
        viewBox="0 0 24 24"
        width="30"
        height="30"
        style={{marginLeft:'80px'}}
        onMouseEnter={this.mouseEnter}
        onMouseLeave={this.mouseLeave}>

        <title>Telegram icon</title>

        <path d="M9.028 20.837c-.714 0-.593-.271-.839-.949l-2.103-6.92L22.263 3.37" style={{fill:'grey'}}/>
        <path d="M9.028 20.837c.552 0 .795-.252 1.105-.553l2.941-2.857-3.671-2.214" style={{fill:'grey'}}/>
        <path style={{fill:this.state.color}} d="M9.403 15.213l8.89 6.568c1.015.56 1.748.271 2-.942l3.62-17.053c.372-1.487-.564-2.159-1.534-1.72L1.125 10.263c-1.45.582-1.443 1.392-.264 1.753l5.455 1.7L18.94 5.753c.595-.36 1.143-.167.694.232"
        />

        </svg>
)}}

export default TelegramIcon;
