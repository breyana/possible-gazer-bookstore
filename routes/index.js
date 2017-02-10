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

router.get('/book/:id', ( request, response, next ) => {
  queries.getSingleBook( request, response )
  .then( data => {
    response.render('book', {
      title: data.title,
      books: data
    })
  })
  .catch(function(err) {
    return next(err)
  })
});

router.get('/author/:author', ( request, response, next ) => {
  queries.getSingleAuthor( request, response )
  .then( data => {
    response.render('author', {
      title: request.params.author,
      books: data
    })
  })
  .catch(function(err) {
    return next(err)
  })
});

router.get('/genre/:genre', ( request, response, next ) => {
  queries.getSingleGenre( request, response )
  .then(function(data) {
    response.render('genre', {
      title: request.params.genre,
      books: data
    })
  })
  .catch(function(err) {
    return next(err)
  })
});

router.get('/published/:publish_year', ( request, response, next ) => {
  queries.getSinglePublishYear( request, response )
    .then(function(data) {
      response.render('year', {
        title: request.params.publish_year,
        books: data
      })
    })
    .catch(function(err) {
      return next(err)
    })
});

router.get('/post', ( request, response, next ) => {
  queries.addingBook( request, response )
    .then(function(data) {
        response.render('addbook', {
          title: "Wreka Stow",
          books: data
        })
    })
    .catch(function(err) {
      return next(err)
    })
});


router.post('/post', ( request, response, next ) => {
  queries.createBook( request, response )
    .then(function(data) {
      response.redirect(`/book/${data.id}`)
    })
    .catch(function(err) {
      return next(err)
    })

});



module.exports = router;
