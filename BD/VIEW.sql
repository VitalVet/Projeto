CREATE VIEW ClientePetView AS
SELECT c.IdCliente, c.Nome AS NomeCliente, c.Sobrenome AS SobrenomeCliente,
       p.IdPet, p.Nome AS NomePet, p.Raça, p.Especie, p.Sexo
FROM projeto.Cliente c
LEFT JOIN projeto.Pet p ON c.IdCliente = p.IdCliente;



-- Essa view fornece uma visão "segura" das informações relacionadas a clientes e seus respectivos pets. Ela vai listar o ID do cliente, nome e sobrenome do cliente, além do ID, nome
 -- raça, espécie e sexo de cada pet associado a esse cliente. Mesmo os clientes sem pets são incluídos na visualização 

SELECT * FROM ClientePetView;


CREATE VIEW ConsultaPorCliente AS
SELECT c.IdCliente, c.Nome AS NomeCliente, c.Sobrenome AS SobrenomeCliente,
       co.IdConsulta, co.Valor, co.Assunto, co.Consultorio, co.Data, co.EhEmergencia
FROM projeto.Cliente c
LEFT JOIN projeto.Pet p ON c.IdCliente = p.IdCliente
LEFT JOIN projeto.Consulta co ON p.IdPet = co.IdPet;

  -- Essa view apresenta informações detalhadas sobre consultas, associando elas aos clientes e aos pets envolvidos. 
  --Ela inclui informações do cliente: ID do cliente nome e sobrenome do cliente, juntamente com o ID da consulta, valor, assunto, local, data e indicação de emergência. 
  -- para que fiz o left joins utilização de LEFT JOINs garante que todos os clientes e pets sejam incluídos, mesmo que não tenham consultas associadas.

SELECT * FROM ConsultaPorCliente;



CREATE VIEW PetsSemConsultas AS
SELECT p.IdPet, p.Nome, p.Raça, p.Especie, p.Sexo
FROM projeto.Pet p
LEFT JOIN projeto.Consulta co ON p.IdPet = co.IdPet
WHERE co.IdConsulta IS NULL;

 --Esta view destaca pets que ainda não tiveram consultas registradas. Ela lista o ID do pet, nome, raça, espécie e sexo. 
 --A condição do LEFT JOIN exclui pets que já têm consultas associadas, focando naqueles que ainda não tiveram interações médicas registradas.


SELECT * FROM PetsSemConsultas;



CREATE VIEW ConsultasEmergencia AS
SELECT IdConsulta, IdPet, Valor, Assunto, Consultorio, Data, EhEmergencia
FROM projeto.Consulta
WHERE EhEmergencia = 'Sim';

   --Essa view é usada em consultas marcadas como emergência. Ela apresenta o ID da consulta, ID do pet associado, valor, assunto, local, data e um indicador de emergência. 


SELECT * FROM ConsultasEmergencia;


INSERT INTO projeto.Consulta (IdConsulta, IdPet, Valor, Assunto, Consultorio, Data, EhEmergencia)
VALUES (9, 1, '100.00', 'Emergência Cardíaca', 'Hospital XYZ', GETDATE(), 'Sim');



INSERT INTO projeto.Pet (IdPet, Nome, DataNascimento, Raça, Especie, Sexo, IdCliente)
VALUES (1, 'NomePet', '2000-01-01', 'RaçaPet', 'EspeciePet', 'SexoPet', 1);


INSERT INTO projeto.Consulta (IdPet, Valor, Assunto, Consultorio, Data, EhEmergencia)
VALUES (1, '100.00', 'Emergência Cardíaca', 'Hospital XYZ', GETDATE(), 'Sim');





