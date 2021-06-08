import express from 'express';
import cookieParser from 'cookie-parser';
import bodyParser from 'body-parser';
import DaoService from './orm/DaoService.mjs';

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

export default app;
