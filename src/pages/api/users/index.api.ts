
import { prisma } from '@/lib/prisma';
import type { NextApiRequest, NextApiResponse } from 'next';
import { setCookie } from 'nookies';

export default async function handler(req: NextApiRequest, res: NextApiResponse) {

  if (req.method !== 'POST') {
    return res.status(405).end(); //405 já indica que o metodo ñ pode usar a rota e o end n envia corpo
  };

  /* Prisma cria o usuário */
  const { name, username } = req.body;

  /* Procura por um usuário já existente */
  const userExists = await prisma.user.findUnique({
    where: {
      username,
    }
  });

  if (userExists) {
    return (
      res.status(400).json({
        message: 'Username already taken.',
      })
    );
  };

  const user = await prisma.user.create({
    data: {
      name,
      username,
    }
  });

  /* Cookies */
  setCookie({ res }, '@ignitecall:userId', user.id, {
    maxAge: 60 * 60 * 24 * 7, // 7 days
    path: '/', // global
  });

  return res.status(201).json(user);
};
