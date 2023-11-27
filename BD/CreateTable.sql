CREATE SCHEMA projeto;


CREATE TABLE projeto.Cliente (
    IdCliente INT IDENTITY(1,1) PRIMARY KEY,
    Email VARCHAR(100) UNIQUE NOT NULL,
    Senha VARCHAR(100) NOT NULL,
    Telefone VARCHAR(15) NOT NULL,
    Nome VARCHAR(50) NOT NULL,
    Sobrenome VARCHAR(50) NOT NULL
);

CREATE TABLE projeto.Pet (
    IdPet INT IDENTITY(1,1) PRIMARY KEY,
    Nome VARCHAR(50) NOT NULL,
    DataNascimento DATE not null,
    Raça VARCHAR(50) NOT NULL,
    Especie VARCHAR(50) NOT NULL,
    Sexo VARCHAR(10) NOT NULL,
    IdCliente INT,
    FOREIGN KEY (IdCliente) REFERENCES projeto.Cliente (IdCliente)
);

CREATE TABLE projeto.Consulta (
    IdConsulta INT IDENTITY(1,1) PRIMARY KEY,
    IdPet INT,
    Valor DECIMAL (10,2) NOT NULL,
    Assunto TEXT NOT NULL,
    Consultorio VARCHAR(100) NOT NULL,
    DataConsulta DATETIME NOT NULL,
    EhEmergencia CHAR(3) NOT NULL,
    FOREIGN KEY (IdPet) REFERENCES projeto.Pet (IdPet)
);

CREATE TABLE projeto.ClientePet (
    IdCliente INT,
    IdPet INT,
    PRIMARY KEY (IdCliente, IdPet),
    FOREIGN KEY (IdCliente) REFERENCES projeto.Cliente (IdCliente),
    FOREIGN KEY (IdPet) REFERENCES projeto.Pet (IdPet)
);

CREATE TABLE projeto.AuditoriaCliente (
    IdAuditoria INT IDENTITY(1,1) PRIMARY KEY,
    Operacao VARCHAR(10) NOT NULL,
    DataHora DATETIME NOT NULL,
    IdCliente INT,
    Email VARCHAR(100),
    Nome VARCHAR(50),
    Sobrenome VARCHAR(50)
);
