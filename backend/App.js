const { ApolloServer, gql } = require('apollo-server');
const { find, filter } = require('lodash');
const Streams = require('./DataSources/Streams');
const User = require('./DataSources/User');



// The GraphQL schema
//typeDef : string representing the graphql schema
//gql : a template literal tag used for wraching graphql inside javascript


//to include in the schema: Streams Game, User
const schema = gql`
  type User {
    id: String!,
    description: String,
    display_name: String,
    profile_image_url: String,
    view_count: String,
    broadcaster_type: String
  },
  type Stream {
    user_name: String,
     type: String,
     title: String,
     viewer_count: String,
     game_id: String,
     id: String,
     started_at: String,
     thumbnail_url: String
     # game: Game #  this needs to make another call to the twitch api
     },
  type Query {
    "A simple type for getting started!"
    user(login: String!): User,
    streams: [Stream]
  }
`;

const resolvers = {
  Query: {
    user: async (_parent, { login }, { dataSources }) => dataSources.User.getUser(login),
    streams: async (_parent, _args, { dataSources }) => dataSources.Streams.getStreams()
  }
};

//ApolloServer: used to init and start server
const server = new ApolloServer({
  typeDefs: schema,
  resolvers,
  dataSources: () => ({
    Streams: new Streams,
    User: new User
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