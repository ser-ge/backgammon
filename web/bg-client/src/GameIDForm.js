import React from 'react';

export default class GameIDForm extends React.Component {

    render() {
        return (
        <form onSubmit={this.props.handleSubmit}>
            <label>
            Name:
            <input type="text" value={this.props.value} onChange={this.props.handleChange} />
            </label>
            <input type="submit" value="Submit" />
        </form>
        );
    }
    }