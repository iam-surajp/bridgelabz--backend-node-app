import express from 'express';
const router = express.Router();

import adminRoute from './admin.route';
import employeeRoute from './employee.route';
/**
 * Function contains Application routes
 *
 * @returns router
 */
const routes = () => {
  router.get('/', (req, res) => {
    res.json('Welcome');
  });
  router.use('/admin', adminRoute);
  // router.use('/employees',employeeRoute);
  return router;
};

export default routes;
