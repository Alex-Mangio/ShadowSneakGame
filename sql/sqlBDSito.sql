DROP DATABASE if exists dbSito;
CREATE DATABASE dbSito;

use dbSito;

CREATE TABLE Users(
	id_user INT PRIMARY KEY AUTO_INCREMENT,
	nome varchar(50) NOT NULL,
    cognome varchar(100) NOT NULL,
    username varchar(255) NOT NULL,
    email varchar(255) NOT NULL,
    user_password varchar(255) NOT NULL
);

CREATE TABLE recensioni (
    id INT AUTO_INCREMENT PRIMARY KEY,
    user_id INT NOT NULL,
    voto TINYINT NOT NULL CHECK (voto BETWEEN 1 AND 5),
    descrizione TEXT NULL,
    data_inserimento TIMESTAMP DEFAULT CURRENT_TIMESTAMP,
    FOREIGN KEY (user_id) REFERENCES Users(id_user)
);

INSERT INTO Users(nome,cognome,username,email,user_password) VALUES("Alex","Mangio","username","ale@gmail.com","password");