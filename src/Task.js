import { useState } from "react";
import Checkbox from "./Checkbox";
import { FaTrash } from "react-icons/fa";

export default function Task({ taskName, done, onToggle, onTrash, onRename }) {
    const [editMode, setEditMode] = useState(false);

    return (
        <div className={"task" + (done ? "done" : "not-done")}>
            <Checkbox checked={done} onClick={() => onToggle(!done)} />
            {!editMode && (
                <div
                    className="task-label"
                    onClick={() => setEditMode((prev) => !prev)}
                >
                    {taskName}
                </div>
            )}
            {editMode && (
                <form
                    onSubmit={(e) => {
                        e.preventDefault();
                        setEditMode(false);
                    }}
                >
                    <input
                        type="text"
                        value={taskName}
                        onChange={(e) => onRename(e.target.value)}
                        className="rename-textbox"
                    />
                </form>
            )}

            <button className="trash" onClick={onTrash}>
                <FaTrash />
            </button>
        </div>
    );
}
