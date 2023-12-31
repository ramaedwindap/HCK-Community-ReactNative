const express = require('express')
const errorHandler = require('../middleware/errorHandler')
const UserController = require('../controllers/UserController')
const router = express.Router()

// define the home page route
router.get('/', (req, res) => {
    res.send('Server is running')
})

router.get('/users', UserController.index)

router.post('/users', UserController.store)

router.delete('/users/:id', UserController.delete)

router.get('/users/:id', UserController.show)

router.use(errorHandler)

module.exports = router