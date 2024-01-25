const http = require("node:http")
const { getBooks, getBook ,createBook,updateBook  , deleteBook} = require("./controllers/bookController")

const app = http.createServer((req, res) => {

    if (req.url == '/api/books' && req.method == 'GET') {
        return getBooks(req, res)

    } else if (req.url.match(/\/books\/\w+/) && req.method == 'GET') {
        return getBook(req, res)
    } else if (req.url == '/api/books' && req.method == 'POST') {
        return createBook(req, res)
    }else if (req.url .match(/\/books\/\w+/) && req.method == 'PUT') {
        return updateBook(req, res)
    }else if (req.url .match(/\/books\/\w+/) && req.method == 'DELETE') {
        return deleteBook(req, res)
    }else {
        res.writeHead(404, {'Content-Type' :'applacation/json'})
        .end(JSON.stringify({
            message :"Not Found 404"
        }))
    }
})

app.listen(4000)