'use strict';
// eslint-disable-next-line new-cap
const router = require('express').Router();
const userController = require('../../app/v1/users/users.controllers');
const userValidator = require("../../app/v1/users/users.validator");
router.post('/', userValidator.create,userController.create);
router.get('/:user_id',userController.read );
router.put('/:user_id',userController.update );
router.delete('/:user_id',userController.delete );



module.exports = router;