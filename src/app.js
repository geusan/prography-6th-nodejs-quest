import express from 'express';
import Routes from './controllers';
import bodyParser from 'body-parser';

const app = express();

app.use(bodyParser.json());

app.use('/hello-world', (req, res) => {
  res.send('hello world');
})
app.use(Routes);

export default app;
