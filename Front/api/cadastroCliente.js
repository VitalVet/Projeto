

const { cadastroCliente, closeConnection } = require('./database');

export default async function handler(req, res) {
  if (req.method === 'POST') {
    const { email, senha, telefone, nome, sobrenome } = req.body;

    if (email && senha && telefone && nome && sobrenome) {
      try {
        // Realiza o cadastro do cliente no banco de dados
        const sucessoCadastro = await cadastroCliente(email, senha, telefone, nome, sobrenome);

        if (sucessoCadastro) {
          res.status(200).json({ message: 'Cliente cadastrado com sucesso.' });
        } else {
          res.status(500).json({ error: 'Falha ao cadastrar o cliente.' });
        }
      } catch (error) {
        res.status(500).json({ error: 'Erro ao realizar o cadastro.' });
      } finally {
        // Fecha a conexão com o banco de dados após o cadastro
        await closeConnection();
      }
    } else {
      res.status(400).json({ error: 'Por favor, preencha todos os campos.' });
    }
  } else {
    res.status(405).json({ error: 'Método não permitido.' });
  }
}
