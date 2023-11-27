// pages/api/cadastroCliente.js

const { cadastroEmergencia, closeConnection } = require('./database');

export default async function handler(req, res) {
  if (req.method === 'POST') {
    const { nomeDono, telefoneContato, especieAnimal, descricaoEmergencia } = req.body;

    if (nomeDono && telefoneContato && especieAnimal && descricaoEmergencia) {
      try {
        // Realiza o cadastro do cliente no banco de dados
        const sucessoCadastro = await cadastroEmergencia(nomeDono, telefoneContato, especieAnimal, descricaoEmergencia);

        if (sucessoCadastro) {
          res.status(200).json({ message: 'emergencia cadastrado com sucesso.' });
        } else {
          res.status(500).json({ error: 'Falha ao cadastrar o emergencia.' });
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
