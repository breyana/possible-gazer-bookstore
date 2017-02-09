const promise = require('bluebird')

const options = {
  promiseLib: promise
}

const pgp = require('pg-promise')(options)
const connectionString = 'postgres://localhost:5432/possiblegazerbookstore'
const db = pgp(connectionString)

const getAllBooks = () => db.any( 'SELECT * FROM books' )


const getSingleBook = (request, response) => {
  const bookID = request.params.id
  return db.one('SELECT * FROM books WHERE id = $1', bookID)
}

const getSingleAuthor = (request, response) => {
  const author = request.params.author
  return db.any('SELECT * FROM books WHERE author = $1', author)
}

const getSingleGenre = (request, response, next) => {
  const genre = request.params.genre
  return db.any('SELECT * FROM books WHERE genre = $1', genre)
}

const getSinglePublishYear = (request, response, next) => {
  const year = request.params.publish_year
  return db.any('SELECT * FROM books WHERE publish_year = $1', year)
}


const addingBook = (request, response, next) => {
  return db.any('SELECT * FROM books')
}

const createBook = (request, response, next) => {
  const { title, author, genre, publish_year, img } = request.params
  return db.any(`INSERT INTO books (title, author, genre, publish_year, img)
  VALUES ('title', 'author', 'genre', '1234', 'img')`)
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
