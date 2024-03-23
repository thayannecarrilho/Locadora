CREATE DATABASE speedcar;

USE speedcar;

CREATE TABLE cliente (
	cpf char(11) not null,
    name varchar(255) null,
    birth date null,
    cardval date null,
    celphone char(20) null,
    cep char(8) null,
    address varchar(255) null,
    number char(10) null,
    city varchar(50) null,
    state varchar(50) null,
    primary key (cpf)
);

SELECT * FROM cliente;

CREATE TABLE reserva (
	id int auto_increment not null primary key, 
	cpf char(11) not null,
    veiculo varchar(30) null,
    placa varchar(10) not null,
    localretirada varchar(30) not null,
    dataretirada date not null,
    horaretirada time not null,
    localdevolucao varchar(30) not null,
    datadevolucao date not null,
    horadevolucao time not null,
    CONSTRAINT FK_cpf FOREIGN KEY (cpf)
    REFERENCES cliente(cpf)
);
