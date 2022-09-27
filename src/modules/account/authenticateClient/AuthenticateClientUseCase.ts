import { compare } from 'bcrypt';
import { sign } from 'jsonwebtoken';

import { prisma } from '../../../database/prismaClient';

interface IAuthenticateClient {
  username: string;
  password: string;
}

export class AuthenticateClientUseCase {
  async execute({ username, password }: IAuthenticateClient) {
    // receber username e password
    // verificar se username cadastro
    const client = await prisma.clients.findFirst({
      where: {
        username,
      },
    });

    if (!client) {
      throw new Error("Username or password invalid!");
    }

    // verificar se senha corresponde ao username
    const passwordMatch = await compare(password, client.password);
    if (!passwordMatch) {
      throw new Error("Username or password invalid!");
    }

    // gerar o token
    const token = sign({ username }, "6d60729f5633549be21537b48ef042a7", {
      subject: client.id,
      expiresIn: "1d",
    });

    return token;
  }
}
