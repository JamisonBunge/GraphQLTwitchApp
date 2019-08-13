
import React, { Component } from 'react';
import { graphql } from 'react-apollo';
import { userQuery } from '../queries/queries'



class Card extends Component {
    constructor(props) {
        super(props);
        this.state = {
            username: '',
            test: []
        };
    }

    submitForm(e) {
        //prevent the default 'refresh' behavior from happening
        e.preventDefault();
        this.setState({ test: [...this.state.test, this.state.username] })
        console.log(this.state)



    }

    displayLinks() {
        var data = this.props.data;
        console.log(data)
        if (data.loading || data.books == undefined) {
            return <div>...</div>
        } else {
            return <div>{this.props.data}</div>
        }

    }

    render() {
        return (
            <div>
                <form id="search-streamer" onSubmit={this.submitForm.bind(this)}>
                    <div className="field">
                        <label>Streamer Username:</label>
                        <input type="text" onChange={(e) => this.setState({ username: e.target.value })} />
                    </div>
                    <button value="Search">Search</button>
                </form>
                <div className="list">
                    <ul id="book-list">
                        {this.displayLinks()}
                    </ul>
                </div>
            </div>

        );
    }
}

export default graphql(userQuery, {
    options: (props) => {
        //console.log("+++++++++" +props.bookId)
        return {
            variables: {
                login: this.state.username
            }
        }
    }
})(Card)