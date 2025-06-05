DROP DATABASE if exists dbSito;
CREATE DATABASE dbSito;

use dbSito;

CREATE TABLE Users(
	id_user INT PRIMARY KEY AUTO_INCREMENT,
	nome varchar(50) NOT NULL,
    cognome varchar(100) NOT NULL,
    username varchar(255) NOT NULL,
    CONSTRAINT chk_email CHECK (email REGEXP '^[a-zA-Z0-9._%+-]+@[a-zA-Z0-9.-]+\.[a-zA-Z]{2,}$') ENFORCED,
    user_password varchar(255) NOT NULL
);

