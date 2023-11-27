// pages/emergencia.js
import React, { useState } from 'react';
import styles from '../styles/emergencia.module.css'; // Certifique-se de que o caminho está correto
import Link from 'next/link';

function Emergencia() {
  const [emergencyRegistered, setEmergencyRegistered] = useState(false);
  const [formData, setFormData] = useState({
    nomeDono: '',
    telefoneContato: '',
    especieAnimal: '',
    descricaoEmergencia: '',
  });

  const handleInputChange = (event) => {
    const { name, value } = event.target;
    setFormData({
      ...formData,
      [name]: value,
    });
  };

  const handleRegistration = async (event) => {
    event.preventDefault();
    try {
      const response = await fetch('/api/cadastroEmergencia', {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify(formData),
      });

      if (response.ok) {
        setEmergencyRegistered(true);
      } else {
        throw new Error('Erro ao registrar emergência');
      }
    } catch (error) {
      console.error('Erro:', error);
    }
  };

  return (
    <div className={styles.emergenciaBody}>
      <header className={styles.emergenciaHeader}>
        <h1>Clínica Veterinária VitalVet</h1>
        <p>Registro de Emergência</p>
      </header>

      <div className={styles.emergenciaContainer}>
        <h2 className={styles.emergenciaTitle}>Registro de Emergência</h2>
        {!emergencyRegistered ? (
          <form onSubmit={handleRegistration} className={styles.emergenciaForm}>
            <label htmlFor="nomeDono" className={styles.emergenciaLabel}>Nome do Dono:</label>
            <input type="text" id="nomeDono" name="nomeDono" className={styles.emergenciaInput} required onChange={handleInputChange} /><br /><br />

            <label htmlFor="telefoneContato" className={styles.emergenciaLabel}>Telefone de Contato:</label>
            <input type="text" id="telefoneContato" name="telefoneContato" className={styles.emergenciaInput} required onChange={handleInputChange} /><br /><br />

            <label htmlFor="especieAnimal" className={styles.emergenciaLabel}>Espécie do Animal:</label>
            <input type="text" id="especieAnimal" name="especieAnimal" className={styles.emergenciaInput} required onChange={handleInputChange} /><br /><br />

            <label htmlFor="descricaoEmergencia" className={styles.emergenciaLabel}>Descrição da Emergência:</label><br />
            <textarea id="descricaoEmergencia" name="descricaoEmergencia" rows="4" className={styles.emergenciaTextarea} required onChange={handleInputChange}></textarea><br /><br />

            <button type="submit" className={styles.emergenciaSubmit}>Registrar Emergência</button>
            <Link href="/" passHref className={styles.emergenciaLink}>
               Voltar
            </Link>
          </form>
        ) : (
          <div className={styles.emergencyRegistered}>
            <br />
            <p className={styles.emergencyMessage}>Sua emergência foi registrada!</p>
            <br />
            <Link href="/" className={styles.emergenciaLink}>
              Voltar
            </Link>
          </div>
        )}
      </div>

      <footer className={styles.emergenciaFooter}>
        <p>&copy; 2023 Clínica Veterinária VitalVet</p>
      </footer>
    </div>
  );
}

export default Emergencia;
