import next from 'next';
import { resolve } from 'path';

const dev = process.env.NODE_ENV !== 'production';
let nextDir = __dirname;
if (nextDir.indexOf('/dist') !== -1) {
  nextDir = resolve(__dirname, '../');
}

const nextapp = next({
  dev,
  dir: nextDir
});

export default nextapp;
