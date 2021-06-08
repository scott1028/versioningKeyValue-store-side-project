import _ from 'lodash';

import app from './app.mjs';

const port = _.chain(process.env)
  .get('PORT')
  .parseInt()
  .defaultTo(3000)
  .value();

export default app.listen(port, () => console.log('web started!'));
