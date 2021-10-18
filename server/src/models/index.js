import mongoose from 'mongoose';

import config from '../config';
import User from './users';
import ItemStock from './itemStock';
import Billing from './billing';

const connectDb = () => {
  const databaseUrl = process.env.DATABASE_URL || config.mongoDB.databaseUrl;
  return mongoose.connect(databaseUrl, { useNewUrlParser: true, useUnifiedTopology: true });
};

const models = { User, ItemStock, Billing };
// eslint-disable-next-line import/prefer-default-export
export { connectDb };

export default models;
