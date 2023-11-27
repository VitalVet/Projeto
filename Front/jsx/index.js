import Head from 'next/head';
import Footer from '@/pages/footer';
import Header from '@/pages/Header';
import MainSection from '@/pages/MainSection';
import Link from 'next/link';

const MainPage = () => {
  return (
    <>
      <Head>
        <meta name="description" content="VitalVet, a melhor veterinaria" />
        <meta name="viewport" content="width=device-width, initial-scale=1" />
        <title>VitalVet</title>
        <link
          rel="stylesheet"
          href="https://use.fontawesome.com/releases/v5.6.3/css/all.css"
          integrity="sha384-UHRtZLI+pbxtHCWp1t77Bi1L4ZtiqrqD80Kn4Z8NTSRyMA2Fd33n5dQ8lWUE00s/"
          crossOrigin="anonymous"
        />
      </Head>
      <div>
        <Header />
        <MainSection />
        <Footer />
      </div>
    </>
  );
};

const Main = () => {
  return (
    <>
      <Head>
        <meta name="description" content="VitalVet, a melhor veterinaria" />
        <meta name="viewport" content="width=device-width, initial-scale=1" />
        <title>VitalVet</title>
        <link
          rel="stylesheet"
          href="https://use.fontawesome.com/releases/v5.6.3/css/all.css"
          integrity="sha384-UHRtZLI+pbxtHCWp1t77Bi1L4ZtiqrqD80Kn4Z8NTSRyMA2Fd33n5dQ8lWUE00s/"
          crossOrigin="anonymous"
        />
      </Head>
      <div>
        <MainPage />
      </div>
    </>
  );
};

export default Main;
