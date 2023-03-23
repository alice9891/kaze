/**
 * @author 서동해
 * @email kaze@aivar.kr
 * @create date 2023-03-23 11:41:23
 * @modify date 2023-03-23 16:51:34
 * @desc [description]
 */

import express from 'express';
import { generateUploadURL } from './modules/s3.js';
import logger from './modules/logger.js';

const app = express();
const port = 3001;

app.use('/views', express.static('views'));
app.set('views', './views');
app.set('view engine', 'ejs');
app.use(express.urlencoded({ extended: false }));
app.use(express.json());

app.get('/', function (req, res) {
    res.render('index');
});

app.post('/s3Url', async (req, res) => {
    logger.info('s3 Upload');
    const extension = req.body.extension;
    const url = await generateUploadURL(extension);
    // console.log("s3_url : " + url);
    res.send({ url });
});

app.listen(port);
