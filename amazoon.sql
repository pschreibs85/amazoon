PRAGMA foreign_keys = ON;
# TODO: Write your schema here.
# items inserted into a table are automatically given a RowID value which can be used as a primary key.
#  FOREIGN KEY (user_id) REFERENCES users(id),
#  FOREIGN KEY (cohort_id) REFERENCES cohorts(id)



CREATE TABLE `Customers` (
     id INTEGER PRIMARY KEY ASC,
	`CustomerID`	TEXT NOT NULL,
	`CustomerName`	TEXT NOT NULL,
	`CustomerEmail`	TEXT NOT NULL
);

CREATE TABLE `DetailLine` (    
    id INTEGER PRIMARY KEY ASC,
	`OrderID`	INTEGER NOT NULL,
	`ProductID`	INTEGER NOT NULL,
    `ProductQuantity`	INTEGER NOT NULL
);

CREATE TABLE `Orders` (
     id INTEGER PRIMARY KEY ASC,
	`OrderID`	TEXT NOT NULL,
	`OrderDate`	TEXT NOT NULL,
	`OrderTotal`	INTEGER NOT NULL,
	`OrderStatus`	TEXT NOT NULL,
	`CusId`	INTEGER NOT NULL
);

CREATE TABLE `Product` (
     id INTEGER PRIMARY KEY ASC,
	`ProductId`	TEXT NOT NULL,
	`ProductLabel`	TEXT NOT NULL,
	`ProductPrice`	INTEGER NOT NULL
);
