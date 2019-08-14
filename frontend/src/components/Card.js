
import React, { Component } from 'react';
import Details from '../components/Details'




class Card extends Component {
    constructor(props) {
        super(props);
        this.state = {
            login: 'NO_INPUT'
        };
    }

    submitForm(e) {

        e.preventDefault();
        return this.setState({ login: this.refs.streamer.value })
    }

    render() {
        return (
            <div>
                <form id="search-streamer" onSubmit={this.submitForm.bind(this)}>
                    <div className="field">
                        <label>Streamer Username:</label>
                        <input type="text" ref="streamer" />
                    </div>
                    <button value="Search">Search</button>
                </form>
                <Details login={this.state.login} />
            </div>

        );
    }
}

export default Card
//onChange={(e) => this.setState({ login: e.target.value })}
