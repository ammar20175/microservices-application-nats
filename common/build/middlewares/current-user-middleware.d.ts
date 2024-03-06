import { Request, NextFunction, Response } from "express";
interface UserPayload {
    id: string;
    email: string;
}
declare global {
    namespace Express {
        interface Request {
            currentUser?: UserPayload;
        }
    }
}
declare const currentUserMiddleware: (req: Request, res: Response, next: NextFunction) => void;
export default currentUserMiddleware;
