if (process.env.NODE_ENV !== 'production') {
    require('dotenv').config();
}
const express = require('express')
const router = require('./routes')
const app = express()
const { connect } = require('./config/mongodb')
const port = process.env.PORT || 3000
const cors = require('cors')

app.use(cors())
app.use(express.json())
app.use(express.urlencoded({ extended: true }))

app.use(router)

async function startServer() {
    try {
        await connect();
        app.listen(port, () => {
            console.log(`Example app listening on port ${port}`);
        });
    } catch (err) {
        console.log(err, "Gagal connect ke DB");
    }
};

startServer();