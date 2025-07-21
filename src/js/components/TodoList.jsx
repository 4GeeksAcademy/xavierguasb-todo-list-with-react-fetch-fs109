import React, { useState, useEffect } from "react";

const TodoList = () => {
    const [task, setTask] = useState("");
    const [tasks, setTasks] = useState([]);

    useEffect(() => {
        leerTareas();
    }, []);

    function leerTareas() {
        fetch("https://playground.4geeks.com/todo/users/Xavier")
            .then((response) => response.json())
            .then((data) => {
                setTasks(data.todos);
            });
    }

    function crearTarea(e) {
        e.preventDefault();
        if (task.trim() === "") return;

        const nuevaTarea = {
            label: task,
            is_done: false,
        };

        fetch("https://playground.4geeks.com/todo/todos/Xavier", {
            method: "POST",
            headers: { "Content-Type": "application/json" },
            body: JSON.stringify(nuevaTarea),
        })
            .then((response) => response.json())
            .then(() => {
                setTask("");
                leerTareas();
            });
    }

    function eliminarTarea(id) {
        fetch(`https://playground.4geeks.com/todo/todos/${id}`, {
            method: "DELETE",
        })
            .then((response) => response.text())
            .then(() => {
                leerTareas();
            });
    }

    return (
        <div className="container">
            <h1 className="text-center">todos</h1>
            <div className="row justify-content-center">
                <div className="col-4">
                    <ul className="list-group list-unstyled p-0 shadow-lg bg-body-tertiary">
                        <li className="list-group-item p-0">
                            <form className="ps-3" onSubmit={crearTarea}>
                                <input
                                    type="text"
                                    value={task}
                                    onChange={(e) => setTask(e.target.value)}
                                    className="border border-0"
                                    placeholder="No hay tareas, añadir tareas"
                                />
                            </form>
                        </li>
                        <div className="row justify-content-center">
                            <div>
                                {tasks.map((t, index) => (
                                    <li
                                        className="list-group-item py-1 listTodo"
                                        key={t.id}
                                    >
                                        {t.label}
                                        <button
                                            onClick={() => eliminarTarea(t.id)}
                                            type="button"
                                            className="btn-close float-end deleteButtom"
                                            aria-label="Close"
                                        ></button>
                                    </li>
                                ))}
                            </div>
                        </div>
                        <li className="list-group-item py-0 totalitems">
                            {tasks.length} item(s) left
                        </li>
                        <div className="final1"></div>
                        <div className="final2"></div>
                    </ul>
                </div>
            </div>
        </div>
    );
};

export default TodoList;