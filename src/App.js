import "./App.css";
import TaskForm from "./TaskForm";
import Task from "./Task";
import { useEffect, useState } from "react";

function App() {
    const [tasks, setTasks] = useState([]);

    useEffect(() => {
        if (tasks.length === 0) return;
        localStorage.setItem("tasks", JSON.stringify(tasks));
    }, [tasks]);

    useEffect(() => {
        const tasks = JSON.parse(localStorage.getItem("tasks"));
        if (tasks) setTasks(tasks);
    }, []);

    const handleAddTask = (name) => {
        setTasks((prev) => {
            return [...prev, { taskName: name, done: false }];
        });
    };

    const handleUpdateTask = (taskIndex, newDone) => {
        setTasks((prev) => {
            const newTasks = [...prev];
            newTasks[taskIndex] = {
                ...newTasks[taskIndex],
                done: newDone,
            };
            return newTasks;
        });
    };

    return (
        <main>
            <TaskForm onAdd={handleAddTask} />
            {tasks.map((task, index) => (
                <Task
                    {...task}
                    onToggle={(done) => handleUpdateTask(index, done)}
                />
            ))}
        </main>
    );
}

export default App;
