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



const tradingCardQuery = gql`
    query($login: String!) {
        user(login: $login) {
        display_name
        description
        profile_image_url
        view_count
        broadcaster_type
        links {
            twitter_user_name
            instagram_user_name
        }
        stream {
            type
            viewer_count
            game {
                name
                box_art_url
            }
            user {
                display_name
            }
        }
    }
}`


export { userQuery, tradingCardQuery }
