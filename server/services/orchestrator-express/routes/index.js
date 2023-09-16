const express = require('express')
const errorHandler = require('../middlewares/errorHandler')
const PostController = require('../controllers/PostController')
const UserController = require('../controllers/UserController')
const router = express.Router()
const Redis = require('ioredis');


const redis = new Redis({
    host: process.env.REDIS_HOST,
    port: 17237,
    password: process.env.REDIS_PASSWORD
});

router.get('/', (req, res) => {
    redis.keys('*').then(keys => {
        console.log(keys); // This will log all the keys in your Redis store
    }).catch(err => {
        console.error(err);
    });
    res.send('Server is running!')
})

// POST
router.get('/posts', PostController.index)
router.get('/posts/:slug', PostController.show)

// USER 
router.get('/users', UserController.index)
router.post('/users', UserController.store)
router.get('/users/:id', UserController.show)
router.delete('/users/:id', UserController.delete)

router.use(errorHandler)

module.exports = router