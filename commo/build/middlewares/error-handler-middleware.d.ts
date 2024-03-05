import { Request, NextFunction, Response } from "express";
declare const errorHandlerMiddleware: (err: Error, req: Request, res: Response, next: NextFunction) => Response<any, Record<string, any>> | undefined;
export default errorHandlerMiddleware;
