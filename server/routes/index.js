import { Router } from 'express';
import jwt from 'jsonwebtoken'
import auth from './auth.js'
import chat from './chat.js'
import completion from './completion.js'

const router = Router();

function jwtVerify(req, res, next) {
    console.log("verifying token...");
    if (req.headers.authorization) {
        const token = req.headers.authorization.split(" ")[1]; // Bearer <token>
        console.log('token', token);
        try {
            const result = jwt.verify(token, process.env.PRIVATE_KEY);
            req.decoded = result;
            next();
        } catch (err) {
            const result = {
                error: `Unauthorized`,
                status: 401,
            };
            res.status(401).send(result);
        }
    } else {
        const result = {
            error: `Unauthorized error. Token required.`,
            status: 401,
        };
        res.status(401).send(result);
    }
}

router.use('/completion', completion);
router.use('/auth', auth);
router.use('/chat', chat);

export default router;