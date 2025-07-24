import { Link, BrowserRouter, Route, Routes } from "react-router-dom";
import Home from "./components/Home/Home";
import TaskList from "./components/TaskList/TaskList";
import TaskForm from "./components/TaskForm/TaskForm";
import TaskItem from "./components/TaskItem/TaskItem";
import "./App.css";

function App() {
  return (
    <BrowserRouter>
      <header>
        <nav className="menu">
          <Link to="/">Inicio</Link>
          <Link to="/taskform">Formulario de Tareas</Link>
          <Link to="/taskitem">Tarea única</Link>
          <Link to="/tasklist">Lista de tareas</Link>
        </nav>
      </header>

      <Routes>
        <Route path="/" element={<Home />} exact />
        <Route path="/taskform" element={<TaskForm />} exact />
        <Route path="/tasklist" element={<TaskList />} exact />
        <Route path="/taskitem" element={<TaskItem />} exact />
      </Routes>
    </BrowserRouter>
  );
}

export default App;
