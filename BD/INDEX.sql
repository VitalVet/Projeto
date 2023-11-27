CREATE INDEX idx_Cliente_Email ON projeto.Cliente (Email);
--ajuda ao buscar resgistros de clientes por e-mail

CREATE INDEX idx_Pet_IdCliente ON projeto.Pet (IdCliente);
--ajuda ao pesuisar registros de animais de estimação por ID do cliente.

CREATE INDEX idx_Consulta_IdPet ON projeto.Consulta (IdPet);
--ajuda ao pesquisar registros de consultas por ID de animal de estimação associado.

CREATE INDEX idx_ClientePet_IdClienteIdPet ON projeto.ClientePet (IdCliente, IdPet);
-- melhorar o desempenho ao trabalhar com a tabela interativa "projeto.ClientePet" que relaciona clientes e animais de estimação.


SELECT *
FROM projeto.Cliente
WHERE Email = 'novo@email.com';

SELECT *
FROM projeto.Pet
WHERE IdCliente = 1; -- Substitua pelo ID do cliente desejado


SELECT *
FROM projeto.Consulta
WHERE IdPet = 1; -- Substitua pelo ID do pet desejado
