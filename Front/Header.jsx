import React, { useState } from 'react';
import { useRouter } from 'next/router';
import styles from 'styles/header.module.css';
import Link from 'next/link';

const Header = () => {
  const router = useRouter();
  const [email, setEmail] = useState('');
  const [senha, setSenha] = useState('');
  const [emailError, setEmailError] = useState('');
  const [senhaError, setSenhaError] = useState('');

  const handleEmailChange = (e) => {
    setEmail(e.target.value);
    setEmailError('');
  };

  const handleSenhaChange = (e) => {
    setSenha(e.target.value);
    setSenhaError('');
  };

  const isEmailValid = (email) => {
    const re = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
    return re.test(String(email).toLowerCase());
  };

  const verificarLogin = async () => {
    try {
      const response = await fetch('/api/verificarLogin', {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify({ email, senha }),
      });

      if (response.ok) {
        console.log('Login bem-sucedido');
        router.push('/cadastropet'); // Redirecionar para a página desejada após o login bem-sucedido
      } else {
        console.error('Credenciais inválidas');
      }
    } catch (error) {
      console.error('Erro ao verificar o login:', error);
    }
  };

  const handleLogin = (e) => {
    e.preventDefault();

    if (!email) {
      setEmailError('');
    } else if (!isEmailValid(email)) {
      setEmailError('');
    } else {
      setEmailError('');
    }

    if (!senha) {
      setSenhaError('');
    } else {
      setSenhaError('');
    }

    if (email && senha && isEmailValid(email)) {
      verificarLogin(); // Chama a função para verificar o login
    }
  };

  return (
    <div className={styles.header}>
      <div className={styles.headerBorder}>
        <h1 id="logo"></h1>
        <nav className={styles.menu}>
          <ul className={styles.ul}>
            <li className={styles.ComecoBtnFooter}>
              <Link href="/cadastro">
                <button>Cadastro</button>
              </Link>
            </li>
            <li className={styles.SobreBtnFooter}>
              <Link href="/sobre">
                <button>Sobre</button>
              </Link>
            </li>
            <li className={styles.EmergenciaBtnFooter}>
              <Link href="/emergencia">
                <button>Emergência</button>
              </Link>
            </li>
          </ul>
        </nav>
      </div>
      <header>
        <form id={styles.register} onSubmit={handleLogin}>
          <p>Faça seu login</p>
          <div className={styles.field}>
            <input
              id={styles.email}
              type="email"
              placeholder="Email"
              value={email}
              onChange={handleEmailChange}
              required
            />
            {emailError && <p className={styles.error}>{emailError}</p>}
          </div>
          <br />
          <div className={styles.field}>
            <input
              id={styles.senha}
              type="password"
              placeholder="Senha"
              value={senha}
              onChange={handleSenhaChange}
              required
            />
            {senhaError && <p className={styles.error}>{senhaError}</p>}
          </div>
          <br />
          <button
            id={styles.registerBtn}
            type="submit"
            disabled={!email || !senha}
          >
            Login
          </button>
          <Link href="/cadastro">
            Não tem login? Se cadastre
          </Link>
        </form>
      </header>
    </div>
  );
};

export default Header;
