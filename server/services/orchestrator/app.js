if (process.env.NODE_ENV !== 'production') {
    require('dotenv').config();
}
const { ApolloServer } = require("@apollo/server");
const { startStandaloneServer } = require("@apollo/server/standalone");
const axios = require('axios')
const Redis = require('ioredis');


const redis = new Redis({
    host: process.env.REDIS_HOST,
    port: 17237,
    password: process.env.REDIS_PASSWORD
});

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
    storeUser(username: String, email: String!, password: String!, phoneNumber: String, address: String): ResponseMessage
    deleteUser(_id: ID): ResponseMessage
    storePost(title: String, content: String, imgUrl: String, categoryId: Int, userMongoId: String, tags: String): ResponseMessage
    deletePost(id: ID): ResponseMessage
    updatePost(slug: String, title: String, content: String, imgUrl: String, categoryId: Int, tags: String): ResponseMessage
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
                    const { data } = await axios({ url: "http://localhost:4001/users", method: "GET" })
                    result = data
                    await redis.set("users", JSON.stringify(data))
                    console.log('set cache posts on redis')
                } else {
                    result = JSON.parse(result)
                    console.log('cache posts from redis')
                }

                return result
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
                    const { data: dataUser } = await axios({ url: "http://localhost:4001/users/" + data.userMongoId, method: "GET" });
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
        storeUser: async function (_, { username, email, password, phoneNumber, address }) {
            try {
                const { data } = await axios({
                    url: "http://localhost:4001/users",
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
                const { data } = await axios({ url: "http://localhost:4001/users/" + _id, method: "DELETE" })

                await redis.del("users")

                return {
                    message: data.message,
                };
            } catch (error) {
                throw new Error(error.response.data.message)
            }
        },
        storePost: async function (_, {
            title,
            content,
            imgUrl,
            categoryId,
            userMongoId,
            tags
        }) {
            try {
                const { data } = await axios({
                    url: "http://localhost:4002/posts",
                    method: "POST",
                    data: {
                        title,
                        content,
                        imgUrl,
                        categoryId,
                        userMongoId,
                        tags
                    }
                })
                // console.log(data)
                return {
                    message: data.message,
                };
            } catch (error) {
                throw new Error(error.response ? error.response.data.message : error.message);
            }
        },
        deletePost: async function (_, { id }) {
            try {
                const { data } = await axios({ url: "http://localhost:4002/posts/" + id, method: "DELETE" })

                return {
                    message: data.message,
                };
            } catch (error) {
                throw new Error(error.response.data.message)
            }
        },
        updatePost: async function (_, {
            title,
            content,
            imgUrl,
            categoryId,
            tags,
            slug
        }) {
            try {
                const { data } = await axios({
                    url: "http://localhost:4002/posts/" + slug,
                    method: "PUT",
                    data: {
                        title,
                        content,
                        imgUrl,
                        categoryId,
                        tags
                    }
                })
                return {
                    message: data.message,
                };
            } catch (error) {
                throw new Error(error.response ? error.response.data.message : error.message);
            }
        },
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