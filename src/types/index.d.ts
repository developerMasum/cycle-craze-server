import { JwtPayload } from "jsonwebtoken";

declare global {
  namespace Express {
    interface Request {
      user?: JwtPayload & {
        role: string;
        email: string;
      };
    }
  }
}
