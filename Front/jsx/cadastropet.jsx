// CadastroPet.js
import React, { useState } from 'react';
import styles from '../styles/cadastroPet.module.css';
import Link from 'next/link';

function CadastroPet() {
  const [formValues, setFormValues] = useState({
    nome_pet: '',
    dataNascimento: '',
    raca_pet: '',
    especie_pet: '',
    sexo_pet: '',
  });
  const [cadastroConcluido, setCadastroConcluido] = useState(false);

  const handleChange = (e) => {
    const { name, value } = e.target;
    setFormValues({
      ...formValues,
      [name]: value,
    });
  };

  const handleRegistration = async (e) => {
    e.preventDefault();

    const { nome_pet, dataNascimento, raca_pet, especie_pet, sexo_pet } = formValues;
    if (nome_pet && dataNascimento && raca_pet && especie_pet && sexo_pet) {
      try {
        const response = await fetch('/api/cadastroPet', {
          method: 'POST',
          headers: {
            'Content-Type': 'application/json',
          },
          body: JSON.stringify(formValues),
        });

        if (response.ok) {
          setCadastroConcluido(true);
        } else {
          alert('Falha ao cadastrar o pet.');
        }
      } catch (error) {
        console.error('Erro ao realizar o cadastro:', error);
        alert('Erro ao cadastrar o pet.');
      }
    } else {
      alert('Por favor, preencha todos os campos!');
    }
  };

  return (
    <div className={styles.cadastroPetBody}>
      <div className={styles.cadastroPetContainer}>
        <h1 className={styles.cadastroPetTitle}>Vital<span className={styles.cadastroPetStrong}>Vet</span></h1>
        <h2 className={styles.cadastroPetTitle}>Registre seu Pet</h2>
        {!cadastroConcluido ? (
          <form onSubmit={handleRegistration} className={styles.cadastroPetForm}>
            <label htmlFor="nome_pet" className={styles.cadastroPetLabel}>Nome do Pet:</label>
            <input type="text" id="nome_pet" name="nome_pet" required className={styles.cadastroPetInput} onChange={handleChange} />

            <label htmlFor="dataNascimento" className={styles.cadastroPetLabel}>Data nascimento:</label>
            <input type="date" id="dataNascimento" name="dataNascimento" required className={styles.cadastroPetInput} onChange={handleChange} />

            <label htmlFor="raca_pet" className={styles.cadastroPetLabel}>Raça do Pet:</label>
            <input type="text" id="raca_pet" name="raca_pet" required className={styles.cadastroPetInput} onChange={handleChange} />

            <label htmlFor="especie_pet" className={styles.cadastroPetLabel}>Espécie do Pet:</label>
            <input type="text" id="especie_pet" name="especie_pet" required className={styles.cadastroPetInput} onChange={handleChange} />

            <label htmlFor="sexo_pet" className={styles.cadastroPetLabel}>Sexo do pet:</label>
            <input type="text" id="sexo_pet" name="sexo_pet" required className={styles.cadastroPetInput} onChange={handleChange} />

            <button type="submit" className={styles.cadastroPetButton}>Registrar</button>
            <br />
            <Link href="/" className={styles.cadastroPetLink}>Voltar</Link>
          </form>
        ) : (
          <div id="baixo" className={styles.baixo}>
            <p className={styles.pet}>Seu pet foi registrado!</p>
            <br />
            <Link href="/" className={styles.cadastroPetLink}>Voltar</Link>
          </div>
        )}
      </div>
    </div>
  );
}

export default CadastroPet;
