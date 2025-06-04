import Checkbox from "./Checkbox";

export default function Task({ taskName, done, onToggle }) {
    return (
        <div className={"task" + (done ? "done" : "not-done")}>
            <Checkbox checked={done} onClick={() => onToggle(!done)} />
            {taskName}
        </div>
    );
}
