import type { NextApiRequest, NextApiResponse } from "next";
import forge, { pki } from "node-forge";

interface RequestBody {
  message: string;
  email: string;
}

export default async function handler(
  req: NextApiRequest,
  res: NextApiResponse,
) {
  if (req.method !== "POST") {
    return res.status(405).json({ error: "Método no permitido" });
  }

  try {
    const { message, email }: RequestBody = req.body as RequestBody;
    if (!message || !email) {
      return res.status(400).json({
        error: "Se requiere un mensaje y un correo electrónico",
      });
    }

    // Generar un par de claves RSA
    const keypair: pki.KeyPair = forge.pki.rsa.generateKeyPair({ bits: 2048 });

    // Convertir las claves a strings PEM
    const privateKeyPem: string = forge.pki.privateKeyToPem(keypair.privateKey);
    const publicKeyPem: string = forge.pki.publicKeyToPem(keypair.publicKey);

    // Cifrar el mensaje con la clave pública
    const encryptedMessage: string = forge.util.encode64(
      keypair.publicKey.encrypt(message, "RSA-OAEP", {
        md: forge.md.sha256.create(),
      }) as string,
    );
    console.log(encryptedMessage);
    console.log(privateKeyPem);
    console.log(publicKeyPem);

    res.status(200).json({
      message: "Mensaje cifrado guardado correctamente en el usuario",
      privateKeyPem,
      publicKeyPem,
      encryptedMessage,
    });
  } catch (error) {
    console.error("Error encriptando y guardando el mensaje cifrado:", error);
    res
      .status(500)
      .json({ error: "Error encriptando y guardando el mensaje cifrado" });
  }
}
