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

  type Category {
    id: Int,
    name: String
  }

  type Tags {
    id: Int,
    postId: Int,
    name: String
  }

  type Post {
    id: ID,
    title: String,
    slug: String,
    content: String,
    imgUrl: String,
    categoryId: Int,
    userMongoId: String,
    createdAt: String,
    updatedAt: String,
    category: Category,
    tags: [Tags]
    user: User
  }
  
  type ResponseMessage {
    message: String!
  }

  type Query {
    users: [User]
    user(_id: ID): User

    posts:[Post]
    post(slug: String): Post
  }

  type Mutation {
    createUser(username: String, email: String!, password: String!, phoneNumber: String, address: String): ResponseMessage
    deleteUser(_id: ID): ResponseMessage
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
        },
        posts: async function () {
            try {
                const { data } = await axios({ url: "http://localhost:4002/posts", method: "GET" })
                // console.log(data)
                const res = await Promise.all(data.map(async (post) => {
                    try {
                        const { data: dataUser } = await axios({ url: "http://localhost:4001/users/" + post.userMongoId, method: "GET" });
                        return {
                            ...post,
                            user: dataUser
                        };
                    } catch (error) {
                        console.error(`Failed to fetch user for post with ID ${post.id}:`, error.message);
                        return {
                            ...post,
                            user: null
                        };
                    }
                }));
                // console.log(res);
                return res;
            } catch (error) {
                throw new Error(error.response ? error.response.data.message : error.message);
            }
        },
        post: async function (_, { slug }) {
            try {
                const { data } = await axios({ url: "http://localhost:4002/posts/" + slug, method: "GET" })
                // console.log(data)
                try {
                    const { data: dataUser } = await axios({ url: "http://localhost:4001/users/" + post.userMongoId, method: "GET" });
                    data.user = dataUser
                } catch (error) {
                    data.user = null
                }
                // console.log(res);
                return data;
            } catch (error) {
                throw new Error(error.response ? error.response.data.message : error.message);
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