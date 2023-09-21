import '@/styles/globals.css'
import Header from '@/components/header';
import Footer from '@/components/footer';

export default function App({ Component, pageProps }) {
  return (
    <div className="pageContainer">
      <Header />
      <main className="mainContent">
        <Component {...pageProps} />
      </main>
      <Footer />
    </div>
  );
}

