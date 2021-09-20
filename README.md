# Ravn-Challenge-Backend-Fabio

Repository that contains source code from RAVN backend challenge.

Technologies:
  - PostgreSQL
  - NodeJS
  - Express
  - pgAdmin

To seed our Database:
  - Create new database in postgresql (named "RAVN-challenge")
  - File "creating_queries.sql" has queries to create the basic tables (authors, books and sale_items)
  - "config.js"  and "db.js" are useful to store the basi configuration from our DB.
  - "src" folder contains csv files to seed our DB. The command "node insertDB.js" fill the DB with "src" folder.
      * Note: To create new data from zero, "node seeder.js" creates new csv files in "src" folder.
  - Now we can check our DB with pgAdmin and check if the data was inserted succefully.

Queries:
  - "queries.js" contains 3 queries to answer the requested questions.
    1. Who are the first 10 authors ordered by date_of_birth? = getTopAuthors()
    2. What is the sales total for the author named “Lorelai Gilmore”? = getSalesFromAuthor('Lorelai Gilmore')
    3. What are the top 10 performing authors, ranked by sales revenue?	= getTopAuthorsFromRevenues()
  - To test this queries, run "node queries.js" command.

Basic Endpoint:
  - "endpoint" folder contains 2 files:
      * "endpoint.js" to use express and develop the basic endpoint, also internally doing cache perfomance.
      * "index.ejs"to show the web page with te required data.
  - "node endpoint/endpoint.js" command starts the endpoint in 3000 port, and we can check the endpoint in localhost/3000
