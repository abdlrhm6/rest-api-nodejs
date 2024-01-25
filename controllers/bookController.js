const { getAllBooks, getSingleBook, createSingleBook,updateSingleBook ,deleteSingleBook} = require("../services/bookService");

function getBooks(req, res) {
    return getAllBooks(req, res)
}

function getBook(req, res) {
    const id = req.url.split("/")[3]
    return getSingleBook(req, res, id)

}

function createBook(req, res) {

    let body = ''
    req.on('data', (chunk) => {
        body += chunk.toString()
    })
    req.on('end', () => {
        return createSingleBook(req, res, JSON.parse(body))
    })
}

function updateBook(req, res) {
    const id = req.url.split("/")[3]
    let body = ''
    req.on('data', (chunk) => {
        body += chunk.toString()
    })
    req.on('end', () => {
        return updateSingleBook(req, res, id,JSON.parse(body))
    })
}

function deleteBook(req,res){
    const id = req.url.split("/")[3]
    return deleteSingleBook(req,res,id)
}

module.exports = {
    getBooks,
    getBook,
    createBook,
    updateBook ,
    deleteBook
}