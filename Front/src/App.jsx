import { Link, BrowserRouter, Route, Routes } from "react-router-dom";
import Home from "./components/Home/Home";
import TaskList from "./components/TaskList/TaskList";
import TaskForm from "./components/TaskForm/TaskForm";
import TaskItem from "./components/TaskItem/TaskItem";
import "bootstrap/dist/css/bootstrap.min.css";
import "bootstrap/dist/js/bootstrap.min.js";
import "./App.css";

function App() {
  return (
    <BrowserRouter>
      <header className="bg-success">
        <div className="container">
          <nav className="navbar navbar-expand-lg bg-success">
            <ul className="navbar-nav me-auto mb-2 mb-lg-0">
              <li className="nav-item">
                <Link to="/" className="nav-link text-white">
                  Inicio
                </Link>
              </li>
              <li className="nav-item">
                <Link to="/taskform" className="nav-link text-white">
                  Formulario de Tareas
                </Link>
              </li>
              <li className="nav-item">
                <Link to="/taskitem" className="nav-link text-white">
                  Tarea única
                </Link>
              </li>
              <li className="nav-item">
                <Link to="/tasklist" className="nav-link text-white">
                  Lista de tareas
                </Link>
              </li>
            </ul>
          </nav>
        </div>
      </header>
      <main>
        <div className="container mt-4">
          <Routes>
            <Route path="/" element={<Home />} exact />
            <Route path="/taskform" element={<TaskForm />} exact />
            <Route path="/tasklist" element={<TaskList />} exact />
            <Route path="/taskitem" element={<TaskItem />} exact />
          </Routes>
        </div>
      </main>
    </BrowserRouter>
  );
}

export default App;
