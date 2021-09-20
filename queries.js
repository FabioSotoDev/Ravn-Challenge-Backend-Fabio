/*

    JS contains queries from challenge part 1

*/

const db = require('./db');

function getTopAuthors() {
    const query = 'SELECT name, date_of_birth FROM authors ORDER BY date_of_birth ASC LIMIT 10';
    db.connect((err, client, done) => {
        if (err) throw err;
        try {
            client.query(query, (err, res) => {
                if (err) {
                    console.log(err.stack);
                } else {
                    console.log(res.rows);
                }
            });
        } finally {
            done();
        }
    });
}

function getSalesFromAuthor(name){
    const query = 'SELECT SUM (item_price) AS total_sales FROM ((authors INNER JOIN books ON authors.id = books.author_id) INNER JOIN sale_items ON books.id = sale_items.book_id) WHERE authors.name = $1';
    db.connect((err, client, done) => {
        if (err) throw err;
        try {
            row = [name];
            client.query(query, row, (err, res) => {
                if (err) {
                    console.log(err.stack);
                } else {
                    console.log('Total sales by Lorelai Gilmore');
                    console.log(res.rows);
                }
            });
        } finally {
            done();
        }
    });
}

function getTopAuthorsFromRevenues(){
    const query =  'SELECT authors.name, SUM(item_price) AS total_sales FROM ((authors INNER JOIN books ON authors.id = books.author_id) INNER JOIN sale_items ON books.id = sale_items.book_id) GROUP BY authors.name ORDER BY total_sales DESC LIMIT 10';
    db.connect((err, client, done) => {
        if (err) throw err;
        try {
            client.query(query, (err, res) => {
                if (err) {
                    console.log(err.stack);
                } else {
                    console.log(res.rows);
                }
            });
        } finally {
            done();
        }
    });
}

getTopAuthors();
getSalesFromAuthor('Lorelai Gilmore')
getTopAuthorsFromRevenues()