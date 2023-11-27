// Footer.jsx

import React from 'react';
import styles from 'styles/footer.module.css';
import Link from 'next/link';

const Footer = () => {
  return (
    <footer className={`${styles.container} ${styles.footer}`}>
      <div>
        <h6 className={styles.dues}>&copy; 2023 Clínica Veterinária VitalVet</h6>
        <nav className={styles.menu}>
          <ul>
            <li className={styles.ComecoBtnFooter}>
            <Link href="/"> <button>Começo</button></Link>
            </li>
            <li className={styles.SobreBtnFooter}>
             <Link href="/sobre"> <button>Sobre</button> </Link>
            </li>
            <li className={styles.EmergenciaBtnFooter}>
            <Link href="/emergencia"><button>Emergência</button></Link>
            </li>
          </ul>
        </nav>
      </div>
    </footer>
  );
};

export default Footer;
