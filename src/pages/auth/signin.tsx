// Types
import type { NextPage } from "next";

// Utils
import Head from "next/head";
import { useState } from "react";
import { toast } from "sonner";
import { z } from "zod";

// Components
import SigninComponent from "~/components/auth/signin";
import { api } from "~/utils/api";

const Signin: NextPage = () => {
  const mutation = api.useCustomAuth.form.useMutation();
  const [personalData, setPersonalData] = useState({
    name: "",
    lastName: "",
    phone: "",
    email: "",
    password: "",
  });

  //Validate Schema
  const validationSchema = z.object({
    name: z.string().min(3).max(255),
    lastName: z.string().min(3).max(255),
    phone: z.string().min(3).max(255),
    email: z.string().email(),
    password: z
      .string()
      .regex(new RegExp(".*[A-Z].*"), "Debe contener una mayúscula")
      .regex(new RegExp(".*[a-z].*"), "Debe contener una minúscula")
      .regex(new RegExp(".*\\d.*"), "Debe contener un numero")
      .regex(
        new RegExp(".*[`~<>?,./!@#$%^&*()\\-_+=\"'|{}\\[\\];:\\\\].*"),
        "Debe contener un carácter especial",
      )
      .min(8, "Must be at least 8 characters in length"),
  });

  const handleSignIn = () => {
    console.log(personalData);
    (async () => {
      try {
        const validatedData = validationSchema.parse(personalData);
        console.log("Datos validados:", validatedData);

        // Crear usuario con Prisma
        const response = await mutation.mutateAsync(validatedData);
        if (response.status !== 201) {
          console.log("Respuesta del servidor:", response);
          toast.success("Usuario creado correctamente");
        }
      } catch (error) {
        const errorMessage = (error as Error).message;
        toast.error(errorMessage);
        console.log(error);
      }
    })().catch((error) => {
      console.log(error);
    });
  };
  return (
    <>
      <Head>
        <title>Sign In</title>
      </Head>
      <SigninComponent
        setData={setPersonalData}
        data={personalData}
        handleSignIn={handleSignIn}
      />
    </>
  );
};
// export const getServerSideProps: GetServerSideProps = async (ctx) => {
//   const session = await getServerAuthSession(ctx);
//   if (session && typeof session === "object" && !Array.isArray(session)) {
//     return {
//       redirect: {
//         destination: "/dashboard",
//         permanent: false,
//       },
//     };
//   }
//   return {
//     props: { session: session ? ({ ...session } as Session) : null },
//   };

export default Signin;
