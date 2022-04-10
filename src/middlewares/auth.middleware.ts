import {NextFunction, Request, Response} from "express";

export const authMiddleware = (req: Request, res: Response, next: NextFunction) => {
    if (req.query.token !== '123') {
        res.status(401).send({message: 'Unauthorized'})
    } else {
        next()
        return
    }
}