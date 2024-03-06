import { Request, Response, NextFunction } from "express";
declare const requireAuthMiddleware: (req: Request, res: Response, next: NextFunction) => void;
export default requireAuthMiddleware;
