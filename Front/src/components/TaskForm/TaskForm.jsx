import { useState, useRef, useEffect } from "react";
import Swal from "sweetalert2";
// import { useForm, submitHandler } from "react-hook-form";

const TaskForm = () => {
  const [taskName, setTaskName] = useState("");
  const [taskDescription, setTaskDescription] = useState("");
  const [completedTask, setCompletedTask] = useState(false);
  const firstInput = useRef(null);
  /* const {
    register,
    formState: { errors },
    submitHandler,
  } = useForm(); */

  useEffect(() => {
    firstInput.current.focus();
  }, []);

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
          Swal.fire({
            text: "Error al crear la tarea",
            timer: 2000,
            icon: "error",
            allowEscapeKey: true,
            showConfirmButton: false,
          });
          throw new Error("Error al crear la tarea: " + response.status);
        }
        return response.json();
      })
      .then((data) => {
        console.log("Tarea creada:", data);
        setTaskName("");
        setTaskDescription("");
        setCompletedTask(false);
      });
    Swal.fire({
      text: "Tarea creada correctamente",
      timer: 2000,
      icon: "success",
      allowEscapeKey: true,
      showConfirmButton: false,
    });
    firstInput.current.focus();
  };

  return (
    <>
      <h2 className="text-center mb-4 mt-5">Nueva Tarea</h2>
      <form className="w-50 mx-auto" onSubmit={handleSubmit}>
        <input
          type="text"
          placeholder="Nombre de la tarea"
          className="form-control mb-3"
          onChange={(ev) => setTaskName(ev.target.value)}
          value={taskName}
          ref={firstInput}
          /* {...register("taskName", {
            required: true,
            pattern: /^[A-Za-z]+$/i,
          })} */
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
