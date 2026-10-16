CREATE DATABASE AdocaoPets
COLLATE Latin1_General_CI_AS;
GO

USE AdocaoPets;
GO

CREATE TABLE Ong (
    id INT IDENTITY(1,1) PRIMARY KEY,
    nome_fantasia VARCHAR(200) NOT NULL,
    cnpj VARCHAR(14) UNIQUE NOT NULL,
    endereco VARCHAR(300) NOT NULL,
    cidade VARCHAR(100) NOT NULL,
    estado CHAR(2) NOT NULL,
    telefone VARCHAR(15) NOT NULL,
    email VARCHAR(100) NOT NULL,
    responsavel VARCHAR(200),
    capacidade_animais INT,
    data_cadastro DATETIME DEFAULT GETDATE()
);
GO

CREATE TABLE Veterinario (
    id INT IDENTITY(1,1) PRIMARY KEY,
    nome VARCHAR(200) NOT NULL,
    crmv VARCHAR(10) UNIQUE NOT NULL,
    endereco VARCHAR(300) NOT NULL,
    cidade VARCHAR(100) NOT NULL,
    estado CHAR(2) NOT NULL,
    telefone VARCHAR(15) NOT NULL,
    email VARCHAR(100) NOT NULL
);
GO

CREATE TABLE Vacina (
    id INT IDENTITY(1,1) PRIMARY KEY,
    nome_vacina VARCHAR(100) NOT NULL,
    fabricante VARCHAR(100) NOT NULL,
    data_validade DATE NOT NULL,
    data_aplicacao DATETIME DEFAULT GETDATE()
);
GO

CREATE TABLE Usuario (
    id INT IDENTITY(1,1) PRIMARY KEY,
    nome VARCHAR(200) NOT NULL,
    email VARCHAR(100) NOT NULL,
    telefone VARCHAR(15) NOT NULL,
    endereco VARCHAR(300) NOT NULL,
    cidade VARCHAR(100) NOT NULL,
    estado CHAR(2) NOT NULL
);
GO

CREATE TABLE Animal (
    id INT IDENTITY(1,1) PRIMARY KEY,
    nome_pet VARCHAR(100) NOT NULL,
    dt_nascimento DATE NOT NULL,
    especie VARCHAR(50) NOT NULL,
    raca VARCHAR(50) NOT NULL,
    idade INT NOT NULL,
    peso DECIMAL(5,2) NOT NULL,
    sexo CHAR(1) NOT NULL,
    cor VARCHAR(50) NOT NULL,
    castrado BIT NOT NULL DEFAULT 0,
    data_cadastro DATETIME DEFAULT GETDATE(),
    
    id_ong INT,
    id_veterinario INT,
    id_vacina INT,

    FOREIGN KEY (id_ong) REFERENCES Ong(id),
    FOREIGN KEY (id_veterinario) REFERENCES Veterinario(id),
    FOREIGN KEY (id_vacina) REFERENCES Vacina(id)
);
GO

CREATE TABLE Adocao (
    id INT IDENTITY(1,1) PRIMARY KEY,
    id_usuario INT NOT NULL,
    id_animal INT NOT NULL,
    data_adocao DATETIME DEFAULT GETDATE(),

    FOREIGN KEY (id_usuario) REFERENCES Usuario(id),
    FOREIGN KEY (id_animal) REFERENCES Animal(id)
);
GO
