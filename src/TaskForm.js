export default function TaskForm({ value, onChange, onAdd }) {
    return (
        <form onSubmit={onAdd} className="add-task-container">
            <button className="add-task-button">+</button>
            <input
                type="text"
                value={value}
                onChange={(e) => {
                    onChange(e.target.value);
                }}
                placeholder="Your next task..."
                className="input-textbox"
            />
        </form>
    );
}
