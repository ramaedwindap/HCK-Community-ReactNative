const Redis = require('ioredis');
const axios = require('axios')


const redis = new Redis({
    host: process.env.REDIS_HOST,
    port: process.env.REDIS_PORT,
    password: process.env.REDIS_PASSWORD
});

const typeDefs = `#graphql
  type User {
    _id: ID
    username: String
    email : String
    phoneNumber: String
    address: String
  }
  
  type ResponseMessage {
    message: String!
  }

  type Query {
    users: [User]
    user(_id: ID): User
  }

  type Mutation {
    storeUser(username: String, email: String!, password: String!, phoneNumber: String, address: String): ResponseMessage
    deleteUser(_id: ID): ResponseMessage
  }
`;

// Define your resolvers
const resolvers = {
    Query: {
        users: async function () {
            try {
                // await redis.del("users")
                let result = await redis.get("users")

                if (!result) {
                    const { data } = await axios({ url: "http://service-user:4001/users", method: "GET" })
                    result = data
                    await redis.set("users", JSON.stringify(data))
                    console.log('set cache users on redis')
                } else {
                    result = JSON.parse(result)
                    console.log('cache users from redis')
                }

                return result
            } catch (error) {
                throw new Error(error.response.data.message)
            }
        },
        user: async function (_, { _id }) {
            try {
                const { data } = await axios({ url: "http://service-user:4001/users/" + _id, method: "GET" })

                return data
            } catch (error) {
                throw new Error(error.response.data.message)
            }
        }
    },

    Mutation: {
        storeUser: async function (_, { username, email, password, phoneNumber, address }) {
            try {
                const { data } = await axios({
                    url: "http://service-user:4001/users",
                    method: "POST",
                    data: { username, email, password, phoneNumber, address }
                })

                await redis.del("users")
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
                const { data } = await axios({ url: "http://service-user:4001/users/" + _id, method: "DELETE" })

                await redis.del("users")

                return {
                    message: data.message,
                };
            } catch (error) {
                throw new Error(error.response.data.message)
            }
        }
    }
};

module.exports = {
    typeDefs,
    resolvers
}