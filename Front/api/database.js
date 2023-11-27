const sql = require('mssql');

const config = {
  user: 'BD23338',
  password: 'BD23338',
  server: 'REGULUS',
  port: 1433,
  database: 'BD23338',
  options: {
    encrypt: true,
    trustServerCertificate: true,
  },
};

let pool;

async function connectDB() {
  try {
    if (!pool || !pool.connected) {
      pool = await sql.connect(config);
      console.log('Conectado ao banco de dados do SQL Server');
    }
    return pool;
  } catch (err) {
    console.error('Erro ao conectar ao banco de dados:', err);
    throw err;
  }
}

async function cadastroCliente(email, senha, telefone, nome, sobrenome) {
  try {
    const db = await connectDB();

    const request = db.request()
      .input('email', sql.NVarChar, email)
      .input('senha', sql.NVarChar, senha)
      .input('telefone', sql.NVarChar, telefone)
      .input('nome', sql.NVarChar, nome)
      .input('sobrenome', sql.NVarChar, sobrenome);

    const result = await request.query(`
      INSERT INTO projeto.Cliente (Email, Senha, Telefone, Nome, Sobrenome)
      VALUES (@email, @senha, @telefone, @nome, @sobrenome)
    `);


    if (result.rowsAffected[0] === 1) {
      console.log('Dados inseridos na tabela projeto.Cliente com sucesso:', { email, senha, telefone, nome, sobrenome });
      return true; // Retorna true se a inserção for bem-sucedida
    } else {
      console.error('Nenhum dado foi inserido na tabela projeto.Cliente');
      return false; // Retorna false se nenhum dado for inserido
    }
  } catch (err) {
    console.error('Erro ao inserir dados na tabela projeto.Cliente:', err);
    throw err;
  }
}





async function cadastroEmergencia(nomeDono, telefoneContato, especieAnimal, descricaoEmergencia) {
  try {
    const db = await connectDB();

    const request = db.request()
      .input('nomeDono', sql.NVarChar, nomeDono)
      .input('telefoneContato', sql.NVarChar, telefoneContato)
      .input('especieAnimal', sql.NVarChar, especieAnimal)
      .input('descricaoEmergencia', sql.Text, descricaoEmergencia)

    const result = await request.query(`
      INSERT INTO projeto.Emergencia (NomeDono, TelefoneContato, EspecieAnimal, DescricaoEmergencia)
      VALUES (@nomeDono, @telefoneContato, @especieAnimal, @descricaoEmergencia)
    `);

    if (result.rowsAffected[0] === 1) {
      console.log('Dados inseridos na tabela projeto.Cliente com sucesso:', { nomeDono, telefoneContato, especieAnimal, descricaoEmergencia});
      return true; // Retorna true se a inserção for bem-sucedida
    } else {
      console.error('Nenhum dado foi inserido na tabela projeto.Cliente');
      return false; // Retorna false se nenhum dado for inserido
    }
  } catch (err) {
    console.error('Erro ao inserir dados na tabela projeto.Cliente:', err);
    throw err;
  }
}

async function cadastroPet(nome_pet, dataNascimento, raca_pet, especie_pet, sexo_pet ) {
  try {
    const db = await connectDB();

    const request = db.request()
      .input('nome_pet', sql.NVarChar, nome_pet)
      .input('dataNascimento', sql.Date, dataNascimento)
      .input('raca_pet', sql.NVarChar, raca_pet)
      .input('especie_pet', sql.NVarChar, especie_pet)
      .input('sexo_pet', sql.NVarChar, sexo_pet)

    const result = await request.query(`
      INSERT INTO projeto.Pet (Nome, DataNascimento, Raça, Especie, Sexo)
      VALUES (@nome_pet, @dataNascimento, @raca_pet, @especie_pet, @sexo_pet)
    `);

    if (result.rowsAffected[0] === 1) {
      console.log('Dados inseridos na tabela projeto.Cliente com sucesso:', {nome_pet, dataNascimento, raca_pet, especie_pet, sexo_pet});
      return true; // Retorna true se a inserção for bem-sucedida
    } else {
      console.error('Nenhum dado foi inserido na tabela projeto.Cliente');
      return false; // Retorna false se nenhum dado for inserido
    }
  } catch (err) {
    console.error('Erro ao inserir dados na tabela projeto.Cliente:', err);
    throw err;
  }
}

async function verificarLogin(email, senha) {
  try {
    const db = await connectDB();

    const request = db.request()
      .input('email', sql.NVarChar, email)
      .input('senha', sql.NVarChar, senha);

    const result = await request.query(`
      SELECT * FROM projeto.Cliente WHERE Email = @email AND Senha = @senha
    `);

    if (result.recordset.length > 0) {
      console.log('Login bem-sucedido:', email);
      return true; // Retorna true se as credenciais estiverem corretas
    } else {
      console.error('Credenciais inválidas para o email:', email);
      return false; // Retorna false se as credenciais estiverem incorretas ou o usuário não existir
    }
  } catch (err) {
    console.error('Erro ao verificar o login:', err);
    throw err;
  }
}


async function closeConnection() {
  try {
    if (pool && pool.connected) {
      await pool.close();
      console.log('Conexão com o banco de dados fechada.');
    }
  } catch (err) {
    console.error('Erro ao fechar a conexão com o banco de dados:', err);
    throw err;
  }
}

module.exports = { connectDB, cadastroCliente, cadastroPet, cadastroEmergencia , closeConnection, verificarLogin };
