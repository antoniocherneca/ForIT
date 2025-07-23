import express from "express";
import fs from "fs";
import bodyParser from "body-parser";

const app = express();
const PORT = 3000;

app.use(bodyParser.json());

const readData = () => {
  try {
    const data = fs.readFileSync("./db.json");
    return JSON.parse(data);
  } catch (error) {
    console.log(error);
  }
};

const writeData = (data) => {
  try {
    fs.writeFileSync("./db.json", JSON.stringify(data));
  } catch (error) {
    console.log(error);
  }
};

app.get("/", (req, res) => {
  res.send("Bienvenido de nuevo!");
});

app.get("/api/tasks", (req, res) => {
  const data = readData();
  if (data.tasks.length > 0) {
    res.json(data.tasks);
  } else {
    res.send("No se encontraron tareas");
  }
});

app.post("/api/tasks", (req, res) => {
  try {
    const data = readData();
    const maxId = data.tasks[data.tasks.length - 1].id;
    const newTask = {
      id: maxId + 1,
      title: req.body.title,
      description: req.body.description,
      completed: false,
    };
    data.tasks.push(newTask);
    writeData(data);
    res.json(newTask);
  } catch (error) {
    console.log(error);
    res.send("Error al agregar la tarea");
  }
});

app.put("/api/tasks/:id", (req, res) => {
  try {
    const data = readData();
    const id = parseInt(req.params.id);
    const taskIndex = data.tasks.findIndex((task) => task.id === id);

    if (taskIndex === -1) {
      return res.send("Tarea no encontrada");
    }

    const updatedTask = {
      ...data.tasks[taskIndex],
      title: req.body.title || data.tasks[taskIndex].title,
      description: req.body.description || data.tasks[taskIndex].description,
      completed:
        req.body.completed !== undefined
          ? req.body.completed
          : data.tasks[taskIndex].completed,
    };

    data.tasks[taskIndex] = updatedTask;
    writeData(data);
    res.json(updatedTask);
  } catch (error) {
    console.log(error);
    res.send("Error al actualizar la tarea");
  }
});

app.delete("/api/tasks/:id", (req, res) => {
  try {
    const data = readData();
    const id = parseInt(req.params.id);
    const undeletedTasks = data.tasks.filter((task) => task.id !== id);
    data.tasks = undeletedTasks;
    writeData(data);
    res.json(undeletedTasks);
  } catch (error) {
    console.log(error);
    res.send("Error al eliminar la tarea");
  }
});

app.listen(PORT, () => {
  console.log(`El servidor está escuchando en el puerto ${PORT}`);
});
