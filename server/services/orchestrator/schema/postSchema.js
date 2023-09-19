const Redis = require('ioredis');
const axios = require('axios')


const redis = new Redis({
    host: process.env.REDIS_HOST,
    port: 17237,
    password: process.env.REDIS_PASSWORD
});

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
    author: User
  }

  type topTag {
    tagName: String
  }
  
  type ResponseMessage {
    message: String!
  }

  type Query {
    topTags: [topTag]
    author(_id: ID): User

    posts:[Post]
    post(slug: String): Post
  }

  type Mutation {
    storePost(title: String, content: String, imgUrl: String, categoryId: Int, userMongoId: String, tags: String): ResponseMessage
    deletePost(id: ID): ResponseMessage
    updatePost(slug: String, title: String, content: String, imgUrl: String, categoryId: Int, tags: String): ResponseMessage
  }
`;

// Define your resolvers
const resolvers = {
    Query: {
        posts: async function () {
            try {
                // await redis.del("posts")
                let result = await redis.get("posts")

                if (!result) {
                    const { data } = await axios({ url: "http://service-app:4002/posts", method: "GET" })
                    // console.log(data)
                    const res = await Promise.all(data.map(async (post) => {
                        try {
                            const { data: dataUser } = await axios({ url: "http://service-user:4001/users/" + post.userMongoId, method: "GET" });
                            return {
                                ...post,
                                author: dataUser
                            };
                        } catch (error) {
                            return {
                                ...post,
                                author: null
                            };
                        }
                    }));
                    // console.log(res, "ressssssssss")

                    await redis.set("posts", JSON.stringify(res))

                    result = res

                    console.log('set cache posts on redis')
                } else {
                    result = JSON.parse(result)
                    console.log('cache posts from redis')
                }
                // console.log(result);
                return result;
            } catch (error) {
                throw new Error(error.response ? error.response.data.message : error.message);
            }
        },
        post: async function (_, { slug }) {
            try {
                const { data } = await axios({ url: "http://service-app:4002/posts/" + slug, method: "GET" })
                // console.log(data)
                try {
                    const { data: dataUser } = await axios({ url: "http://service-user:4001/users/" + data.userMongoId, method: "GET" });
                    data.author = dataUser
                } catch (error) {
                    data.author = null
                }
                // console.log(res);
                return data;
            } catch (error) {
                throw new Error(error.response ? error.response.data.message : error.message);
            }
        },
        topTags: async function () {
            try {
                const { data } = await axios({ url: "http://service-app:4002/public/top-tags/", method: "GET" })
                return data
            } catch (error) {
                throw new Error(error.response ? error.response.data.message : error.message);
            }
        }
    },

    Mutation: {
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
                    url: "http://service-app:4002/posts",
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

                await redis.del("posts")

                return {
                    message: data.message,
                };
            } catch (error) {
                throw new Error(error.response ? error.response.data.message : error.message);
            }
        },
        deletePost: async function (_, { id }) {
            try {
                const { data } = await axios({ url: "http://service-app:4002/posts/" + id, method: "DELETE" })

                await redis.del("posts")

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
                    url: "http://service-app:4002/posts/" + slug,
                    method: "PUT",
                    data: {
                        title,
                        content,
                        imgUrl,
                        categoryId,
                        tags
                    }
                })

                await redis.del("posts")

                return {
                    message: data.message,
                };
            } catch (error) {
                throw new Error(error.response ? error.response.data.message : error.message);
            }
        },
    }
};

module.exports = {
    typeDefs,
    resolvers
}