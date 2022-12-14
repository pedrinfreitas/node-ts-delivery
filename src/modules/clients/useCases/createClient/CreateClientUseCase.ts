import { hash } from 'bcrypt';

import { prisma } from '../../../../database/prismaClient';

interface ICreateClient {
  username: string;
  password: string;
}

export class CreateClientUseCase {
  async execute({ username, password }: ICreateClient) {
    //validar se usuario existe
    console.log(username);
    const clientExist = await prisma.clients.findFirst({
      where: {
        username: {
          equals: username,
          mode: "insensitive",
        },
      },
    });
    console.log(clientExist);

    if (clientExist) {
      throw new Error("Client already exists");
    }

    const hashPassword = await hash(password, 10);

    const client = await prisma.clients.create({
      data: {
        username,
        password: hashPassword,
      },
    });

    return client;

    //salvar usuario
  }
}
