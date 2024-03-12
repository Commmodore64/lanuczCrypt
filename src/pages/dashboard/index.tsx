// Types
import type { GetServerSideProps, NextPage } from "next";

// Utils
import Head from "next/head";
import { getServerAuthSession } from "~/server/auth";

// Components
import { Tabs, TabsList, TabsTrigger } from "~/components/ui/tabs";
import Dashboard from "../../components/dashboard/index";
import Asimetrico from "../../components/dashboard/indexAs";

import { useState } from "react";

const Home: NextPage = () => {
  const [selectedTab, setSelectedTab] = useState<string>("account");

  const handleTabChange = (value: string) => {
    setSelectedTab(value);
  };

  return (
    <>
      <Head>
        <title>LanuczCrypt - Inicio</title>
        <meta name="description" content="" />
        <link rel="icon" href="/favicon.ico" />
      </Head>
      <div className="mt-3 flex items-center justify-center">
        <Tabs defaultValue="simetrico" className="w-[400px]">
          <TabsList className="grid w-full grid-cols-2">
            <TabsTrigger
              value="simetrico"
              onClick={() => handleTabChange("simetrico")}
            >
              Simétrico
            </TabsTrigger>
            <TabsTrigger
              value="asimetrico"
              onClick={() => handleTabChange("asimetrico")}
            >
              Asimétrico
            </TabsTrigger>
          </TabsList>
        </Tabs>
      </div>
      {selectedTab === "simetrico" && <Dashboard />}
      {selectedTab === "asimetrico" && <Asimetrico />}
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
