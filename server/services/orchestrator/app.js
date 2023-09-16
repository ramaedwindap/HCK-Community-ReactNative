const { ApolloServer, gql } = require("@apollo/server");
const { startStandaloneServer } = require("@apollo/server/standalone");
const axios = require('axios')

// Define your GraphQL schema using gql tag
const typeDefs = `#graphql
  type User {
    _id: ID
    username: String
    email : String
    password: String
    phoneNumber: String
    address: String
  }

  type Query {
    hello: String
    users: [User]
  }
`;

// Define your resolvers
const resolvers = {
    Query: {
        hello: function () {
            return 'Hello, world!'
        },
        users: async function () {
            try {
                const { data } = await axios({ url: "http://localhost:4001/users", method: "GET" })
                // console.log(data)
                return data
            } catch (error) {
                console.log(error)
            }
        }
    },
};

const server = new ApolloServer({
    typeDefs,
    resolvers,
});

async function startServer() {
    try {
        const { url } = await startStandaloneServer(server, { listen: { port: 4000 } });
        console.log(`🚀 Server ready at ${url}`);
    } catch (error) {
        console.log(error)
    }
}

startServer();