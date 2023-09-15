const express = require('express')
const errorHandler = require('../middlewares/errorHandler')
const PostController = require('../controllers/PostController')
const UserController = require('../controllers/UserController')
const router = express.Router()

router.get('/', (req, res) => {
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