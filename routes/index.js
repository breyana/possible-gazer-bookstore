const express = require('express');
const router = express.Router();
const db = require('../queries');


router.get('/', db.getAllBooks);
router.get('/testpage', function(req, res, next) {
  res.render('index', { title: 'Express' });
});
router.get('/author/:author', db.getSingleAuthor);
router.get('/genre/:genre', db.getSingleGenre);
router.get('/book/:id', db.getSingleBook);

router.post('/', db.createBook);


module.exports = router;
