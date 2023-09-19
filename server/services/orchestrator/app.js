if (process.env.NODE_ENV !== 'production') {
    require('dotenv').config();
}
const { ApolloServer } = require("@apollo/server");
const { startStandaloneServer } = require("@apollo/server/standalone");

const {
    typeDefs: userSchemaDefs,
    resolvers: userSchemaResolvers
} = require("./schema/userSchema")

const {
    typeDefs: postSchemaDefs,
    resolvers: postSchemaResolvers
} = require("./schema/postSchema")



const server = new ApolloServer({
    typeDefs: [userSchemaDefs, postSchemaDefs],
    resolvers: [userSchemaResolvers, postSchemaResolvers],
});

async function startServer() {
    try {
        const { url } = await startStandaloneServer(server, { listen: { port: process.env.PORT || 4000 } });
        console.log(`🚀 Server ready at ${url}`);
    } catch (error) {
        console.log(error)
    }
}

startServer();