import CryptoJS from "crypto-js";
import type { NextApiRequest, NextApiResponse } from "next";

interface RequestBody {
  ciphertext: string;
  keyD: string;
}

export default function handler(req: NextApiRequest, res: NextApiResponse) {
  if (req.method !== "POST") {
    return res.status(405).json({ error: "Método no permitido" });
  }

  try {
    const { ciphertext, keyD }: RequestBody = req.body as RequestBody;
    console.log(req.body);

    if (!ciphertext || !keyD) {
      return res
        .status(400)
        .json({ error: "Se requiere un texto cifrado y una clave" });
    }
    const bytes = CryptoJS.AES.decrypt(ciphertext, keyD);
    const decryptedMessage: string = bytes.toString(CryptoJS.enc.Utf8);

    res.status(200).json({ decryptedMessage });
    console.log(decryptedMessage);
  } catch (error) {
    console.error("Error desencriptando el mensaje:", error);
    res.status(500).json({ error: "Error desencriptando el mensaje" });
  }
}
