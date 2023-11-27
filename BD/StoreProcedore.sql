CREATE PROCEDURE InserirNovoCliente
    @Email VARCHAR(100),
    @Senha VARCHAR(100),
    @Telefone VARCHAR(15),
    @Nome VARCHAR(50),
    @Sobrenome VARCHAR(50)
AS
BEGIN
    INSERT INTO projeto.Cliente (Email, Senha, Telefone, Nome, Sobrenome)
    VALUES (@Email, @Senha, @Telefone, @Nome, @Sobrenome);
END;


--inserir um novo cliente na tabela `Cliente` com as informações fornecidas, como e-mail, senha, telefone, nome e sobrenome.

EXEC InserirNovoCliente
    @Email = 'novo@email.com',
    @Senha = 'senha123',
    @Telefone = '123456789',
    @Nome = 'Novo',
    @Sobrenome = 'Cliente';





CREATE PROCEDURE InserirNovoPet
    @Nome VARCHAR(50),
    @DataNascimento DATE,
    @Raça VARCHAR(50),
    @Especie VARCHAR(50),
    @Sexo VARCHAR(10),
    @IdCliente INT
AS
BEGIN
    INSERT INTO projeto.Pet (Nome, DataNascimento, Raça, Especie, Sexo, IdCliente)
    VALUES (@Nome, @DataNascimento, @Raça, @Especie, @Sexo, @IdCliente);
END;

--Insere um novo pet associado a um cliente na tabela `Pet`. Os dados são nome, data de nascimento, raça, espécie, sexo e o ID do cliente ao qual o pet está vinculado.

EXEC InserirNovoPet
    @Nome = 'Rex',
    @DataNascimento = '2022-01-15',
    @Raça = 'Labrador',
    @Especie = 'Cachorro',
    @Sexo = 'Macho',
    @IdCliente = 1;  -- Substitua pelo ID do cliente associado




CREATE PROCEDURE InserirNovaConsulta
    @IdPet INT,
    @Valor VARCHAR(20),
    @Assunto TEXT,
    @Consultorio VARCHAR(100),
    @Data VARCHAR(20), 
    @EhEmergencia CHAR(3)
AS
BEGIN
    
    DECLARE @DataConvert DATETIME;
    SET @DataConvert = CONVERT(DATETIME, @Data, 120); 

    INSERT INTO projeto.Consulta (IdPet, Valor, Assunto, Consultorio, Data, EhEmergencia)
    VALUES (@IdPet, @Valor, @Assunto, @Consultorio, @DataConvert, @EhEmergencia);
END;

-- Insere uma nova consulta na tabela `Consulta`. Os parâmetros incluem ID do pet, valor, assunto, local, data e se é uma situação de emergência.



EXEC InserirNovaConsulta
    @IdPet = 1,
    @Valor = '100.00',
    @Assunto = 'Consulta de Rotina',
    @Consultorio = 'Clínica Veterinária XYZ',
    @Data = '2023-03-20 10:00:00',
    @EhEmergencia = 'Não';





CREATE PROCEDURE ObterInformacoesClienteEPets
    @IdCliente INT
AS
BEGIN
    SELECT c.IdCliente, c.Nome AS NomeCliente, c.Sobrenome AS SobrenomeCliente,
           p.IdPet, p.Nome AS NomePet, p.Raça, p.Especie, p.Sexo
    FROM projeto.Cliente c
    LEFT JOIN projeto.Pet p ON c.IdCliente = p.IdCliente
    WHERE c.IdCliente = @IdCliente;
END;

-- Retorna as informações de um cliente e seus pets. As informações incluem ID, nome e sobrenome do cliente, bem como ID, nome, raça, espécie e sexo de cada pet associado.


EXEC ObterInformacoesClienteEPets
    @IdCliente = 1;  

	SELECT *
FROM projeto.Consulta;
