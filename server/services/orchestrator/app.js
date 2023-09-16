const { ApolloServer } = require("@apollo/server");
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
  
  type Response {
    message: String!
  }

  type Query {
    users: [User]
    user(_id: ID): User
  }

  type Mutation {
    createUser(username: String, email: String!, password: String!, phoneNumber: String, address: String): Response
    deleteUser(_id: ID): Response
  }
`;

// Define your resolvers
const resolvers = {
    Query: {
        users: async function () {
            try {
                const { data } = await axios({ url: "http://localhost:4001/users", method: "GET" })
                // console.log(data)
                return data
            } catch (error) {
                throw new Error(error.response.data.message)
            }
        },
        user: async function (_, { _id }) {
            try {
                const { data } = await axios({ url: "http://localhost:4001/users/" + _id, method: "GET" })

                return data
            } catch (error) {
                throw new Error(error.response.data.message)
            }
        }
    },
    Mutation: {
        createUser: async function (_, { username, email, password, phoneNumber, address }) {
            try {
                const { data } = await axios({
                    url: "http://localhost:4001/users",
                    method: "POST",
                    data: { username, email, password, phoneNumber, address }
                })
                // console.log(data.message)
                return {
                    message: data.message,
                };
            } catch (error) {
                throw new Error(error.response.data.message)
            }
        },
        deleteUser: async function (_, { _id }) {
            try {
                const { data } = await axios({ url: "http://localhost:4001/users/" + _id, method: "DELETE" })

                return {
                    message: data.message,
                };
            } catch (error) {
                throw new Error(error.response.data.message)
            }
        }
    }
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