import React from 'react';

export default class GameIDForm extends React.Component {

    render() {
        return (
        <form className={"sdbutton"} style={style} onSubmit={this.props.handleSubmit}>
            <label>
            Game ID:
            <input type="text" value={this.props.value} onChange={this.props.handleChange} />
            </label>
            <input type="submit" value="Join Game" />
        </form>
        );
    }
    }

    var style = {
        display : "grid",
        alignItems : "centre",
        justifyItems: "centre",
      }