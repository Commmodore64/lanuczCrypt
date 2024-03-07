"use client";
import { signIn } from "next-auth/react";
import Link from "next/link";
// import Link from "next/link";
import type { FC } from "react";
import { useState } from "react";
import { Button } from "~/components/ui/button";
import { CardFooter } from "~/components/ui/card";

import { Input } from "~/components/ui/input";
import { Label } from "~/components/ui/label";

const Login: FC /*<formProps>*/ = ({}) => {
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");

  const handleSignIn = (e: React.MouseEvent<HTMLButtonElement>) => {
    e.preventDefault();
    signIn("credentials", {
      email,
      password,
    }).catch((error) => console.log(error));
  };
  return (
    <>
      <div className="relative h-full w-full bg-[#18181B]">
        <div className="absolute bottom-0 left-0 right-0 top-0 bg-[linear-gradient(to_right,#4f4f4f2e_1px,transparent_1px),linear-gradient(to_bottom,#4f4f4f2e_1px,transparent_1px)] bg-[size:14px_24px] [mask-image:radial-gradient(ellipse_60%_50%_at_50%_0%,#000_70%,transparent_100%)]"></div>

        <div className="flex h-screen items-center justify-center bg-[#18181B]">
          <div className="relative">
            {/* Contenido de Swipe y Shelter */}
            <div className="swipe mt-8 flex items-center justify-center p-4 text-5xl italic text-white">
              Lanucz
              <h2 className="main-text p-1 font-semibold">Crypt</h2>
            </div>

            {/* Formulario */}
            <form className="mt-10 w-[350px]">
              <div className="grid w-full items-center gap-4">
                <div className="flex flex-col space-y-1.5">
                  <Label className="p-2 text-white" htmlFor="email">
                    Email
                  </Label>
                  <Input
                    type="email"
                    value={email}
                    onChange={(e) => setEmail(e.target.value)}
                    className="border border-[#363639] bg-[#242427] text-white"
                    id="email"
                    placeholder="Enter email"
                  />
                </div>
                <div className="flex flex-col space-y-1.5">
                  <Label className="p-2 text-white" htmlFor="password">
                    Password
                  </Label>
                  <Input
                    type="password"
                    value={password}
                    onChange={(e) => setPassword(e.target.value)}
                    className="border border-[#363639] bg-[#242427] text-white"
                    id="password"
                    placeholder="Enter password"
                  />
                </div>
              </div>
              <CardFooter className="pt-20">
                <Button
                  type="submit"
                  variant="outline"
                  className="w-full font-bold"
                  onClick={handleSignIn}
                >
                  Login
                </Button>
              </CardFooter>
            </form>

            {/* Enlace al final de la pantalla */}
            <div className="flex flex-row items-center justify-center">
              <p className="text-white">Not registered yet?</p>
              <Link
                href="/auth/signin"
                className="flex justify-center pl-2 font-semibold text-white"
              >
                Create Account
              </Link>
            </div>
          </div>
        </div>
      </div>
    </>
  );
};

export default Login;
