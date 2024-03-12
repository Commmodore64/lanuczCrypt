import type { NextApiRequest, NextApiResponse } from "next";
import forge, { pki } from "node-forge";

interface RequestBody {
  ciphertext: string;
  email: string;
  privateKey: string;
  publicKey: string; // Agregar la clave pública
}

export default async function handler(
  req: NextApiRequest,
  res: NextApiResponse,
) {
  if (req.method !== "POST") {
    return res.status(405).json({ error: "Método no permitido" });
  }

  try {
    const { ciphertext, privateKey, publicKey }: RequestBody =
      req.body as RequestBody;
    console.log(ciphertext, privateKey, publicKey);
    if (!ciphertext || !privateKey || !publicKey) {
      return res.status(400).json({
        error:
          "Se requiere el texto cifrado, el correo electrónico, la clave privada y la clave pública",
      });
    }

    // Convertir la clave privada y pública de formato PEM a objetos pki.PrivateKey y pki.PublicKey
    const privateKeyObj: pki.PrivateKey =
      forge.pki.privateKeyFromPem(privateKey);

    // Decifrar el mensaje con la clave privada y la clave pública
    const decryptedMessage: string = privateKeyObj.decrypt(
      forge.util.decode64(ciphertext),
      "RSA-OAEP", // Utilizar el mismo algoritmo utilizado para cifrar
      {
        md: forge.md.sha256.create(),
      },
    );

    console.log(decryptedMessage);

    res.status(200).json({
      message: "Mensaje descifrado guardado correctamente en el usuario",
      decryptedMessage,
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
