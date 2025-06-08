import "./App.css";
import TaskForm from "./TaskForm";
import Task from "./Task";
import { useEffect, useState } from "react";

function App() {
    const [tasks, setTasks] = useState([]);
    const [taskName, setTaskName] = useState("");
    const [errorMessage, setErrorMessage] = useState("");

    useEffect(() => {
        if (tasks.length === 0) return;
        localStorage.setItem("tasks", JSON.stringify(tasks));
    }, [tasks]);

    useEffect(() => {
        const tasks = JSON.parse(localStorage.getItem("tasks"));
        if (tasks) setTasks(tasks);
    }, []);

    const handleInputChange = (input) => {
        setTaskName(input);

        if (input.trim() && input.length <= 50) {
            setErrorMessage("");
        } else if (input.length >= 50) {
            setErrorMessage("Task name cannot exceed 50 characters");
        }
    };

    const handleAddTask = (e) => {
        e.preventDefault();
        const trimmedName = taskName.trim();

        if (!trimmedName) {
            setErrorMessage("Please enter a task name");
            return;
        } 

        if (trimmedName.length > 50) {
            setErrorMessage("Task name cannot exceed 50 characters");
            return;
    }

        setTasks((prev) => [...prev, { taskName: trimmedName, done: false }]);
        setTaskName("")
        setErrorMessage("");
        }
    

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

    const handleRemoveTask = (taskIndex) => {
        setTasks((prev) => {
            return prev.filter((taskObject, index) => index !== taskIndex);
        });
    };

    const handleRenameTask = (index, newName) => {
        setTasks((prev) => {
            const newTasks = [...prev];
            newTasks[index].taskName = newName;
            return newTasks;
        });
    };

    const numberComplete = tasks.filter((t) => t.done).length;
    const numberTotal = tasks.length;

    const getMessage = () => {
        const percentage = (numberComplete / numberTotal) * 100;
        if (percentage === 0) {
            return "Try to do at least one task";
        } else if (percentage === 100) {
            return "Nice job for today!";
        }
        return "Keep working at it...";
    };

    return (
        <main>
            <h1 className="count">
                {numberComplete}/{numberTotal} Complete
            </h1>
            <h2 className="message">{getMessage()}</h2>
            {errorMessage && <h3 className="error-message">{errorMessage}</h3>}
            <TaskForm
                value={taskName}
                onAdd={handleAddTask}
                onChange={handleInputChange}
            />
            {tasks.map((task, index) => (
                <Task
                    {...task}
                    onToggle={(done) => handleUpdateTask(index, done)}
                    onTrash={() => handleRemoveTask(index)}
                    onRename={(newName) => handleRenameTask(index, newName)}
                />
            ))}
        </main>
    );
}

export default App;
