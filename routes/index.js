const express = require('express');
const router = express.Router();
const queries = require('../queries');


router.get('/', queries.getAllBooks);
router.get('/author/:author', queries.getSingleAuthor);
router.get('/genre/:genre', queries.getSingleGenre);
router.get('/book/:id', queries.getSingleBook);
router.get('/published/:publish_year', queries.getSinglePublishYear);
router.get('/post', queries.addingBook);
router.post('/post', queries.createBook)



module.exports = router;
