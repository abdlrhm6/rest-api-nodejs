const fs = require("node:fs")

let books = require("../data.json")


function getAllBooks(req, res) {
    res.writeHead(200, { "Content-Type": "application/json" }).end(JSON.stringify(books))
}

function getSingleBook(req, res, id) {

    const book = books.find(book => book.id == id)

    if (book) {
        res.writeHead(200, { "Content-Type": "application/json" }).end(JSON.stringify(book))
    } else {
        res.writeHead(404, { "Content-Type": "application/json" }).end(JSON.stringify(
            {
                success: false,
                data: "Book Not Found"
            }
        ))
    }
}


function createSingleBook(req, res, body) {
    const id = books.length +1 
    books = [...books, { id, ...body }]
    fs.writeFileSync(__dirname + '/../data.json', JSON.stringify(books), "utf8")
    res.writeHead(201, { "Content-Type": "application/json" }).end(JSON.stringify(body))
}

function updateSingleBook(req, res, id, body) {
    let found = false

    books.forEach(book => {
        if (book.id == id) {
            found = true
            book.name = body.name || book.name
            book.author = body.author || book.author
            book.year = body.year || book.year
        }
    })

    if (found) {
        fs.writeFileSync(__dirname + '/../data.json', JSON.stringify(books), "utf8")
        res.writeHead(201, { "Content-Type": "application/json" }).end(JSON.stringify(body))
    } else {
        res.writeHead(404, { "Content-Type": "application/json" }).end(JSON.stringify({
            success: false,
            data: "Book Not Found"
        }))
    }
}

function deleteSingleBook(req, res, id) {
    const book = books.find(book => book.id == id)
    if (!book) {
        res.writeHead(404, { "Content-Type": "application/json" }).end(JSON.stringify({
            success: false,
            data: "Book Not Found"
        }))
    } else {
        books = books.filter(book => book.id != id)
        fs.writeFileSync(__dirname + '/../data.json', JSON.stringify(books), "utf8")
        res.writeHead(201, { "Content-Type": "application/json" }).end(JSON.stringify({
            message: "Book deleted successfully"
        }))
    }
}






module.exports = {
    getAllBooks,
    getSingleBook,
    createSingleBook,
    updateSingleBook,
    deleteSingleBook
}