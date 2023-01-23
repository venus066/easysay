import { Router } from 'express';
import { getCompletion } from '../services/openai.service.js';

const router = Router();

router.post('/', async (req, res, next) => {
    try {
        const prompt = req.body.prompt;
        const response = await getCompletion(prompt);

        res.status(200).send({
            bot: response.text
        })
    } catch (error) {
        // console.log(error);
        res.status(500).send({ error })
    }
});

export default router;