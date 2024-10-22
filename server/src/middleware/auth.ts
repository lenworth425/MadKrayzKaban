import { Request, Response, NextFunction } from 'express';
import jwt from 'jsonwebtoken';
import dotenv from 'dotenv';

dotenv.config();

interface JwtPayload {
  username: string;
}

export const authenticateToken = (req: Request, res: Response, next: NextFunction) => {
  // TODO: verify the token exists and add the user data to the request object
  const authHeader = req.headers.authorization;

  if (authHeader) {
    const token = authHeader.split(' ')[1];

    const secretKey = process.env.JWT_SECRET_KEY;
    if (!secretKey) {
      return res.sendStatus(500); // Internal Server Error if the secret key is not defined
    }

    jwt.verify(token, secretKey, (err, user) => {
      if (err) {
        return res.sendStatus(403).json({ message: 'Invalid token' });
      }

      req.user = user as JwtPayload;
      return next();
    });
  } else {
    return res.sendStatus(401).json({ message: 'Unauthorized-ntp' });
  }
  // Ensure all code paths return a value
  return;
};
