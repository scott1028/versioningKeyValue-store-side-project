import express from 'express';
import cookieParser from 'cookie-parser';
import bodyParser from 'body-parser';
import _ from 'lodash';

const port = _.chain(process.env)
  .get('PORT')
  .parseInt()
  .defaultTo(3000)
  .value();

const app = express();

app.use(bodyParser.json());
app.use(express.urlencoded({ extended: false }));
app.use(cookieParser());

app.use('/api/v1/users', (req, res) => res.json(null));

app.listen(port, () => console.log('web started!'));

export default app;
