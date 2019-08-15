import React, { Component } from 'react';
import { graphql } from 'react-apollo';
import { userQuery } from '../queries/queries'

class Details extends Component {
    constructor(props) {
        super(props);
    }

    listLinks() {
        var data = this.props.data.user;
        console.log(this.props)
        if (this.props.login === "NO_INPUT") return
        if (data == undefined) return

        if (data.loading || data == undefined) {
            return <div>Loading</div>
        } else {

            return (Object.entries(data.links).map(([key, value]) => {
                if (key === "twitter_user_name") return <li>Twitter Username: {value}</li>
                else if (key === "instagram_user_name") return <li>Instagram Username: {value}</li>
                else return

            }))
        }
    }

    render() {
        return (
            <div id="details">
                <ul>{this.listLinks()}</ul>
                <div>
                    <h2>Ninja</h2>
                </div>
            </div>
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