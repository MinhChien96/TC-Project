CREATE DATABASE Quiz CHARACTER SET utf8 COLLATE utf8_general_ci;
CREATE TABLE subject(
	idsub int PRIMARY KEY AUTO_INCREMENT,
    namesub varchar(100) not null UNIQUE
)
CREATE TABLE question(
	idquestion int PRIMARY KEY AUTO_INCREMENT,
    content text not null,
    level varchar(50),
    idsub int not null,
    idgroup int,
    FOREIGN KEY (idsub) REFERENCES subject(idsub),
    FOREIGN KEY (idgroup) REFERENCES question(idquestion)
)
CREATE TABLE anwser(
	idanwser int PRIMARY KEY AUTO_INCREMENT,
    content text not null,
    result int(1) not null,
    idquestion int not null,
    FOREIGN KEY (idquestion) REFERENCES question(idquestion)
)
CREATE TABLE account(
	idacc int PRIMARY KEY AUTO_INCREMENT,
    username varchar(50),
    password varchar(50),
    level varchar(10)
)