const http = require('http');
const path = require('path');
const fs = require('fs');

const server = http.createServer((req, res) => {
    /*
    if(req.url === '/'){
        fs.readFile(path.join(__dirname, 'public', 'web.html'), (err, content) => {
            if(err) throw err;
            res.writeHead(200, {'Content-Type': 'text/html'});
            res.end(content);
        })
    }*/
    // Build fie path
    let filePath = path.join(__dirname, 'public', req.url === '/' ? 'web.html' : req.url);
    console.log(filePath);
    res.end();

    // Extension of file
    let extname = path.extname(filePath);

    //Initial content type
    let conetentType = 'text/html';
    switch (extname){
        case '.js':
            conetentType = 'text/javascript';
            break;
        case '.css':
            conetentType = 'text/css';
            break;
        case '.json':
            conetentType = 'application/json';
            break;
        case '.png':
            conetentType = "image/png";
            break;
        case '.jpg':
            conetentType = 'image/jpg';
            break;
    }

    

});

const PORT = process.env.PORT || 8000;

server.listen(PORT, () => console.log('Server running on port ${PORT}'));
