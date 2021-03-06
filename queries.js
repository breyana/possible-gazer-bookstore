const promise = require('bluebird')

const options = {
  promiseLib: promise
}

const pgp = require('pg-promise')(options)
const connectionString = process.env.NODE_ENV === 'development'
  ? 'postgres://localhost:5432/possiblegazerbookstore'
  : process.env.DATABASE_URL
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
  const  { title, author, genre, publish_year, img } = request.body
  console.log(title)
  return db.one(`INSERT INTO books (title, author, genre, publish_year, img)
  VALUES ($1, $2, $3, $4, $5) RETURNING *`,
  [title, author, genre, publish_year, img])
}

const searchBooks = (request, response, next) => {
  const userSearch = request.body.userSearch
    .toLowerCase()
    .replace(/^ */, '%')
    .replace(/ *$/, '%')
    .replace(/ +/g, '%')
  return db.any(`SELECT id, title, author, genre, img FROM books
    WHERE LOWER(title) LIKE $1
    OR LOWER(author) LIKE $1
    OR LOWER(genre) LIKE $1`, [userSearch])
}



module.exports = {
  getAllBooks,
  getSingleBook,
  getSingleAuthor,
  getSingleGenre,
  createBook,
  getSinglePublishYear,
  addingBook,
  searchBooks
}
