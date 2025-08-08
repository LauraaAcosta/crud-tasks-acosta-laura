const { userModel } = require('../model/user.model.js');

const getAllUsers = async (req, res) => {
  try {
    const users = await userModel.findAll();
    if (!users || users.length === 0) {
      return res.status(404).json({ message: "No se encontraron usuarios" });
    }
    res.status(200).json(users);
  } catch (error) {
    console.log(error);
    res.status(500).json({ message: "Error del servidor", error });
  }
};

const getUserById = async (req, res) => {
  try {
    const { id } = req.params;
    const user = await userModel.findByPk(id);
    if (!user) {
      return res.status(404).json({ message: "Usuario no encontrado" });
    }
    res.status(200).json(user);
  } catch (error) {
    console.log(error);
    res.status(500).json({ message: "Error del servidor", error });
  }
};

const createUser = async (req, res) => {
  try {
    const { name, email, password } = req.body;
    if (!name || !email || !password) {
      return res.status(400).json({ message: "Los campos son obligatorios" });
    }
    const unicoUser = await userModel.findOne({ where: { name } });
    if (unicoUser) {
      return res.status(400).json({ message: "El usuario ya existe" });
    }
    const crearUser = await userModel.create({ name, email, password });
    res.status(201).json({ message: "Usuario creado de manera exitosa", user: crearUser });
  } catch (error) {
    console.log(error);
    res.status(500).json({ message: "Error al crear el usuario", error });
  }
};

const deleteUser = async (req, res) => {
  try {
    const { id } = req.params;
    const user = await userModel.findByPk(id);
    if (!user) {
      return res.status(404).json({ message: "No se encontró ningún usuario" });
    }
    await user.destroy();
    res.status(200).json({ message: "Usuario eliminado exitosamente" });
  } catch (error) {
    console.log(error);
    res.status(500).json({ message: "Error al eliminar el usuario", error });
  }
};

const updateUser = async (req, res) => {
  try {
    const { id } = req.params;
    const user = await userModel.findByPk(id);
    if (!user) {
      return res.status(404).json({ message: "No se encontró el usuario" });
    }
    const { name, email, password } = req.body;

    if (email && email !== user.email) {
      const emailExists = await userModel.findOne({ where: { email } });
      if (emailExists) {
        return res.status(400).json({ message: "Ese email está ocupado actualmente" });
      }
    }

    await user.update({
      name: name || user.name,
      email: email || user.email,
      password: password || user.password
    });

    return res.status(200).json({ message: "Usuario actualizado exitosamente", user });
  } catch (error) {
    return res.status(500).json({ error: "Hubo un error al actualizar el usuario" });
  }
};

module.exports = {
  getAllUsers,
  getUserById,
  createUser,
  deleteUser,
  updateUser
};