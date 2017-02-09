const express = require('express');
const router = express.Router();
const queries = require('../queries');


router.get('/', ( request, response, next ) => {
  queries.getAllBooks()
  .then( data => {
    response.render('index', {
      title: "Wreka Stow",
      books: data
    })
  })
  .catch(function(err) {
    return next(err)
  })
});

router.get('/book/:id', ( request, response, next ) =>
console.log( 'request--->>>', request )
  queries.getSingleBook()
  .then( data => {
    response.render('book', {
      title: title,
      books: data
    })
  })
  .catch(function(err) {
    return next(err)
  })
});

router.get('/author/:author', ( request, response, next ) => {
  queries.getSingleAuthor()
  .then(function(data) {
    response.render('author', {
      title: author,
      books: data
    })
  })
  .catch(function(err) {
    return next(err)
  })
});

router.get('/genre/:genre', () => {
  queries.getSingleGenre()
  .then(function(data) {
    response.render('genre', {
      title: genre,
      books: data
    })
  })
  .catch(function(err) {
    return next(err)
  })
});


router.get('/published/:publish_year', queries.getSinglePublishYear);
router.get('/post', queries.addingBook);
router.post('/post', queries.createBook)



module.exports = router;
