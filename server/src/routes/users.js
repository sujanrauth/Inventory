import UserController from '../controllers/UserController';

module.exports = [
  {
    version: 'v1',
    path: 'users',
    method: 'get',
    action: UserController.verify,
  },
  {
    version: 'v1',
    path: 'users',
    method: 'post',
    action: UserController.addUser,
  },
];
