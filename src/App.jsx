import "./styles.css";
import { useState, useEffect } from "react";
import { v4 as uuidv4 } from "uuid";

export default function App() {
  const [newTask, setNewTask] = useState("");
  const [taskList, setTaskList] = useState(()=>{
    return localStorage.getItem("taskList") ? JSON.parse(localStorage.getItem("taskList")) : [];
  });
  useEffect(() => {
    localStorage.setItem("taskList", JSON.stringify(taskList));
  }, [taskList]);

  function addNewTask(e) {
    event.preventDefault();
    if (
      newTask.trim() !== "" &&
      !taskList
        .map((obj) => obj.task.toLowerCase().trim())
        .includes(newTask.toLowerCase().trim())
    ) {
      setTaskList((currentTaskList) => [
        ...currentTaskList,
        { id: uuidv4(), task: newTask, isCompleted: false },
      ]);
      setNewTask("");
    }
  }

  function toggleCheckbox(id, isChecked) {
    setTaskList((currentTaskList) =>
      currentTaskList.map((taskObj) =>
        taskObj.id === id ? { ...taskObj, isCompleted: isChecked } : taskObj
      )
    );
  }

  function deleteTask(id) {
    console.log("Delete id");

    setTaskList((currentTaskList) => {
      // let i = currentTaskList.findIndex((taskObj) => taskObj.id === id);
      // let updateList = [...currentTaskList];
      // updateList.splice(i, 1);
      // return updateList;
      return currentTaskList.filter(taskObj =>{
        return taskObj.id !== id;
      })
    });
  }

  return (
    <>
      <form className="new-item-form" onSubmit={addNewTask}>
        <div className="form-row">
          <label htmlFor="item">New Item</label>
          <input
            type="text"
            id="item"
            value={newTask}
            onChange={(event) => setNewTask(event.target.value)}
          />
        </div>
        <button className="btn">Add</button>
      </form>
      <h1 className="header">Task List</h1>
      <ul className="list">
        {taskList.length === 0 && "...waiting for new tasks..."}
        {taskList.map((taskObj) => (
          <li key={taskObj.id}>
            <label>
              <input
                type="checkbox"
                onChange={(e) => {
                  toggleCheckbox(taskObj.id, e.target.checked);
                }}
                checked={taskObj.isCompleted}
              />
              {taskObj.task}
              <button
                className="btn btn-danger"
                onClick={(e) => deleteTask(taskObj.id)}
              >
                Delete
              </button>
            </label>
          </li>
        ))}
      </ul>
    </>
  );
}
