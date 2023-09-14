if (process.env.NODE_ENV !== 'production') {
    require('dotenv').config();
}
const express = require('express')
const app = express()
const port = process.env.PORT || 4000
const cors = require('cors')
const router = require('./routes')
const Redis = require('ioredis');


const redis = new Redis({
    host: process.env.REDIS_HOST,
    port: 17237,
    password: process.env.REDIS_PASSWORD
});

app.use(cors())
app.use(express.urlencoded({ extended: true }))
app.use(express.json())

app.use(router)

app.listen(port, () => {
    console.log(`Example app listening on port ${port}`)
})