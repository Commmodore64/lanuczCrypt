import { PrismaClient } from "@prisma/client";
import CryptoJS from "crypto-js";
import type { NextApiRequest, NextApiResponse } from "next";

const prisma = new PrismaClient();

interface RequestBody {
  message: string;
  key: string;
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
    const { message, key, email }: RequestBody = req.body as RequestBody;
    if (!message || !key || !email) {
      return res.status(400).json({
        error: "Se requiere un mensaje, una clave y un ID de usuario",
      });
    }

    // Encripta el mensaje
    const ciphertext: string = CryptoJS.AES.encrypt(message, key).toString();

    // Actualiza el campo de mensaje cifrado en el usuario
    const updatedUser = await prisma.user.update({
      where: { email: email },
      data: { messages: ciphertext },
    });

    res.status(200).json({
      message: "Mensaje cifrado guardado correctamente en el usuario",
      updatedUser,
    });
  } catch (error) {
    console.error("Error encriptando y guardando el mensaje cifrado:", error);
    res
      .status(500)
      .json({ error: "Error encriptando y guardando el mensaje cifrado" });
  }
}
