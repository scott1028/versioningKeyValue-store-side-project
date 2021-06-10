import _ from 'lodash';
import express from 'express';
import cookieParser from 'cookie-parser';
import bodyParser from 'body-parser';
import DaoService from './orm/DaoService.mjs';
import {
  POST_FORMAT_INVALID,
  DATA_NOT_FOUND,
} from './errors.mjs';

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
// app.delete('/object/:key', (req, res) => {
//   res.json(DaoService.delete(req.params.key, req.query.timestamp));
// });

// NOTE: we don't need to support this type
// app.get('/statistic', (req, res) => {
//   res.json(DaoService.statisic(req.query.timestamp))
// });

app.get('/object', (req, res) => {
  res.json(DaoService.list(req.query.timestamp));
});

app.post('/object', (req, res) => {
  /* NOTE: if logic in controller is too complex in the future,
           we should move them to exclusive folder or file.
   */

  // NOTE: valid input parameters
  const formattedData = _.chain(req.body)
    .toPairs()
    .map(([key, value]) => ({ key, value }))
    .value();
  if (formattedData.length !== 1) {
    res.status(400);
    res.json({ error: POST_FORMAT_INVALID });
    return;
  }
  if (_.chain(formattedData).get([0, 'key']).isEmpty().value()) {
    res.status(400);
    res.json({ error: POST_FORMAT_INVALID });
    return;
  }

  const value = DaoService.create(_.chain(formattedData).get(0).value());
  res.json(value);
});

app.get('/object/:key', (req, res) => {
  /* NOTE: if logic in controller is too complex in the future,
           we should move them to exclusive folder or file.
   */
  const value = _.chain(DaoService.get(req.params.key, req.query.timestamp))
    .get('value');
  if (_.chain(value).identity().isUndefined().value()) {
    res.status(404);
    res.json({ error: DATA_NOT_FOUND });
    return;
  }
  res.json({ value });
});

// NOTE: home path redirector
app.use(function (req, res) {
  res.redirect(`/object?timestamp=`);
});

export default app;
