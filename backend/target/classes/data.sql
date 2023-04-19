INSERT INTO country (id, name, continent) VALUES (1, 'USA', 'Americas');
INSERT INTO country (id, name, continent) VALUES (2, 'Canada', 'Americas');
INSERT INTO country (id, name, continent) VALUES (3, 'France', 'Europe');
INSERT INTO country (id, name, continent) VALUES (4, 'Germany', 'Europe');

INSERT INTO author (id, name, surname, country_Id) VALUES (1, 'name1', 'surname1', 1);
INSERT INTO author (id, name, surname, country_Id) VALUES (2, 'name2', 'surname2', 3);

INSERT INTO book (id, name, category, author_Id, available_copies) VALUES (1, 'name1', 'NOVEL', 1, 5);
INSERT INTO book (id, name, category, author_Id, available_copies) VALUES (2, 'name2', 'FANTASY', 2, 3);
INSERT INTO book (id, name, category, author_Id, available_copies) VALUES (3, 'name3', 'CLASSICS', 1, 10);
INSERT INTO book (id, name, category, author_Id, available_copies) VALUES (4, 'name4', 'DRAMA', 2, 12);
INSERT INTO book (id, name, category, author_Id, available_copies) VALUES (5, 'name5', 'FANTASY', 1, 2);
INSERT INTO book (id, name, category, author_Id, available_copies) VALUES (6, 'name6', 'NOVEL', 2, 5);
