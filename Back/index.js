import { log } from "console";
import express from "express";
import fs from "fs";
import { json } from "stream/consumers";

const app = express();
const PORT = 3000;

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

  res.json(data.tasks);
});

app.get("api/tasks/:id", (req, res) => {
  const data = readData();
  const id = parseInt(req.params.id);
  const task = data.tasks.find((task) => task.id === id);
  res.json(task);
});

app.listen(PORT, () => {
  console.log(`El servidor está escuchando en el puerto ${PORT}`);
});
