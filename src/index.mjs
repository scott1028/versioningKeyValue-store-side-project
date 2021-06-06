import express from 'express';
import cookieParser from 'cookie-parser';
import bodyParser from 'body-parser';
import _ from 'lodash';

import DaoService from './orm.mjs';

const port = _.chain(process.env)
  .get('PORT')
  .parseInt()
  .defaultTo(3000)
  .value();

const app = express();

const defaultContentTypeMiddleware = (req, res, next) => {
  req.headers['content-type'] = req.headers['content-type']
    || 'application/json';
  next();
};
app.use(defaultContentTypeMiddleware);

app.use(bodyParser.json());
app.use(express.urlencoded({ extended: false }));
app.use(cookieParser());

// NOTE: we don't need to support this type
// app.delete('/api/keys/:key', (req, res) => {
//   res.json(DaoService.delete(req.params.key, req.query.timestamp));
// });

app.get('/api/keys', (req, res) => {
  res.json(DaoService.list(req.query.timestamp));
});

app.post('/api/keys', (req, res) => {
  res.json(DaoService.create(req.body));
});

app.get('/api/keys/:key', (req, res) => {
  res.json(DaoService.get(req.params.key, req.query.timestamp));
});

// NOTE: home path redirector
app.use(function (req, res) {
  res.redirect(`/api/keys?timestamp=${Date.now()}`);
});

app.listen(port, () => console.log('web started!'));

export default app;
