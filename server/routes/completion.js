import { Router } from 'express';
import API from "../app/api.js";
import isAuthenticated from './middleware/isAuthenticated.js';

const router = Router();

router.post('/', async (req, res, next) => {
    try {
        const prompt = req.body.prompt;
        const response = await API.createCompletion({
            // model: "text-davinci-003",
            model: "text-curie-001",
            prompt: `${prompt}`,
            temperature: 0.9,
            max_tokens: 150,
            top_p: 1,
            frequency_penalty: 0,
            presence_penalty: 0.6,
        });

        res.status(200).send({
            bot: response.data.choices[0].text
        })
    } catch (error) {
        // console.log(error);
        res.status(500).send({ error })
    }
});

export default router;