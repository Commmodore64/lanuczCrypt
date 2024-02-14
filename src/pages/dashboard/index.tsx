// Types
import { type NextPage } from "next";

// Utils
import Head from "next/head";

// Components
import Dashboard from "../../components/dashboard";

const Home: NextPage = () => {
  return (
    <>
      <Head>
        <title>Stock - Inicio</title>
        {/* TODO: Description */}
        <meta name="description" content="" />
        <link rel="icon" href="/favicon.ico" />
      </Head>
      <Dashboard />
    </>
  );
};

export default Home;