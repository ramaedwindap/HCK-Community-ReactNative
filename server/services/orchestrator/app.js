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
  
  type CreateUserResponse {
    message: String!
    user: User
  }

  type Query {
    users: [User]
  }

  type Mutation {
    createUser(username: String, email: String!, password: String!, phoneNumber: String, address: String): CreateUserResponse
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
                    user: data.user // assuming your REST API returns the created user in some form.
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