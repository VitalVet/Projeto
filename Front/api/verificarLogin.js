
  const { verificarLogin } = require('./database');

  export default async function handler(req, res) {
    if (req.method === 'POST') {
      const { email, senha } = req.body;
  
      try {
        const loginValido = await verificarLogin(email, senha);
  
        if (loginValido) {
          res.status(200).json({ message: 'Login bem-sucedido' });
        } else {
          res.status(401).json({ message: 'Credenciais inválidas' });
        }
      } catch (error) {
        console.error('Erro ao verificar o login:', error);
        res.status(500).json({ message: 'Erro interno no servidor' });
      }
    } else {
      res.status(405).json({ message: 'Método não permitido' });
    }
  }
  