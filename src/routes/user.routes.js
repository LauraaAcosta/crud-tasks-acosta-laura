const express = require('express');
const router = express.Router();
const { getAllUsers, createUser, updateUser, deleteUser, getUserById } = require('../controller/user.controller');

router.get("/", getAllUsers);
router.get("/:id", getUserById);
router.post("/", createUser);
router.put("/:id", updateUser);
router.delete("/:id", deleteUser);

module.exports = router;