"use client";
import { useSession } from "next-auth/react";
import { useEffect, useState, type FC } from "react";
import {
  AlertDialog,
  AlertDialogAction,
  AlertDialogCancel,
  AlertDialogContent,
  AlertDialogDescription,
  AlertDialogHeader,
  AlertDialogTitle,
  AlertDialogTrigger,
} from "../ui/alert-dialog";
import { Button } from "../ui/button";
import { EvervaultCard, Icon } from "../ui/evervault-card";
import { Input } from "../ui/input";

const Dashboard: FC = ({}) => {
  const [message, setMessage] = useState("");
  const [key, setKey] = useState("");
  const [keyD, setKeyD] = useState("");
  const [ciphertext, setCiphertext] = useState("");
  const [isClient, setIsClient] = useState(false);
  const [decryptedMessage, setDecryptedMessage] = useState("");
  const [hash, setHash] = useState("");

  interface ResponseData {
    ciphered?: string;
  }
  useEffect(() => {
    setIsClient(true);
  }, []);
  const handleEncrypt = async () => {
    try {
      const response = await fetch("/api/encrypt", {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify({ message, key }),
      });
      const data: ResponseData = await response.json();
      setCiphertext(data.ciphered ?? "");
    } catch (error) {
      console.error("Error encriptando el mensaje:", error);
    }
  };
  const handleDecrypt = async () => {
    try {
      const response = await fetch("/api/decrypt", {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify({ ciphertext: hash, keyD }),
      });
      const data: { decryptedMessage: string } = await response.json();
      setDecryptedMessage(data.decryptedMessage);
    } catch (error) {
      console.error("Error desencriptando el mensaje:", error);
    }
  };
  const user = useSession();
  return (
    <div className="flex h-screen items-center justify-center">
      <div className="absolute h-full w-full bg-[radial-gradient(#e5e7eb_1px,transparent_1px)] [background-size:16px_16px] [mask-image:radial-gradient(ellipse_50%_50%_at_50%_50%,#000_70%,transparent_100%)]"></div>
      <div className="relative mx-auto flex h-[30rem] max-w-sm flex-col items-start border border-black/[0.2] p-4 shadow-2xl dark:border-white/[0.2] ">
        <h1 className="p-2 text-2xl font-bold">
          Bienvenido de vuelta {user.data?.user.name} !
        </h1>
        <Icon className="absolute -left-3 -top-3 h-6 w-6 text-black dark:text-white" />
        <Icon className="absolute -bottom-3 -left-3 h-6 w-6 text-black dark:text-white" />
        <Icon className="absolute -right-3 -top-3 h-6 w-6 text-black dark:text-white" />
        <Icon className="absolute -bottom-3 -right-3 h-6 w-6 text-black dark:text-white" />

        <EvervaultCard className="bg-white" text="LanuczCrypt" />

        <h2 className="mt-4 text-xl font-bold text-gray-700 dark:text-white">
          Encripta tus mensajes de una manera sencilla y segura !
        </h2>
        {/* <p className="mt-4 rounded-full border border-black/[0.2] px-2 py-0.5 text-sm font-light text-black dark:border-white/[0.2] dark:text-white">
          Watch me hover
        </p> */}
        {isClient && (
          <div className="flex flex-row">
            <div className="mt-4">
              <AlertDialog>
                <AlertDialogTrigger>
                  <Button>Encriptar</Button>
                </AlertDialogTrigger>
                <AlertDialogContent>
                  <AlertDialogHeader>
                    <AlertDialogTitle>Encriptar Mensaje</AlertDialogTitle>
                    <AlertDialogDescription>
                      Ingresa un mensaje y una clave para encriptarlo.
                    </AlertDialogDescription>
                  </AlertDialogHeader>
                  <Input
                    type="text"
                    placeholder="Mensaje"
                    value={message}
                    onChange={(e) => setMessage(e.target.value)}
                  />
                  <Input
                    type="password"
                    placeholder="Clave"
                    value={key}
                    onChange={(e) => setKey(e.target.value)}
                  />
                  <AlertDialogCancel>Cancelar</AlertDialogCancel>
                  <AlertDialogAction onClick={handleEncrypt}>
                    Encriptar
                  </AlertDialogAction>
                </AlertDialogContent>
              </AlertDialog>
            </div>
            <div className="ml-[150px] mt-4">
              <AlertDialog>
                <AlertDialogTrigger asChild>
                  <Button>Desencriptar</Button>
                </AlertDialogTrigger>
                <AlertDialogContent>
                  <AlertDialogHeader>
                    <AlertDialogTitle>Desencriptar Mensaje</AlertDialogTitle>
                    <AlertDialogDescription>
                      Ingresa el hash cifrado y la clave para desencriptar.
                    </AlertDialogDescription>
                  </AlertDialogHeader>
                  <Input
                    type="text"
                    placeholder="Hash cifrado"
                    value={hash}
                    onChange={(e) => setHash(e.target.value)}
                  />
                  <Input
                    type="text"
                    placeholder="Clave"
                    value={keyD}
                    onChange={(e) => setKeyD(e.target.value)}
                  />
                  <AlertDialogCancel>Cancelar</AlertDialogCancel>
                  <AlertDialogAction onClick={handleDecrypt}>
                    Desencriptar
                  </AlertDialogAction>
                </AlertDialogContent>
              </AlertDialog>
            </div>
          </div>
        )}
      </div>
    </div>
  );
};

export default Dashboard;
