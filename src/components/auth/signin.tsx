"use client";
// import Link from "next/link";
import type { FC } from "react";
import { Input } from "~/components/ui/input";
import { Label } from "~/components/ui/label";
import { Button } from "../ui/button";

// interface formProps {}
interface SigninComponentProps {
  handleSignIn: () => void;
  data: {
    name: string;
    lastName: string;
    phone: string;
    email: string;
    password: string;
  };
  setData: (data: any) => void;
}
interface SigninComponentProps {
  handleSignIn: () => void;
}
const Signin: FC<SigninComponentProps> = ({ data, setData, handleSignIn }) => {
  return (
    <>
      <div className="relative h-full w-full bg-[#18181B]">
        <div className="absolute bottom-0 left-0 right-0 top-0 bg-[linear-gradient(to_right,#4f4f4f2e_1px,transparent_1px),linear-gradient(to_bottom,#4f4f4f2e_1px,transparent_1px)] bg-[size:14px_24px] [mask-image:radial-gradient(ellipse_60%_50%_at_50%_0%,#000_70%,transparent_100%)]"></div>

        <div className="flex h-screen items-center justify-center bg-[#18181B]">
          <div className="relative">
            {/* Contenido de Swipe y Shelter */}
            <div className="swipe mt-8 flex items-center justify-center p-4 text-5xl italic text-white">
              swipe
              <h2 className="main-text p-1 font-semibold">Shelter</h2>
            </div>

            {/* Fondo decorativo */}
            <div className="absolute left-1/2 top-1/2 h-32 w-32 -translate-x-1/2 -translate-y-1/2 transform rounded-full bg-white/15 opacity-45 blur-3xl lg:h-[16rem] lg:w-[16rem] lg:blur-[64px]"></div>

            {/* Formulario */}
            <form className="mt-10 w-[350px]">
              <div className="grid w-full items-center gap-4">
                <div className="flex flex-col space-y-1.5">
                  <Label className="p-2 text-white" htmlFor="email">
                    Name
                  </Label>
                  <Input
                    type="name"
                    value={data.name}
                    onChange={(e: React.ChangeEvent<HTMLInputElement>) =>
                      setData({ ...data, name: e.target.value })
                    }
                    className="border border-[#363639] bg-[#242427] text-white"
                    id="name"
                    placeholder="Enter your name"
                  />
                </div>
                <div className="flex flex-col space-y-1.5">
                  <Label className="p-2 text-white" htmlFor="password">
                    Last Name
                  </Label>
                  <Input
                    type="lastName"
                    value={data.lastName}
                    onChange={(e) => {
                      setData({ ...data, lastName: e.target.value });
                    }}
                    className="border border-[#363639] bg-[#242427] text-white"
                    id="lastName"
                    placeholder="Enter your last name"
                  />
                </div>
                <div className="flex flex-col space-y-1.5">
                  <Label className="p-2 text-white" htmlFor="password">
                    Phone Number
                  </Label>
                  <Input
                    type="phone"
                    value={data.phone}
                    onChange={(e) => {
                      setData({ ...data, phone: e.target.value });
                    }}
                    className="border border-[#363639] bg-[#242427] text-white"
                    id="phone"
                    placeholder="Enter your phone number"
                  />
                </div>
                <div className="flex flex-col space-y-1.5">
                  <Label className="p-2 text-white" htmlFor="password">
                    Email
                  </Label>
                  <Input
                    type="email"
                    value={data.email}
                    onChange={(e) => {
                      setData({ ...data, email: e.target.value });
                    }}
                    className="border border-[#363639] bg-[#242427] text-white"
                    id="email"
                    placeholder="Enter your email"
                  />
                </div>
                <div className="flex flex-col space-y-1.5">
                  <Label className="p-2 text-white" htmlFor="password">
                    Password
                  </Label>
                  <Input
                    type="password"
                    value={data.password}
                    onChange={(e) => {
                      setData({ ...data, password: e.target.value });
                    }}
                    className="border border-[#363639] bg-[#242427] text-white"
                    id="password"
                    placeholder="Enter your password"
                  />
                </div>
                <Button
                  type="button"
                  variant="outline"
                  className="my-5 w-full py-2 font-bold text-black"
                  onClick={handleSignIn}
                >
                  Sign in
                </Button>
              </div>
            </form>

            {/* Enlace al final de la pantalla */}
            <div className="mt-5 flex flex-row items-center justify-center">
              <p className="text-white">Already have an account?</p>
              <a
                href="/auth/login"
                className="flex justify-center pl-2 font-semibold text-white"
              >
                Log In
              </a>
            </div>
          </div>
        </div>
      </div>
    </>
  );
};

export default Signin;
