import express from 'express';
import * as dotenv from 'dotenv';
import cors from 'cors';
import mongoose from 'mongoose';
import path from 'path';
import { fileURLToPath } from 'url';
import sassMiddleware from 'node-sass-middleware'

import routes from './routes/index.js';
import pageRoutes from './routes/page.js';

const __filename = fileURLToPath(import.meta.url);
const __dirname = path.dirname(__filename);

dotenv.config();
const app = express();

// views engine setup
app.set('views', path.join(__dirname, 'views'));
app.set('view engine', 'ejs');

app.use(express.static(path.join(__dirname, 'public')));

app.use(
    "/stylesheets",
    express.static(path.join(__dirname, "node_modules/bootstrap/dist/css"))
)

app.use(
    "/stylesheets",
    express.static(path.join(__dirname, "node_modules/bootstrap-icons/font"))
)

app.use(
    "/javascripts",
    express.static(path.join(__dirname, "node_modules/bootstrap/dist/js"))
)

var srcPath = __dirname + '/sass';
var destPath = __dirname + '/public/stylesheets';

app.use('/stylesheets', sassMiddleware({
    src: srcPath,
    dest: destPath,
    debug: true,
    outputStyle: 'compressed'
}));

app.use(cors());

app.use(express.json());

app.use('/api', routes);
app.use('/', pageRoutes);

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
                console.log('Server started and database connected')
            })
        } catch (err) { console.log(err) }
    })
} catch (error) {
    console.log(error)
    process.exit(0);
}
