import { where } from "sequelize";
import { userModel } from "../model/user.model.js";

export const getAllUsers = async (req, res) => {
  try {
    const buscarTdUsers = await userModel.findAll();
    res.status(200).json(users);
    if(!buscarTdUsers){
        return res.status(404).json({ message: "No se encontraron usuarios" });
    }
  } catch (error) {
    console.log(error)
    res.status(500).json({ message: "Error del servidor", error });
  }
};
export const getUserById = async (req, res) => {
  try {
    const { id } = req.params;
    const buscarUser = await userModel.findByPk(id);
    if (!buscarUser) {
      return res.status(404).json({ message: "Usuario no encontrado" });
    }
    res.status(200).json(user);
  } catch (error) {
    console.log(error)
    res.status(500).json({ message: "Error del servidor", error });
  }
}; 
export const createUser = async (req, res) => {
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
    res.status(201).json ({Message: "Usuario creado de manera exitosa", crearUser});
  } catch (error) {
    console.log(error)
    res.status(500).json({ message: "Error al crear el usuario", error });
  }
};

export const deleteUser = async (req, res) => {
  try {
    const { id } = req.params;
    const buscarUser = await userModel.findOne({ where: { id } });
    if (!buscarUser) {
      return res.status(404).json({ message: "No se encontró ningún usuario" });
    }
    const borrarUser = await user.destroy({where: id });
    res.status(200).json({ message: "Usuario eliminado exitosamente" });
  } catch (error) {
    console.log(error)
    res.status(500).json({ message: "Error al eliminar el usuario", error });
  }
};

export const updateUser = async (req, res) => {
  try {
    const user = UserModel.findByPk(req.params.id);
    if (!user) {
      return res.status(404).json("No se encontró el usuario");
    }
    const { name, email, password } = req.body;

    if (email && (await UserModel.findOne({where: {email}}))) {
      return res.status(400).json("Ese email está ocupado actualmente");
    }

    await UserModel.update({
      name : name || user.name,
      email: email || user.email,
      password: password || users.password
    })
    return res.status(200).json(user)

  } catch (error) {
    return res.status(500).json({error: "Hubo un error al crear el usuario"})
  }
}