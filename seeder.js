/*

    JS to seed a csv with random Data to insert in Postgresql Database

*/

const faker = require('faker');

let authors_id_count = 0;
let books_id_count = 0;
let sales_id_count = 0;

function createAuthor() {
    const id = authors_id_count;//faker.datatype.uuid();
    authors_id_count += 1;
    const name = faker.name.findName();
    const date_of_birth = faker.date.between('1980-01-01', '1990-01-01').toLocaleString();

    //console.log(`${id},${name},${date_of_birth}\n`);

    return `${id},${name},${date_of_birth}\n`;
}

function createBook(idAuthor) {
    const id = books_id_count;
    books_id_count += 1;
    const author_id = idAuthor;
    const isbn = faker.datatype.number({min: 100, max: 999}) + '-' + 
                 faker.datatype.number({min: 0, max: 9}) + '-' + 
                 faker.datatype.number({min: 10, max: 99}) + '-' + 
                 faker.datatype.number({min: 100000, max: 999999}) + '-' +
                 faker.datatype.number({min: 0, max: 9});

    //console.log(`${id}, ${author_id}, ${isbn}\n`);

    return `${id},${author_id}, ${isbn}\n`;
}

function createSaleItems(idBook) {
    const id = sales_id_count;
    const book_id = idBook;
    sales_id_count += 1;
    const customer_name = faker.name.findName();
    const item_price = faker.finance.amount(20, 80, 2);
    const quantity = faker.datatype.number({min: 1, max: 10});

    //console.log(`${id},${book_id},${customer_name},${item_price},${quantity}\n`);

    return `${id},${book_id},${customer_name},${item_price},${quantity}\n`;
}

const fs = require('fs');

const streamAuthors = fs.createWriteStream('./src/authors.csv');
const streamBooks = fs.createWriteStream('./src/books.csv');
const streamSales = fs.createWriteStream('./src/sales.csv');

function seedData(authorCount){
    let tempCount = 0;
    for(let i = 0; i < authorCount; ++i){
        streamAuthors.write(createAuthor(), 'utf-8');
        let book_quantity = faker.datatype.number({min: 10, max: 30}); // Min 10 books and max 30 books for each author
        for(let j = 0; j < book_quantity; ++j){
            streamBooks.write(createBook(i), 'utf-8');
            let sales_quantity = faker.datatype.number({min: 2, max: 15}); // Min 2 sales and max 15 sales for each book
            for (let k = 0; k < sales_quantity; ++k){
                streamSales.write(createSaleItems(tempCount + j), 'utf-8');
            }
        }
        tempCount += book_quantity;
    }
    streamAuthors.end();
    streamBooks.end();
    streamSales.end();
    console.log("Data added to csv correctly");
}

seedData(50); //Seed 50 authors with random books and random sales for each book