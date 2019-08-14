
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

        let un = this.refs.streamer.value;
        un = un.split(' ').join('') //remove all whitespace

        for (let ch of un.split('')) {
            if (ch.charCodeAt() < 48 || ch.charCodeAt() > 122) {
                alert("Twitch usernames do not contain special characters");
                this.refs.streamer.value = ""
                return;
            }
            console.log(ch.charCodeAt())
        }


        return this.setState({ login: un })
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
