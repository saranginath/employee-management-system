import { Request, Response, NextFunction } from "express-serve-static-core";

export const asyncHanlder = (fn: (req: Request, res: Response, next: NextFunction) => Promise<any>) => (req: Request,
    res: Response,
    next: NextFunction) => {
    Promise.resolve(fn(req, res, next)).catch(next);

}