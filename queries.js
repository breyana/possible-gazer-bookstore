const promise = require('bluebird')

const options = {
  promiseLib: promise
}

const pgp = require('pg-promise')(options)
const connectionString = 'postgres://localhost:5432/possiblegazerbookstore'
const db = pgp(connectionString)

function getAllBooks(request, response, next) {
  db.any('SELECT * FROM books')
    .then(function(data) {
      response.status(200)
        .json({
          status: 'success',
          data: data,
          message: 'retrieved all books'
        })
    })
    .catch(function(err) {
      return next(err)
    })
}

function getSingleBook(request, response, next) {
  const bookID = request.params.id
  db.one('SELECT * FROM books WHERE id = $1', bookID)
    .then(function(data) {
      response.status(200)
        .json({
          status: 'success',
          data: data,
          message: 'retrieved one book'
        })
    })
    .catch(function(err) {
      return next(err)
    })
}

function getSingleAuthor(request, response, next) {
  const author = request.params.author
  db.any('SELECT * FROM books WHERE author = $1', author)
  .then(function(data) {
    response.status(200)
      .json({
        status: 'success',
        data: data,
        message: 'retrieved all books from one author'
      })
  })
  .catch(function(err) {
    return next(err)
  })
}

function getSingleGenre(request, response, next) {
  const genre = request.params.genre
  db.any('SELECT * FROM books WHERE genre = $1', genre)
    .then(function(data) {
      response.status(200)
        .json({
          status: 'success',
          data: data,
          message: 'retrieved all books in one genre'
        })
    })
    .catch(function(err) {
      return next(err)
    })
}

function createBook(request, response, next) {
  db.none('INSERT INTO books (title, author, genre, publish_year)' +
      'VALUES (${title}, ${author}, ${genre}, ${publish_year})')
    .then(function(data) {
      response.status(200)
        .json({
          status: 'success',
          data: data,
          message: 'created a book'
        })
    })
    .catch(function(err) {
      return next(err)
    })
}

module.exports = {
  getAllBooks,
  getSingleBook,
  getSingleAuthor,
  getSingleGenre,
  createBook
}
