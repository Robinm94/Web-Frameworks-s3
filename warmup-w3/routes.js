const express = require('express')
// Create router
const router = express.Router()

// Initialize built-in middleware for urlencoding and json
router.use(express.urlencoded({extended: true}));
router.use(express.json());

// Create your endpoints/route handlers 

// Chained router route for Root Route
router.route("/")
    .get( function (req, res) {
        res.send('<h1>Hello World!</h1>')
    })

    .post(function (req, res) {
        console.log(req.body)
        res.send(req.body)
    })

// This path will match to /about
router.get('/about', (req, res) => {
    res.send('about')
})

// This route path will match abcd and acd
router.get('/ab?cd', (req, res) => {
    res.send(req.url)
})


// Named parameters to get user and book ids
// Uses : followed by variable name
router.get('/users/:userId/books/:bookId', (req, res) => {
    res.send(req.params)
})

// Hyphen is used literally so can be used to 
// separate parameters
router.get('/flights/:from-:to', (req, res) => {
    res.send(req.params)
})

router.get(/a/, (req, res) => {
    res.send('/a/')
});
router.get(/.*fly$/, (req, res) => {
    res.send('/.*fly$/')
});
router.get('/user/:userId(\\d+)', (req, res) =>{
    res.send(req.params)
});

router.all('*', (req,res)=>{
    res.status(404).send("Error 404: page not found");
});

// Export router
module.exports = router