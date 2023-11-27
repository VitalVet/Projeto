// pages/api/cadastroCliente.js

const { cadastroPet, closeConnection } = require('./database');

export default async function handler(req, res) {
  if (req.method === 'POST') {
    const {  nome_pet, dataNascimento, raca_pet, especie_pet, sexo_pet } = req.body;

    if ( nome_pet && dataNascimento && raca_pet && especie_pet && sexo_pet ) {
      try {
        // Realiza o cadastro do cliente no banco de dados
        const sucessoCadastro = await cadastroPet( nome_pet, dataNascimento, raca_pet, especie_pet, sexo_pet );

        if (sucessoCadastro) {
          res.status(200).json({ message: 'Pet cadastrado com sucesso.' });
        } else {
          res.status(500).json({ error: 'Falha ao cadastrar o Pet.' });
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
