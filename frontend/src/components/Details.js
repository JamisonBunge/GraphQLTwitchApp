import React, { Component } from 'react';
import { graphql } from 'react-apollo';
import { userQuery } from '../queries/queries'

class Details extends Component {
    constructor(props) {
        super(props);
    }

    listLinks() {
        var data = this.props.data.user;

        if (this.props.login === "NO_INPUT") return

        if (data.loading || data == undefined) {
            return <div>Loading</div>
        } else {
            
            return (Object.entries(data.links).map(([key, value]) => <li>{key} -> {value}</li >))
        }
    }

    render() {
        return (
            <div><ul>{this.listLinks()}</ul></div>
        );
    }
}

export default graphql(userQuery, {
    options: (props) => {
        console.log(props.login)
        return {
            variables: {
                login: props.login
            }
        }
    }
})(Details)


//  <div className="list">
//                     <ul id="book-list">
//                         {this.displayLinks()}
//                     </ul>
//                 </div>