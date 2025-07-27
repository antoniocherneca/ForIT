import "./TaskList.css";
import { useEffect, useState } from "react";
import Swal from "sweetalert2";

const TaskList = () => {
  const [tasks, setTasks] = useState([]);
  let badgeClass = "";

  useEffect(() => {
    fetch("http://localhost:3001/api/tasks")
      .then((response) => {
        if (!response.ok) {
          throw new Error("Error en la solicitud: " + response.status);
        }
        return response.json();
      })
      .then((data) => {
        setTasks(data);
      })
      .catch((error) => {
        console.error("Error al obtener las tareas:", error);
      });
  }, []);

  return (
    <>
      <h2 className="text-center mb-4 mt-5">Mis tareas</h2>
      <ul className="list-group mx-auto">
        {tasks.map((task) => (
          <li key={task.id} className="list-group-item">
            <div className="d-flex justify-content-between gap-4">
              <div>
                <p className="d-flex gap-3">
                  <input
                    className="form-check-input"
                    type="checkbox"
                    checked={task.completed}
                    onChange={() => {
                      fetch(`http://localhost:3001/api/tasks/${task.id}`, {
                        method: "PUT",
                        headers: {
                          "Content-Type": "application/json",
                        },
                        body: JSON.stringify({
                          completed: !task.completed,
                        }),
                      })
                        .then((response) => {
                          if (!response.ok) {
                            Swal.fire({
                              text: "Error al actualizar la tarea",
                              timer: 2000,
                              icon: "error",
                              allowEscapeKey: true,
                              showConfirmButton: false,
                            });
                            throw new Error(
                              "Error al actualizar la tarea" + response.status
                            );
                          }
                          return response.json();
                        })
                        .then((updatedTask) => {
                          setTasks((prevTasks) =>
                            prevTasks.map((task) =>
                              task.id === updatedTask.id ? updatedTask : task
                            )
                          );
                        });
                      Swal.fire({
                        text: "Tarea actualizada correctamente",
                        timer: 2000,
                        icon: "success",
                        allowEscapeKey: true,
                        showConfirmButton: false,
                      });
                    }}
                  />
                  <strong>{task.title}</strong>
                  <span
                    className={`badge ${
                      task.completed ? "text-bg-success" : "text-bg-secondary"
                    }`}
                  >
                    {task.completed ? "Completada" : "Pendiente"}
                  </span>
                </p>
                <p>{task.description}</p>
                <p className="mb-0 text-muted">
                  <em>
                    Creada el {new Date(task.createdAt).toLocaleDateString()} a
                    las {new Date(task.createdAt).toLocaleTimeString("es-ES")}
                  </em>
                </p>
              </div>
              <div className="d-flex flex-row align-items-center gap-2">
                <button
                  className="btn btn-danger"
                  onClick={() => {
                    fetch(`http://localhost:3001/api/tasks/${task.id}`, {
                      method: "DELETE",
                    })
                      .then((response) => {
                        if (!response.ok) {
                          Swal.fire({
                            text: "Error al eliminar la tarea",
                            timer: 2000,
                            icon: "error",
                            allowEscapeKey: true,
                            showConfirmButton: false,
                          });
                          throw new Error("Error al eliminar la tarea");
                        }
                        return response.json();
                      })
                      .then(() => {
                        setTasks((prevTasks) =>
                          prevTasks.filter((t) => t.id !== task.id)
                        );
                      });
                    Swal.fire({
                      text: "Tarea eliminada correctamente",
                      timer: 2000,
                      icon: "success",
                      allowEscapeKey: true,
                      showConfirmButton: false,
                    });
                  }}
                >
                  Eliminar
                </button>
              </div>
            </div>
          </li>
        ))}
      </ul>
    </>
  );
};

export default TaskList;
