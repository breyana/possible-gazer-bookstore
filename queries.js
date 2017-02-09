const promise = require('bluebird')

const options = {
  promiseLib: promise
}

const pgp = require('pg-promise')(options)
const connectionString = 'postgres://localhost:5432/possiblegazerbookstore'
const db = pgp(connectionString)

const getAllBooks = () => db.any( 'SELECT * FROM books' )


const getSingleBook = (request, response) => {
  let bookID = request.params.id
  db.one('SELECT * FROM books WHERE id = $1', bookID)
}

const getSingleAuthor = () => {
  const author = request.params.author
  db.any('SELECT * FROM books WHERE author = $1', author)
}

function getSingleGenre(request, response, next) {
  const genre = request.params.genre
  db.any('SELECT * FROM books WHERE genre = $1', genre)
    .then(function(data) {
      response.render('genre', {
        title: genre,
        books: data
      })
    })
    .catch(function(err) {
      return next(err)
    })
}

function getSinglePublishYear(request, response, next) {
  const year = request.params.publish_year
  db.any('SELECT * FROM books WHERE publish_year = $1', year)
    .then(function(data) {
      response.render('year', {
        title: year,
        books: data
      })
    })
    .catch(function(err) {
      return next(err)
    })
}

function createBook(request, response, next) {
  const { title, author, genre, publish_year, img } = request.params
  db.any(`INSERT INTO books (title, author, genre, publish_year, img)
      VALUES ('title', 'author', 'genre', '1234', 'img')`)
    .then(function(data) {
        response.render('post', {
          title: title,
          books: data
        })
    })
    .catch(function(err) {
      return next(err)
    })
}

function addingBook(request, response, next) {
  db.any('SELECT * FROM books')
    .then(function(data) {
        response.render('post', {
          title: "Wreka Stow",
          books: data
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
  createBook,
  getSinglePublishYear,
  addingBook
}
