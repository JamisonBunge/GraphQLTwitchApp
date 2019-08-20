const { ApolloServer, gql } = require('apollo-server');
const { find, filter } = require('lodash');
const Streams = require('./DataSources/Streams');
const User = require('./DataSources/User');
const Game = require('./DataSources/Game');
const Page = require('./DataSources/Page');
const Links = require('./DataSources/Links');


//BIG BUG: using login doesnt always work.. "display name: riot games = riotgames as the login" <- need to figure out how spaces are handled(maybe jsut ignored for the login...)
//if thats the case we can just ignore any spaces in the login feild and then this should be fine
//fixed

//the div we care about to get twitch discription on stream is class="channel-panels",
//below that on the dom there should be another div-> a tag which has the href

// The GraphQL schema
//typeDef : string representing the graphql schema
//gql : a template literal tag used for wraching graphql inside javascript

//NOTE: stream call is giving null when not live
//NOTE: need to change how streams makes nested calls -> they should be batched

//to include in the schema: Streams Game, User
const schema = gql`
  type User {
    id: String!,
    description: String,
    display_name: String,
    profile_image_url: String,
    view_count: String,
    broadcaster_type: String,
    stream: Stream,
    links: Links
  }, #link -> channel pannel links
  type Links { #lets build on links first which will be an array of pannel links, later i can add twitter ect,
    links: [String],
    httpLinks: [String],
    allLinks: [String]
    twitter_user_name: [String],
    instagram_user_name: [String],
    user_name: String
    # twitter_link: String,
    # twitter_user_name: String,
    # twitter: relay to twitter gql
    #there may be more than on twitter linked, need to devise a way to pick the most similar
  },
  type Stream {
     user_name: String,
     type: String,
     title: String,
     viewer_count: String,
     game_id: String,
     id: String,
     started_at: String,
     thumbnail_url: String,
     game: Game,
     user: User,
     user_id: String
     # game: Game #  this needs to make another call to the twitch api
     },
  type Game {
    box_art_url: String,
    id: String,
    name: String
  }
  type Query {
    "A simple type for getting started!"
    user(login: String!): User,
    streams: [Stream],
    stream(login: String!): Stream,
    game(id: String!): Game,
    # ==========
    channel(login: String!): Links

  }
`;

const resolvers = {
  Query: {
    user: async (_parent, { login }, { dataSources }) => dataSources.User.getUser(login),
    streams: async (_parent, _args, { dataSources }) => dataSources.Streams.getStreams(),
    stream: async (_parent, { login }, { dataSources }) => dataSources.Streams.getStream(login),
    game: async (_parent, { id }, { dataSources }) => dataSources.Game.getGame(id),
    channel: async (_parent, { login }, { dataSources }) => dataSources.Links.getLinks(login)
  },
  Stream: {
    game: async (parent, { id }, { dataSources }) => dataSources.Game.getGame(parent.game_id),
    user: async (parent, { login }, { dataSources }) => dataSources.User.getUserr(parent.user_id),
  },
  User: {
    stream: async (parent, { login }, { dataSources }) => dataSources.Streams.getStream(parent.display_name),
    links: async (parent, { login }, { dataSources }) => dataSources.Links.getLinks(parent.display_name)
  }
};

//ApolloServer: used to init and start server
const server = new ApolloServer({
  typeDefs: schema,
  resolvers,
  dataSources: () => ({
    Streams: new Streams,
    User: new User,
    Game: new Game,
    Page: new Page,
    Links: new Links
  })
});

//starting the server
server.listen().then(({ url }) => {
  console.log(`🚀 Server ready at ${url}`)
});


// GraphQL is the best way to work with data from any back-end that your
// product needs. It is not a mapping of your database,
// but rather a graph of the data sources and shapes your
// product is made of.


//user(parent, args, context, info) {
  //console.log(find(Users, { id: args.id }))
  //return find(Users, { id: args.id })
//  },

//dummy data
// var Users = [
//   { id: "1", name: "Jamison Bunge ", username: "Nestta", game: "Fortnite" },
//   { id: "2", name: "Steve Matthew ", username: "Shadowchefsteve", game: "Apex Legends" },
//   { id: "3", name: "Tuner Tofo", username: "Tfue", game: "Fortnite" }
// ]
//


// query {
//   user(login: "ninja") {
//     description
//     view_count
//     stream {
//       title
//       viewer_count
//       game {
//         name
//         url
//       }
//     }
//     twitter{
//       recent_tweets
//       link
//     }
//     instagram {
//       link
//     }
//   }
// }
