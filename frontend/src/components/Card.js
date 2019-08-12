
import React, { Component } from 'react';


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

        return (this.state.test.map((e) => <li key={this.state.test.length}>{e}</li>))




        // return data.books.map(book => {
        //     //map cycles through the array,
        //     //each time it hits it trigger this funciton
        //     //it takes that book, grabs the name and places it inside an li tag
        //     return (
        //         <li key={book.id} onClick={e => this.setState({ selected: book.id })}> {book.name} </li>
        //     )
        // })
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
                        {this.displayLinks}
                    </ul>
                </div>
            </div>

        );
    }
}

export default Card