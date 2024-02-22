//Create web server
//Create web server
const http = require('http');
const fs = require('fs');
const path = require('path');
const url = require('url');
const comments = require('./comments');
const querystring = require('querystring');

// Create web server
http.createServer((req, res) => {
    // Parse request URL
    const urlObj = url.parse(req.url, true);
    const pathname = urlObj.pathname;

    // Routing
    if (pathname === '/') {
        fs.readFile(path.join(__dirname, 'index.html'), 'utf8', (err, data) => {
            res.writeHead(200, { 'Content-Type': 'text/html' });
            res.end(data);
        });
    } else if (pathname === '/comment') {
        // Add comment
        const comment = urlObj.query.comment;
        comments.addComment(comment, (err, comments) => {
            if (err) {
                res.writeHead(500);
                res.end('Server Error!');
                return;
            }
            res.end(JSON.stringify(comments));
        });
    } else if (pathname === '/getComments') {
        // Get comments
        comments.getComments((err, comments) => {
            if (err) {
                res.writeHead(500);
                res.end('Server Error!');
                return;
            }
            res.end(JSON.stringify(comments));
        });
    } else {
        res.writeHead(404);
        res.end('Not Found');
    }
}).listen(3000, () => {
    console.log('Server running at http://