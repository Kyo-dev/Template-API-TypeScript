import {Request, Response, NextFunction} from 'express'
import jwt from 'jsonwebtoken'

interface IPayload {
    _id: string;
    iat: number;
    exp: number;
}

export const verifyToken = (req:Request, res:Response, next:NextFunction) =>{
    const token = req.header('auth-token');
    if(!token) return res.status(401).json('Deny access')
    const payload = jwt.verify(token, process.env.SECRET_KEY || 'tokentest') as IPayload
    req.userId = payload._id
    next();
}