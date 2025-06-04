import { useState } from "react";

export default function TaskForm({onAdd}) {
    const [taskName, setTaskname] = useState("");

    const handleSubmit = (e) => {
        e.preventDefault();
        onAdd(taskName);
        setTaskname("");
    };

    return (
        <form onSubmit={handleSubmit}
        className="add-task-container">
            <button className="add-task-button">+</button>
            <input type="text" 
                value={taskName} 
                onChange={e => setTaskname(e.target.value)}
                placeholder="Your next task..."
                className="input-textbox"/>
        </form>
    );
}
