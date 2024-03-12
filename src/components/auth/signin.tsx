"use client";
// import Link from "next/link";
import Link from "next/link";
import type { FC } from "react";
import { Checkbox } from "~/components/ui/checkbox";
import { Input } from "~/components/ui/input";
import { Label } from "~/components/ui/label";
import {
  AlertDialog,
  AlertDialogCancel,
  AlertDialogContent,
  AlertDialogDescription,
  AlertDialogHeader,
  AlertDialogTitle,
  AlertDialogTrigger,
} from "../ui/alert-dialog";
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
    messages: string;
  };
  setData: (data: unknown) => void;
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
            <div className="swipe flex items-center justify-center p-4 text-5xl italic text-white">
              Lanucz
              <h2 className="main-text p-1 font-semibold">Shelter</h2>
            </div>

            {/* Fondo decorativo */}
            <div className="absolute left-1/2 top-1/2 h-32 w-32 -translate-x-1/2 -translate-y-1/2 transform rounded-full bg-white/15 opacity-45 blur-3xl lg:h-[16rem] lg:w-[16rem] lg:blur-[64px]"></div>

            {/* Formulario */}
            <form className="mt-7 w-[350px]">
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
              <div className="flex items-center space-x-2 text-white">
                <Checkbox className="bg-white" id="terms" />
                <label
                  htmlFor="terms"
                  className=" text-sm font-medium leading-none peer-disabled:cursor-not-allowed peer-disabled:opacity-70"
                >
                  Accept{" "}
                  <AlertDialog>
                    <AlertDialogTrigger>
                      terms and conditions
                    </AlertDialogTrigger>
                    <AlertDialogContent style={{ overflow: "auto" }}>
                      <AlertDialogHeader>
                        <AlertDialogTitle>Aviso de Privacidad</AlertDialogTitle>
                        <AlertDialogDescription>
                          Aviso de Privacidad de Bill-Lucs, SOFIPO
                        </AlertDialogDescription>
                      </AlertDialogHeader>
                      <ul className="list-outside list-decimal pl-4">
                        <li>
                          <b>Identidad y domicilio del responsable</b>
                          <br />
                          Bill-Lucs, SOFIPO, con domicilio en Av. Montes
                          Americanos #9501, Col. Sector 35, C.P. 31216,
                          Chihuahua, Chih., México., es el responsable del uso y
                          protección de sus datos personales.
                        </li>
                        <li>
                          <b>Datos personales que se recaban</b>
                          <br />
                          Para las operaciones que usted realice con nosotros se
                          recabarán los siguientes datos personales:
                          <ul className="list-inside list-disc">
                            <li>
                              Datos de identificación y contacto: Nombre,
                              dirección, teléfono, correo electrónico.
                            </li>
                            <li>
                              Datos financieros: Ingresos, historial crediticio.
                            </li>
                            <li>
                              Datos de identificación oficial: Copia de
                              identificación oficial, CURP, RFC.
                            </li>
                          </ul>
                        </li>
                        <li>
                          <b>Finalidad del tratamiento de datos personales</b>{" "}
                          <br />
                          Sus datos personales serán utilizados para las
                          siguientes finalidades:
                          <ul className="list-inside list-disc">
                            <li>
                              Evaluar su elegibilidad para préstamos bancarios.
                            </li>
                            <li>
                              Crear y administrar su cuenta en nuestra
                              plataforma.
                            </li>
                            <li>
                              Cumplir con las obligaciones legales y
                              regulatorias aplicables.
                            </li>
                          </ul>
                        </li>
                        <li>
                          <b>Transferencias de datos personales</b> <br />
                          Sus datos personales pueden ser compartidos con
                          autoridades financieras y fiscales en México, así como
                          con otras entidades dentro del grupo financiero para
                          fines de cumplimiento regulatorio y ofrecimiento de
                          productos.
                        </li>
                        <li>
                          <b>Derechos ARCO</b>
                          <br />
                          Usted tiene derecho a Acceder, Rectificar y Cancelar
                          sus datos personales, así como a Oponerse al uso de
                          los mismos o solicitar la limitación de su uso
                          (Derechos ARCO).
                        </li>
                        <li>
                          <b>Revocación del consentimiento</b> <br />
                          Puede revocar el consentimiento que, en su caso, nos
                          haya otorgado, sin embargo, es importante que tenga en
                          cuenta que no en todos los casos podremos atender su
                          solicitud o concluir el uso de forma inmediata.
                        </li>
                        <li>
                          <b>Cambios al aviso de privacidad</b> <br />
                          Nos reservamos el derecho de efectuar en cualquier
                          momento modificaciones o actualizaciones al presente
                          aviso de privacidad.
                        </li>
                        <li>
                          <b>Contacto</b> <br />
                          Para cualquier duda o aclaración respecto a sus datos
                          personales, puede contactarnos en
                          tecnologias@utch.edu.mx ó 614 432 20 00.
                        </li>
                        <li>
                          <b>Transparencia de los Datos</b> <br />
                          En Bill-Lucs, SOFIPO, nos comprometemos a mantener una
                          total transparencia en el manejo de sus datos
                          personales. Esto significa que nos esforzamos por
                          asegurarnos de que usted esté informado sobre qué
                          datos personales recabamos, cómo los utilizamos, con
                          quién los compartimos, y cómo puede ejercer sus
                          derechos sobre estos datos. <br />
                          Nos comprometemos a:
                          <ul className="list-inside list-disc">
                            <li>
                              Informarle claramente sobre los datos que
                              recabamos y las finalidades específicas para las
                              cuales se utilizan.
                            </li>
                            <li>
                              Obtener su consentimiento de manera explícita para
                              el tratamiento de sus datos personales, excepto en
                              los casos que la ley permita otro modo de
                              consentimiento.
                            </li>
                            <li>
                              Permitirle el acceso a sus datos personales que
                              poseemos, así como a corregirlos si son inexactos
                              o incompletos.
                            </li>
                            <li>
                              Ofrecerle la opción de oponerse al tratamiento de
                              sus datos personales para finalidades específicas,
                              en los términos que la ley establezca.
                            </li>
                            <li>
                              Mantener medidas de seguridad adecuadas para
                              proteger sus datos personales contra el acceso no
                              autorizado o ilegal, la pérdida accidental, la
                              destrucción o el daño.
                            </li>
                          </ul>
                          Creemos que la transparencia es la base para construir
                          una relación de confianza con nuestros usuarios y
                          clientes. Por ello, nos esforzamos en comunicar de
                          manera clara y accesible todas las prácticas
                          relacionadas con sus datos personales. Si tiene
                          preguntas sobre cómo manejamos sus datos personales o
                          desea obtener más información, no dude en
                          contactarnos.
                        </li>
                        <li>
                          <b>Uso de Cookies y Tecnologías de Rastreo</b> <br />
                          En Bill-Lucs, SOFIPO, empleamos cookies y otras
                          tecnologías de rastreo para mejorar la experiencia de
                          nuestros usuarios en nuestra plataforma y para
                          recopilar datos que nos ayudan a entender mejor cómo
                          se utilizan nuestros servicios. <br /> Para más
                          información sobre cómo utilizamos cookies y sus
                          opciones respecto a estas, no dude en contactarnos.
                        </li>
                      </ul>
                      <span className={"text-right"}>
                        Fecha de última actualización: 31/01/2024.
                      </span>
                      <AlertDialogCancel>Cerrar</AlertDialogCancel>
                    </AlertDialogContent>
                  </AlertDialog>
                </label>
              </div>
            </form>

            {/* Enlace al final de la pantalla */}
            <div className="mt-5 flex flex-row items-center justify-center">
              <p className="text-white">Already have an account?</p>
              <Link
                href="/auth/login"
                className="flex justify-center pl-2 font-semibold text-white"
              >
                Log In
              </Link>
            </div>
          </div>
        </div>
      </div>
    </>
  );
};

export default Signin;
