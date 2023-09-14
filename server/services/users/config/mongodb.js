const { MongoClient } = require("mongodb")

const uri = `mongodb+srv://ramepitsme:${process.env.MONGO_ATLAS_PASSWORD}@cluster0.mh5o4ji.mongodb.net/?retryWrites=true&w=majority`;

let db = null

async function connect() {
    try {
        const client = new MongoClient(uri)
        await client.connect()

        const database = client.db("phase3-c2")
        db = database
        return database
    } catch (error) {
        console.log(error)
        return error
    }
}

function getDatabase() {
    return db
}

module.exports = {
    connect,
    getDatabase
}