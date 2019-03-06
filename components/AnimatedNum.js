import React, { Component } from "react";
import ReactDOM from "react-dom";
import AnimatedNumber from "animated-number-react";

import "./styles.css";

class App extends Component {
    state = {
        value: 150,
        duration: 300
    };
    handleChangeValue = ({ target: { value } }) => {
        this.setState({ value });
    };
    handleChangeDuration = ({ target: { value } }) => {
        this.setState({ duration: value });
    };
    formatValue = value => `$ ${Number(value).toFixed(2)}`;
    render() {
        return (
            <div>
                <div>
                    <label for="">Value: </label>
                    <input
                        type="number"
                        onChange={this.handleChangeValue}
                        value={this.state.value}
                    />
                </div>
                <div>
                    <label for="">Duration of animation: </label>
                    <input
                        type="number"
                        onChange={this.handleChangeDuration}
                        value={this.state.duration}
                    />
                </div>
                <br />
                <AnimatedNumber
                    value={this.state.value}
                    formatValue={this.formatValue}
                    duration={this.state.duration}
                />
                <hr />
                <button
                    onClick={() => {
                        this.setState({ value: this.state.value + 500 });
                    }}
                >
                    Increase 500
                </button>
                <button
                    onClick={() => {
                        this.setState({ value: this.state.value - 500 });
                    }}
                >
                    Decrease 500
                </button>
                <br />
            </div>
        );
    }
}

const rootElement = document.getElementById("root");
ReactDOM.render(<App />, rootElement);
