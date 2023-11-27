import React, { useState } from 'react';
import styles from 'styles/Cadastro.module.css';
import Link from 'next/link';

function Cadastro() {
  const [formValues, setFormValues] = useState({
    email: '',
    senha: '',
    telefone: '',
    nome: '',
    sobrenome: '',
  });

  const [cadastroConcluido, setCadastroConcluido] = useState(false);

  const handleChange = (e) => {
    const { name, value } = e.target;
    setFormValues({
      ...formValues,
      [name]: value,
    });
  };

  const handleSubmit = async (e) => {
    e.preventDefault();

    const { email, senha, telefone, nome, sobrenome } = formValues;
    if (email && senha && telefone && nome && sobrenome) {
      try {
        const response = await fetch('/api/cadastroCliente', {
          method: 'POST',
          headers: {
            'Content-Type': 'application/json',
          },
          body: JSON.stringify(formValues),
        });

        if (response.ok) {
          setCadastroConcluido(true);
        } else {
          alert('Falha ao cadastrar o cliente.');
        }
      } catch (error) {
        console.error('Erro ao realizar o cadastro:', error);
        alert('Erro ao cadastrar o cliente.');
      }
    } else {
      alert('Por favor, preencha todos os campos!');
    }
  };

  return (
    <div className={styles.cadastroBody}>
      <div className={styles.cadastroContainer}>
        <h1 className={styles.cadastroTitle}>
          Vital<span className={styles.cadastroStrong}>Vet</span>
        </h1>
        <h2 className={styles.cadastroTitle}>Cadastro</h2>
        {!cadastroConcluido ? (
          <form onSubmit={handleSubmit} className={styles.cadastroForm}>
            <label htmlFor="nome" className={styles.cadastroLabel}>
              Nome:
            </label>
            <input
              type="text"
              id="nome"
              name="nome"
              required
              className={styles.cadastroInput}
              onChange={handleChange}
            />

            <label htmlFor="sobrenome" className={styles.cadastroLabel}>
              Sobrenome:
            </label>
            <input
              type="text"
              id="sobrenome"
              name="sobrenome"
              required
              className={styles.cadastroInput}
              onChange={handleChange}
            />

            <label htmlFor="email" className={styles.cadastroLabel}>
              E-mail:
            </label>
            <input
              type="email"
              id="email"
              name="email"
              required
              className={styles.cadastroInput}
              onChange={handleChange}
            />

            <label htmlFor="telefone" className={styles.cadastroLabel}>
              Telefone:
            </label>
            <input
              type="tel"
              id="telefone"
              name="telefone"
              required
              className={styles.cadastroInput}
              onChange={handleChange}
            />

            <label htmlFor="senha" className={styles.cadastroLabel}>
              Senha:
            </label>
            <input
              type="password"
              id="senha"
              name="senha"
              required
              className={styles.cadastroInput}
              onChange={handleChange}
            />

            <button type="submit" className={styles.cadastroCadastroBtn}>
              Cadastrar
            </button>
            <br />
            <Link href="/" className={styles.cadastroLink}>
              Voltar
            </Link>
          </form>
        ) : (
          <div className={styles.cadastroConcluido}>
            <p>Cadastro concluído!</p>
            <br />
            <Link href="/" className={styles.cadastroLink}>
              Voltar
            </Link>
          </div>
        )}
      </div>
    </div>
  );
}

export default Cadastro;
