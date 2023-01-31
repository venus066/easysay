import express from 'express';
import * as dotenv from 'dotenv';
import cors from 'cors';
import mongoose from 'mongoose';

import routes from './routes/index.js';

dotenv.config();
const app = express();
app.use(cors());

app.use(express.json());

app.use('/api', routes);

const uri = process.env.MONGODB_CONNECTION_URL;
const PORT = process.env.PORT;

try {
    mongoose.set('strictQuery', false);
    mongoose.connect(`${uri}`, {
        useNewUrlParser: true,
        useUnifiedTopology: true
    })

    mongoose.connection.on('open', async () => {
        try {
            app.listen({ port: PORT, host: '0.0.0.0' }, () => {
                console.log('Server started on 127.0.0.1:5000 and database connected')
            })
        } catch (err) { console.log(err) }
    })
} catch (error) {
    console.log(error)
    process.exit(0);
}
