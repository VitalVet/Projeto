// MainSection.jsx
import React from 'react';
import styles from 'styles/more-about-section.module.css';

const MainSection = () => {
  return (
    <section className={styles.home}>
      <main className={styles.container}>
        <div id="MoreAboutTitle" className={`${styles.MoreAboutTitle} ${styles.greenBackground}`}>
          <div id="range">
            <h1 className={styles.title}>
            Bem vindo a Vital<span className={styles.greenText}>Vet</span>
            </h1>
          </div>
          <p className={styles.moreAboutText} id="mainSectionParagraph">
            Seja muito bem-vindo à página da VitalVet, a sua clínica veterinária de confiança dedicada ao bem-estar e saúde dos seus animais de estimação. Aqui na VitalVet, nós entendemos que seus companheiros peludos são mais do que apenas animais de estimação - eles são membros da sua família. É por isso que nos empenhamos em oferecer o mais alto padrão de cuidados veterinários, combinando experiência, compaixão e tecnologia de ponta.
          </p>
        </div>
        <h1 className={styles.titleH1}>O que nos torna especiais?</h1>
        <br />

        <div className={styles.MoreAbout}>
          <div className={styles.imgAbout} id={styles.img1}></div>
          <div className={styles.aboutText}>
            <h2 className={styles.titleH2}>Equipe Dedicada</h2>
            <p>
              Nossa equipe de veterinários e profissionais de saúde animal é apaixonada pelo que faz e está sempre atualizada com as últimas tendências e avanços na medicina veterinária. Cada membro da nossa equipe é escolhido não apenas pela sua competência, mas também pela sua paixão por animais.
            </p>
          </div>
        </div>
        <div className={styles.MoreAbout}>
          <div className={styles.imgAbout} id={styles.img2}></div>
          <div className={styles.aboutText}>
            <h2 className={styles.titleH2}>Atendimento Personalizado</h2>
            <p>
              Sabemos que cada animal é único, e é por isso que oferecemos um atendimento personalizado. Trabalhamos em estreita colaboração com você para entender as necessidades específicas do seu animal de estimação e criar um plano de tratamento sob medida.
            </p>
          </div>
        </div>

        <div className={styles.MoreAbout}>
          <div className={styles.imgAbout} id={styles.img3}></div>
          <div className={styles.aboutText}>
            <h2 className={styles.titleH2}>Instalações Modernas</h2>
            <p>
              A VitalVet está equipada com instalações modernas e equipamentos de última geração para garantir que seu animal de estimação receba o melhor atendimento possível.
            </p>
          </div>
        </div>

        <div className={styles.MoreAbout}>
          <div className={styles.imgAbout} id={styles.img4}></div>
          <div className={styles.aboutText}>
            <h2 className={styles.titleH2}>Amor Incondicional</h2>
            <p>
              Nós amamos o que fazemos, e isso é evidente em cada interação com você e seu animal de estimação. Nosso objetivo é criar um ambiente caloroso e acolhedor, onde você e seu animal de estimação se sintam em casa.
            </p>
          </div>
        </div>
      </main>
    </section>
  );
};

export default MainSection;
