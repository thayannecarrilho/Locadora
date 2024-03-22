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
