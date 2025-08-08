const { taskModel } = require('../model/task.model');

const getAllTasks = async (req, res) => {
  try {
    const tasks = await taskModel.findAll();
    res.status(200).json(tasks);
  } catch (error) {
    res.status(500).json({ message: "Error al obtener las tareas", error });
  }
};

const getTaskById = async (req, res) => {
  try {
    const { id } = req.params;
    const task = await taskModel.findByPk(id);
    if (!task) {
      return res.status(404).json({ message: "Tarea no encontrada" });
    }
    res.status(200).json(task);
  } catch (error) {
    res.status(500).json({ message: "Error al obtener la tarea", error });
  }
};

const createTask = async (req, res) => {
  try {
    const { title, description, status } = req.body;
    if (!title || !description) {
      return res.status(400).json({ message: "Los campos título y descripción son obligatorios" });
    }
    const newTask = await taskModel.create({ title, description, status });
    res.status(201).json({ message: "Tarea creada exitosamente", task: newTask });
  } catch (error) {
    res.status(500).json({ message: "Error al crear la tarea", error });
  }
};

const updateTask = async (req, res) => {
  try {
    const { id } = req.params;
    const { title, description, status } = req.body;
    const task = await taskModel.findByPk(id);
    if (!task) {
      return res.status(404).json({ message: "Tarea no encontrada" });
    }
    await task.update({ title, description, status });
    res.status(200).json({ message: "Tarea actualizada exitosamente", task });
  } catch (error) {
    res.status(500).json({ message: "Error al actualizar la tarea", error });
  }
};

const deleteTask = async (req, res) => {
  try {
    const { id } = req.params;
    const task = await taskModel.findByPk(id);
    if (!task) {
      return res.status(404).json({ message: "Tarea no encontrada" });
    }
    await task.destroy();
    res.status(200).json({ message: "Tarea eliminada exitosamente" });
  } catch (error) {
    res.status(500).json({ message: "Error al eliminar la tarea", error });
  }
};

module.exports = {
  getAllTasks,
  getTaskById,
  createTask,
  updateTask,
  deleteTask
};