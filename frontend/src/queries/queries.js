import { gql } from 'apollo-boost';

const userQuery = gql`
    query($login: String!) {
        user(login: $login) {
            display_name
            links{
                twitter_user_name
                instagram_user_name
            }

        }
    }`



export { userQuery }
