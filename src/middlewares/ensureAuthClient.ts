import { NextFunction, Request, Response } from 'express';
import { verify } from 'jsonwebtoken';

interface IPayload {
  sub: string;
}

export async function ensureAuthClient(
  request: Request,
  response: Response,
  next: NextFunction
) {
  const authHeader = request.headers.authorization;

  if (!authHeader) {
    return response.status(401).json({
      message: "Token missing!",
    });
  }

  const [, token] = authHeader.split(" ");

  try {
    const { sub } = verify(
      token,
      "6d60729f5633549be21537b48ef042a7"
    ) as IPayload;

    request.id_client = sub;

    return next();
  } catch (error) {
    return response.status(401).json({
      message: "Token invalid!",
    });
  }
}
