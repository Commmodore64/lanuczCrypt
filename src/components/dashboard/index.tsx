import { type FC } from "react";
import {
  AlertDialog,
  AlertDialogAction,
  AlertDialogCancel,
  AlertDialogContent,
  AlertDialogDescription,
  AlertDialogFooter,
  AlertDialogHeader,
  AlertDialogTitle,
  AlertDialogTrigger,
} from "../ui/alert-dialog";
import { Button } from "../ui/button";
import { EvervaultCard, Icon } from "../ui/evervault-card";

const Dashboard: FC = ({}) => {
  return (
    <div className="flex h-screen items-center justify-center">
      <div className="absolute h-full w-full bg-[radial-gradient(#e5e7eb_1px,transparent_1px)] [background-size:16px_16px] [mask-image:radial-gradient(ellipse_50%_50%_at_50%_50%,#000_70%,transparent_100%)]"></div>
      <div className="relative mx-auto flex h-[30rem] max-w-sm flex-col items-start border border-black/[0.2] p-4 shadow-2xl dark:border-white/[0.2] ">
        <Icon className="absolute -left-3 -top-3 h-6 w-6 text-black dark:text-white" />
        <Icon className="absolute -bottom-3 -left-3 h-6 w-6 text-black dark:text-white" />
        <Icon className="absolute -right-3 -top-3 h-6 w-6 text-black dark:text-white" />
        <Icon className="absolute -bottom-3 -right-3 h-6 w-6 text-black dark:text-white" />

        <EvervaultCard className="bg-white" text="LanuczCrypt" />

        <h2 className="mt-4 text-xl font-bold text-black dark:text-white">
          Encripta tus mensajes de una manera sencilla y segura !
        </h2>
        {/* <p className="mt-4 rounded-full border border-black/[0.2] px-2 py-0.5 text-sm font-light text-black dark:border-white/[0.2] dark:text-white">
          Watch me hover
        </p> */}
        <div className="flex flex-row">
          <div className="mt-4">
            <AlertDialog>
              <AlertDialogTrigger asChild>
                <Button>Encriptar</Button>
              </AlertDialogTrigger>
              <AlertDialogContent>
                <AlertDialogHeader>
                  <AlertDialogTitle>Are you absolutely sure?</AlertDialogTitle>
                  <AlertDialogDescription>
                    This action cannot be undone. This will permanently delete
                    your account and remove your data from our servers.
                  </AlertDialogDescription>
                </AlertDialogHeader>
                <AlertDialogFooter>
                  <AlertDialogCancel>Cancelar</AlertDialogCancel>
                  <AlertDialogAction>Encriptar</AlertDialogAction>
                </AlertDialogFooter>
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
                  <AlertDialogTitle>Are you absolutely sure?</AlertDialogTitle>
                  <AlertDialogDescription>
                    This action cannot be undone. This will permanently delete
                    your account and remove your data from our servers.
                  </AlertDialogDescription>
                </AlertDialogHeader>
                <AlertDialogFooter>
                  <AlertDialogCancel>Cancelar</AlertDialogCancel>
                  <AlertDialogAction>Desencriptar</AlertDialogAction>
                </AlertDialogFooter>
              </AlertDialogContent>
            </AlertDialog>
          </div>
        </div>
      </div>
    </div>
  );
};

export default Dashboard;
