const config = require('./config')


const http = require('http');

const url = require('url');
const { StringDecoder } = require('node:string_decoder'); 

const serverFunction = function (req, res) {
    // ? PATH
    const parsedUrl = url.parse(req.url, true);
    const trimmedPath = parsedUrl.pathname.trim().replace(/^\/+|\/+$/g, '')
    console.log(trimmedPath)
    const method = req.method.toLowerCase();
    const headers = req.headers;

    let decoder = new StringDecoder('utf-8')
    let body = '';
    req.on('data', function (chunk) {
        body+=decoder.write(chunk)
    })

    req.on('end', function () {
        body += decoder.end();
        const handlerMethod = router[trimmedPath] ? router[trimmedPath] : router.notFound;

        handlerMethod(req,res)
    })

    // res.end('Hello world')
}

const handlers = {

}
handlers.test = function (req, res) {
    res.end('This is the test handler')
}
handlers.notFound = function (req, res) {
    res.end('Route not found')
}
const router = {
    test: handlers.test,
    notFound: handlers.notFound
}

const server = http.createServer(serverFunction);
server.listen(config.httpPortNo, function () {
    console.log('Server listening on PORT '+ config.httpPortNo)
})
