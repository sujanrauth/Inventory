import express from 'express';

import health from './health';
import users from './users';
import itemStock from './itemStock';
import billing from './billing';

const supportedMethods = ['get', 'post', 'put', 'delete'];

const configureRouter = (app, routes = []) => {
  const { prefix } = config;
  const router = express.Router();
  routes.forEach((route) => {
    const method = route.method.toLowerCase();
    const policies = route.policies || [];
    const version = route.version || 'v1';

    /* Check if method is supported */
    if (!supportedMethods.includes(method)) {
      throw new Error({
        message: `Method ${method} is not supported`,
      });
    }

    router[method].apply(router, [`/${version}/${route.path}`, ...policies, route.action]);
    /* Use default prefix from config if router doesn't provide one */
    app.use(`${route.prefix || prefix}`, router);
  });
};

module.exports = (app) => {
  configureRouter(app, health);
  configureRouter(app, users);
  configureRouter(app, itemStock);
  configureRouter(app, billing);
};
