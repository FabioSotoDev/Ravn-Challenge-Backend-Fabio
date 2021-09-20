const express = require("express");
const app = express();

const db = require('../db');
var cacheService = require("express-api-cache"); //Cache Service
var cache = cacheService.cache;

db.connect((err, client, done) => {
    if (err) throw err;
    app.set('view engine', 'ejs');

    app.listen(3000, () => {
        console.log("El servidor está inicializado en el puerto 3000");
    });
    
    app.get('/', cache("10 minutes"), function (req, res) {
        var count = (req.query.count) ? req.query.count : 10;
        const query =  'SELECT authors.name, SUM(item_price) AS total_sales FROM ((authors INNER JOIN books ON authors.id = books.author_id) INNER JOIN sale_items ON books.id = sale_items.book_id) GROUP BY authors.name ORDER BY total_sales DESC LIMIT $1';
        var row = [count];
            client.query(query, row, (err, result) => {
                if (err) {
                    res.send("Error");
                } else {
                    res.render(__dirname + '/index', {data: result.rows, count: count});
                }
            });
    });
});