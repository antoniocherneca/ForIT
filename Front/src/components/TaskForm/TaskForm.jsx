import { useState } from "react";

const TaskForm = () => {
  const [taskName, setTaskName] = useState("");
  const [taskDescription, setTaskDescription] = useState("");
  const [completedTask, setCompletedTask] = useState(false);

  const handleSubmit = (event) => {
    event.preventDefault();
    const task = {
      title: taskName,
      description: taskDescription,
      completed: completedTask,
    };

    fetch("http://localhost:3001/api/tasks", {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
      },
      body: JSON.stringify(task),
    })
      .then((response) => {
        if (!response.ok) {
          throw new Error("Error en la solicitud: " + response.status);
        }
        return response.json();
      })
      .then((data) => {
        console.log("Tarea guardada:", data);
        // Aquí podrías redirigir al usuario o limpiar el formulario
        setTaskName("");
        setTaskDescription("");
        setCompletedTask(false);
      });
  };

  return (
    <>
      <h2 className="text-center mb-4 mt-5">Carga de Tareas</h2>
      <form className="w-50 mx-auto" onSubmit={handleSubmit}>
        <input
          type="text"
          placeholder="Nombre de la tarea"
          className="form-control mb-3"
          onChange={(ev) => setTaskName(ev.target.value)}
          value={taskName}
        />
        <textarea
          placeholder="Descripción de la tarea"
          className="form-control mb-3"
          onChange={(ev) => setTaskDescription(ev.target.value)}
          value={taskDescription}
        ></textarea>
        <button type="submit" className="btn btn-primary">
          Guardar Tarea
        </button>
      </form>
    </>
  );
};

export default TaskForm;
