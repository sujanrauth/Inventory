import BillingController from '../controllers/BillingController';

module.exports = [
  {
    version: 'v1',
    path: 'billing',
    method: 'post',
    action: BillingController.create,
  },
  {
    version: 'v1',
    path: 'billing/:phoneNumber',
    method: 'get',
    action: BillingController.getByPhoneNumber,
  },
];
