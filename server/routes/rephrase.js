import { Router } from 'express';
import { getRephrase } from "../services/openai.service.js";

const router = Router();

router.post('/candidate', async (req, res, next) => {
    try {
        const prompt = req.body.params;
        const response = await getRephrase(prompt);

        res.status(200).send({
            candidates: response
        })
    } catch (error) {
        // console.log(error);
        res.status(500).send({ error })
    }
    
});

export default router;