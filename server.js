const http = require('http');
const url = require('url');
const { StringDecoder } = require('node:string_decoder'); 

const serverFunction = function (req, res) {
    // ? PATH
    const parsedUrl = url.parse(req.url, true);
    const trimmedPath = parsedUrl.pathname.trim().replace(/^\/+|\/+$/g, '')
    const queryStringObject = parsedUrl.query;
    const method = req.method.toLowerCase();
    const headers = req.headers;

    let decoder = new StringDecoder('utf-8')
    let body = '';
    req.on('data', function (chunk) {
        body+=decoder.write(chunk)
    })

    req.on('end', function () {
        body += decoder.end();
      
    })

    res.end('Hello world')
}




const server = http.createServer(serverFunction);
server.listen(3000, function () {
    console.log('Server listening on PORT 3000')
})
