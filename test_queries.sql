--Select * from authors where name = 'Lorelai Gilmore'

--Select * from books

--Select * from sale_items

/*
Delete from sale_items;
Delete from books;
Delete from authors;
*/

--SELECT (name, date_of_birth) FROM authors ORDER BY date_of_birth ASC LIMIT 10
/*
SELECT SUM(item_price) AS total_sales FROM ((authors 
				INNER JOIN books ON authors.id = books.author_id) 
			    INNER JOIN sale_items ON books.id = sale_items.book_id) 
				WHERE authors.name = 'Josh Strosin'
*/

--UPDATE authors SET name = 'Lorelai Gilmore' where id = 0
/*
SELECT authors.name, SUM(item_price) AS total_sales FROM ((authors 
				INNER JOIN books ON authors.id = books.author_id) 
			    INNER JOIN sale_items ON books.id = sale_items.book_id)
				GROUP BY authors.name ORDER BY total_sales DESC LIMIT 10
				
*/