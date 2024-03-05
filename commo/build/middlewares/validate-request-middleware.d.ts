import { Request, Response, NextFunction } from "express";
declare const validateRequestMiddleware: (req: Request, res: Response, next: NextFunction) => void;
export default validateRequestMiddleware;
