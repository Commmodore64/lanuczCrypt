import { PrismaClient } from "@prisma/client";
import type { NextApiRequest, NextApiResponse } from "next";
import forge, { pki } from "node-forge";

const prisma = new PrismaClient();

interface RequestBody {
  ciphertext: string;
  email: string;
  privateKey: string;
}

export default async function handler(
  req: NextApiRequest,
  res: NextApiResponse,
) {
  if (req.method !== "POST") {
    return res.status(405).json({ error: "Método no permitido" });
  }

  try {
    const { ciphertext, email, privateKey }: RequestBody =
      req.body as RequestBody;
    if (!ciphertext || !email || !privateKey) {
      return res.status(400).json({
        error:
          "Se requiere el texto cifrado, el correo electrónico y la clave privada",
      });
    }

    // Convertir la clave privada de formato PEM a un objeto pki.PrivateKey
    const privateKeyObj: pki.PrivateKey =
      forge.pki.privateKeyFromPem(privateKey);

    // Decifrar el mensaje con la clave privada
    const decryptedMessage: string = privateKeyObj.decrypt(
      forge.util.decode64(ciphertext),
    );

    // Actualizar el campo de mensaje descifrado en la base de datos
    const updatedUser = await prisma.user.update({
      where: { email: email },
      data: { decryptedMessage: decryptedMessage },
    });

    res.status(200).json({
      message: "Mensaje descifrado guardado correctamente en el usuario",
      updatedUser,
    });
  } catch (error) {
    console.error(
      "Error descifrando y guardando el mensaje descifrado:",
      error,
    );
    res
      .status(500)
      .json({ error: "Error descifrando y guardando el mensaje descifrado" });
  }
}
