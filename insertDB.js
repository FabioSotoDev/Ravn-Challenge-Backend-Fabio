/*

    JS to insert our seeder from src/output.csv to Postgresql

*/

const fastcsv = require('fast-csv');
const db = require('./db');
const fs = require('fs');

function insertAuthorsFromCsv() {
    let csvData = [];
    return (
        fastcsv.parse().on('data', (data) => {
                csvData.push(data);
            }).on('data-invalid', (row, rowNumber) =>
                console.log(
                    `Invalid [rowNumber=${rowNumber}] [row=${JSON.stringify(row)}]`
                )
            ).on('end', () => {
                const query =
                    'INSERT INTO authors (id, name, date_of_birth) VALUES ($1, $2, $3)';
                db.connect((err, client, done) => {
                    if (err) throw err;
                    try {
                        csvData.forEach((row) => {
                            client.query(query, row, (err, res) => {
                                if (err) {
                                    console.log(err.stack);
                                } else {
                                    console.log('inserted ' + res.rowCount + ' row:', row);
                                }
                            });
                        });
                    } finally {
                        done();
                    }
                });
            })
    );
}

function insertBooksFromCsv() {
    let csvData = [];
    return (
        fastcsv.parse().on('data', (data) => {
                csvData.push(data);
            }).on('data-invalid', (row, rowNumber) =>
                console.log(
                    `Invalid [rowNumber=${rowNumber}] [row=${JSON.stringify(row)}]`
                )
            ).on('end', () => {
                const query =
                    'INSERT INTO books (id, author_id, isbn) VALUES ($1, $2, $3)';
                db.connect((err, client, done) => {
                    if (err) throw err;
                    try {
                        csvData.forEach((row) => {
                            client.query(query, row, (err, res) => {
                                if (err) {
                                    console.log(err.stack);
                                } else {
                                    console.log('inserted ' + res.rowCount + ' row:', row);
                                }
                            });
                        });
                    } finally {
                        done();
                    }
                });
            })
    );
}

function insertSalesFromCsv() {
    let csvData = [];
    return (
        fastcsv.parse().on('data', (data) => {
                csvData.push(data);
            }).on('data-invalid', (row, rowNumber) =>
                console.log(
                    `Invalid [rowNumber=${rowNumber}] [row=${JSON.stringify(row)}]`
                )
            ).on('end', () => {
                const query =
                    'INSERT INTO sale_items (id, book_id, customer_name, item_price, quantity) VALUES ($1, $2, $3, $4, $5)';
                db.connect((err, client, done) => {
                    if (err) throw err;
                    try {
                        csvData.forEach((row) => {
                            client.query(query, row, (err, res) => {
                                if (err) {
                                    console.log(err.stack);
                                } else {
                                    console.log('inserted ' + res.rowCount + ' row:', row);
                                }
                            });
                        });
                    } finally {
                        done();
                    }
                });
            })
    );
}

function fillDB() {
    let streamAuthors = fs.createReadStream('./src/authors.csv');
    streamAuthors.pipe(insertAuthorsFromCsv());

    let streamBooks = fs.createReadStream('./src/books.csv');
    streamBooks.pipe(insertBooksFromCsv());

    let streamSales = fs.createReadStream('./src/sales.csv');
    streamSales.pipe(insertSalesFromCsv());
}

fillDB();