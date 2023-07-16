drop database if exists temp;
create database temp default character set utf8 collate utf8_general_ci;
grant all on temp.* to 'staff'@'localhost' identified by 'password';
use temp;
CREATE TABLE cache
(
    id int AUTO_INCREMENT PRIMARY KEY,
    ip varchar(255) not null,
    fre varchar(255) not null,
    time varchar(255) not null
);
CREATE TABLE list
(
    id int AUTO_INCREMENT PRIMARY KEY, 
    ip varchar(255) not null,
    time varchar(255) not null
);

