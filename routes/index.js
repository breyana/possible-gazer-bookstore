const express = require('express');
const router = express.Router();
const db = require('../queries');

router.get('/', db.getAllBooks);
router.get('/:id', db.getSingleBook);
router.get('/books/:author', db.getSingleAuthor);
router.get('/genres/:genre', db.getSingleGenre);

router.post('/', db.createBook);


module.exports = router;
