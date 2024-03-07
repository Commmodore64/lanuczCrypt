// Types
import type { GetServerSideProps, NextPage } from "next";

// Utils
import Head from "next/head";
import { getServerAuthSession } from "~/server/auth";

// Components
import Dashboard from "../../components/dashboard";

const Home: NextPage = () => {
  return (
    <>
      <Head>
        <title>LanuczCrypt - Inicio</title>
        {/* TODO: Description */}
        <meta name="description" content="" />
        <link rel="icon" href="/favicon.ico" />
      </Head>
      <Dashboard />
    </>
  );
};
export const getServerSideProps: GetServerSideProps = async (ctx) => {
  const session = await getServerAuthSession(ctx);
  if (!session) {
    return {
      redirect: {
        destination: "/auth/login",
        permanent: false,
      },
    };
  }
  return {
    props: {
      session: {
        user: {
          name: session.user.name ?? "",
          email: session.user.email ?? "",
          image: session.user.image ?? "",
        },
      },
    },
  };
};

export default Home;
