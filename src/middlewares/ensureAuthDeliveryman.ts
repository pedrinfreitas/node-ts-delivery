import { NextFunction, Request, Response } from 'express';
import { verify } from 'jsonwebtoken';

interface IPayload {
  sub: string;
}

export async function ensureAuthDeliveryman(
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
      "979a52987ec8b115868e7547f80f4771"
    ) as IPayload;

    request.id_deliveryman = sub;

    return next();
  } catch (error) {
    return response.status(401).json({
      message: "Token invalid!",
    });
  }
}
