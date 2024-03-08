import CryptoJS from "crypto-js";
import type { NextApiRequest, NextApiResponse } from "next";

interface RequestBody {
  message: string;
  key: string;
}

export default function handler(req: NextApiRequest, res: NextApiResponse) {
  if (req.method !== "POST") {
    return res.status(405).json({ error: "Método no permitido" });
  }

  try {
    const { message, key }: RequestBody = req.body as RequestBody;

    if (!message || !key) {
      return res
        .status(400)
        .json({ error: "Se requiere un mensaje y una clave" });
    }

    const ciphertext: string = CryptoJS.AES.encrypt(message, key).toString();

    res.status(200).json({ ciphertext });
    console.log(ciphertext);
  } catch (error) {
    console.error("Error encriptando el mensaje:", error);
    res.status(500).json({ error: "Error encriptando el mensaje" });
  }
}
