/* eslint-disable camelcase */
/* eslint-disable no-shadow */
const catchAsync = require('../helpers/catchAsync');
const userService = require('../services/user.service');

const register = catchAsync(async (req, res) => {
  const { phone_number, password, full_name, address, email } = req.body;
  const register = {
    phone_number,
    password,
    full_name,
    address,
    email,
  };
  const checkExistData = {
    phone_number,
    password,
  };
  const checkExist = await userService.checkLoginService(checkExistData);
  if (checkExist) {
    return res.status(500).send({ message: 'Account has been registered' });
  }
  await userService.registerService(register);
  return res.status(200).send({ message: 'Register success!' });
});

const login = catchAsync(async (req, res) => {
  const { phone_number, password } = req.body;
  const login = {
    phone_number,
    password,
  };
  const result = await userService.checkLoginService(login);
  if (!result) {
    return res.status(500).send({ message: 'Internal server error!' });
  }
  return res.status(200).send(result);
});

const getUserById = catchAsync(async (req, res) => {
  const userId = req.params.id;
  const getUser = await userService.getUserById(userId);
  if (!getUser) {
    return res.status(500).send({ message: 'Internal server error!' });
  }
  return res.status(200).send(getUser);
});

const deleteUserById = catchAsync(async (req, res) => {
  const { user_id } = req.body;
  const checkUser = await userService.getUserById(user_id);
  if (!checkUser) {
    return res.status(500).send({ message: 'Internal server error!' });
  }
  await userService.deleteUserById(user_id);
  return res.status(200).send({ message: 'Delete success!' });
});

const updateUserById = catchAsync(async (req, res) => {
  const { user_id } = req.body;
  const checkUser = await userService.getUserById(user_id);
  if (!checkUser) {
    return res.status(500).send({ message: 'Internal server error!' });
  }
  checkUser.phone_number = req.body.phone_number || checkUser.phone_number;
  checkUser.password = req.body.password || checkUser.password;
  checkUser.full_name = req.body.full_name || checkUser.full_name;
  checkUser.address = req.body.address || checkUser.address;
  checkUser.email = req.body.email || checkUser.email;

  await checkUser.save();
  return res.status(200).send(checkUser);
});

module.exports = {
  login,
  register,
  getUserById,
  deleteUserById,
  updateUserById,
};
