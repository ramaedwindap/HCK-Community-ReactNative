const express = require('express')
const Controller = require('../controller/controller')
const errorHandler = require('../middleware/errorHandler')
const authentication = require('../middleware/authentication')
const router = express.Router()

// define the home page route
router.get('/', (req, res) => {
    res.send('Server is running..')
})

router.post('/login', Controller.login)

// Tags (Public)
router.get('/public/top-tags', Controller.getTopTags)

// Post (Public)
router.get('/public/posts', Controller.indexPublicPost)

router.get('/public/posts/:slug', Controller.showPublicPost)

router.use(authentication)
// Add User (Admin)
router.post('/add-user', Controller.addUser)

//Post (Admin)
router.get('/posts', Controller.indexPost)

router.post('/posts', Controller.storePost)

router.get('/posts/:slug', Controller.showPost)

router.put('/posts/:slug', Controller.updatePost)

router.delete('/posts/:id', Controller.destroyPost)

// Category (Admin)
router.get('/categories', Controller.indexCategory)

router.post('/categories', Controller.storeCategory)

router.get('/categories/:id', Controller.showCategory)

router.put('/categories/:id', Controller.updateCategory)

router.delete('/categories/:id', Controller.destroyCategory)

router.use(errorHandler)

module.exports = router