// Types
import type { GetServerSideProps, NextPage } from "next";
import type { Session } from "next-auth";

// Utils
import Head from "next/head";
import { useState } from "react";
import { toast } from "sonner";
import { z } from "zod";

// Components
import SigninComponent from "~/components/auth/signin";
import { getServerAuthSession } from "~/server/auth";
import { api } from "~/utils/api";

const Signin: NextPage = () => {
  const mutation = api.useCustomAuth.form.useMutation();
  const [personalData, setPersonalData] = useState({
    name: "",
    lastName: "",
    phone: "",
    email: "",
    password: "",
    messages: "",
  });

  //Validate Schema
  const validationSchema = z.object({
    name: z.string().min(3).max(255),
    lastName: z.string().min(3).max(255),
    phone: z.string().min(3).max(255),
    email: z.string().email(),
    messages: z.string(),
    password: z
      .string()
      .regex(new RegExp(".*[A-Z].*"), "Debe contener una mayúscula")
      .regex(new RegExp(".*[a-z].*"), "Debe contener una minúscula")
      .regex(new RegExp(".*\\d.*"), "Debe contener un numero")
      .regex(
        new RegExp(".*[`~<>?,./!@#$%^&*()\\-_+=\"'|{}\\[\\];:\\\\].*"),
        "Debe contener un carácter especial",
      )
      .min(10, "Must be at least 10 characters in length"),
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
        if (error instanceof z.ZodError) {
          // Si es un error de zod, muestra solo el primer mensaje de error
          const firstErrorMessage =
            error.errors[0]?.message ?? "Validation error";

          // Verificar si el mensaje de error es específicamente para la longitud mínima de caracteres
          if (
            firstErrorMessage === "String must contain at least 3 character(s)"
          ) {
            toast.error("El valor debe contener al menos 3 caracteres.");
          } else {
            toast.error(firstErrorMessage);
          }
        } else {
          // En caso contrario, muestra el mensaje de error genérico
          const errorMessage = (error as Error).message;
          toast.error(errorMessage);
        }
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
export const getServerSideProps: GetServerSideProps = async (ctx) => {
  const session = await getServerAuthSession(ctx);
  if (session && typeof session === "object" && !Array.isArray(session)) {
    return {
      redirect: {
        destination: "/dashboard",
        permanent: false,
      },
    };
  }
  return {
    props: { session: session ? ({ ...session } as Session) : null },
  };
};
export default Signin;
