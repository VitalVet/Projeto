CREATE VIEW ClientePetView AS
SELECT c.IdCliente, c.Nome AS NomeCliente, c.Sobrenome AS SobrenomeCliente,
       p.IdPet, p.Nome AS NomePet, p.Ra�a, p.Especie, p.Sexo
FROM projeto.Cliente c
LEFT JOIN projeto.Pet p ON c.IdCliente = p.IdCliente;



-- Essa view fornece uma vis�o "segura" das informa��es relacionadas a clientes e seus respectivos pets. Ela vai listar o ID do cliente, nome e sobrenome do cliente, al�m do ID, nome
 -- ra�a, esp�cie e sexo de cada pet associado a esse cliente. Mesmo os clientes sem pets s�o inclu�dos na visualiza��o 

SELECT * FROM ClientePetView;


CREATE VIEW ConsultaPorCliente AS
SELECT c.IdCliente, c.Nome AS NomeCliente, c.Sobrenome AS SobrenomeCliente,
       co.IdConsulta, co.Valor, co.Assunto, co.Consultorio, co.Data, co.EhEmergencia
FROM projeto.Cliente c
LEFT JOIN projeto.Pet p ON c.IdCliente = p.IdCliente
LEFT JOIN projeto.Consulta co ON p.IdPet = co.IdPet;

  -- Essa view apresenta informa��es detalhadas sobre consultas, associando elas aos clientes e aos pets envolvidos. 
  --Ela inclui informa��es do cliente: ID do cliente nome e sobrenome do cliente, juntamente com o ID da consulta, valor, assunto, local, data e indica��o de emerg�ncia. 
  -- para que fiz o left joins utiliza��o de LEFT JOINs garante que todos os clientes e pets sejam inclu�dos, mesmo que n�o tenham consultas associadas.

SELECT * FROM ConsultaPorCliente;



CREATE VIEW PetsSemConsultas AS
SELECT p.IdPet, p.Nome, p.Ra�a, p.Especie, p.Sexo
FROM projeto.Pet p
LEFT JOIN projeto.Consulta co ON p.IdPet = co.IdPet
WHERE co.IdConsulta IS NULL;

 --Esta view destaca pets que ainda n�o tiveram consultas registradas. Ela lista o ID do pet, nome, ra�a, esp�cie e sexo. 
 --A condi��o do LEFT JOIN exclui pets que j� t�m consultas associadas, focando naqueles que ainda n�o tiveram intera��es m�dicas registradas.


SELECT * FROM PetsSemConsultas;



CREATE VIEW ConsultasEmergencia AS
SELECT IdConsulta, IdPet, Valor, Assunto, Consultorio, Data, EhEmergencia
FROM projeto.Consulta
WHERE EhEmergencia = 'Sim';

   --Essa view � usada em consultas marcadas como emerg�ncia. Ela apresenta o ID da consulta, ID do pet associado, valor, assunto, local, data e um indicador de emerg�ncia. 


SELECT * FROM ConsultasEmergencia;


INSERT INTO projeto.Consulta (IdConsulta, IdPet, Valor, Assunto, Consultorio, Data, EhEmergencia)
VALUES (9, 1, '100.00', 'Emerg�ncia Card�aca', 'Hospital XYZ', GETDATE(), 'Sim');



INSERT INTO projeto.Pet (IdPet, Nome, DataNascimento, Ra�a, Especie, Sexo, IdCliente)
VALUES (1, 'NomePet', '2000-01-01', 'Ra�aPet', 'EspeciePet', 'SexoPet', 1);


INSERT INTO projeto.Consulta (IdPet, Valor, Assunto, Consultorio, Data, EhEmergencia)
VALUES (1, '100.00', 'Emerg�ncia Card�aca', 'Hospital XYZ', GETDATE(), 'Sim');





