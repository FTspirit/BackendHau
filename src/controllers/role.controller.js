/* eslint-disable camelcase */
/* eslint-disable no-shadow */
const catchAsync = require('../helpers/catchAsync');
const roleService = require('../services/role.service');

const createRole = catchAsync(async (req, res) => {
  const { name } = req.body;
  const checkExist = await roleService.findRoleService(name);
  if (checkExist) {
    return res.status(500).send({ message: 'Internal server error!' });
  }
  const result = await roleService.createRoleService(name);
  return res.status(200).send(result);
});

const deleteRole = catchAsync(async (req, res) => {
  const { name } = req.body;
  const checkExist = await roleService.findRoleService(name);
  if (!checkExist) {
    return res.status(500).send({ message: 'Internal server error!' });
  }
  await roleService.deleteRoleService(name);
  return res.status(200).send({ message: 'Delete success!' });
});

const updateRole = catchAsync(async (req, res) => {
  const { id, name } = req.body;
  const checkExist = await roleService.findRoleByIdService(id);
  if (!checkExist) {
    return res.status(500).send({ message: 'Internal server error!' });
  }
  checkExist.name = name;
  await checkExist.save();
  return res.status(200).send(checkExist);
});

const listRole = catchAsync(async (req, res) => {
  const checkExist = await roleService.findAllRoleService();
  return res.status(200).send(checkExist);
});

module.exports = {
  createRole,
  deleteRole,
  updateRole,
  listRole,
};
