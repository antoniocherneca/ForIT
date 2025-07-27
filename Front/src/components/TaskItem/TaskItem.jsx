const TaskItem = () => {
  let searchedTask = {};

  return (
    <>
      <h2 className="text-center mb-4 mt-5">Buscar Tarea</h2>
      <div className="input-group mb-3">
        <input
          type="text"
          className="form-control"
          placeholder="Ingrese el ID de la tarea"
          id="taskIdInput"
        />
        <button
          className="btn btn-primary"
          type="button"
          onClick={() => {
            const id = parseInt(document.querySelector("input").value);
            fetch(`http://localhost:3001/api/tasks`)
              .then((response) => {
                if (!response.ok) {
                  Swal.fire({
                    text: "Error al buscar la tarea",
                    timer: 2000,
                    icon: "error",
                    allowEscapeKey: true,
                    showConfirmButton: false,
                  });
                  throw new Error(
                    "Error al buscar la tarea: " + response.status
                  );
                }
                return response.json();
              })
              .then((tasks) => {
                {
                  searchedTask = tasks.filter((task) => task.id === id);
                }
                //console.log(searchedTask);
                <ul className="list-group mx-auto">
                  <li key={searchedTask.id} className="list-group-item">
                    <div className="d-flex justify-content-between gap-4">
                      <p>
                        <strong>{searchedTask.title}</strong>
                        <span
                          className={`badge ${
                            searchedTask.completed
                              ? "text-bg-success"
                              : "text-bg-secondary"
                          }`}
                        >
                          {searchedTask.completed ? "Completada" : "Pendiente"}
                        </span>
                      </p>
                      <p>{searchedTask.description}</p>
                      <p className="mb-0 text-muted">
                        <em>
                          Creada el{" "}
                          {new Date(
                            searchedTask.createdAt
                          ).toLocaleDateString()}{" "}
                          a las{" "}
                          {new Date(searchedTask.createdAt).toLocaleTimeString(
                            "es-ES"
                          )}
                        </em>
                      </p>
                    </div>
                  </li>
                </ul>;
              })
              .catch((error) => {
                console.error("Error al buscar la tarea:", error);
              });
          }}
        >
          Buscar
        </button>
      </div>
    </>
  );
};

export default TaskItem;
