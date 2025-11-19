import React, { useState } from 'react';

function TodoFunction() {
  // State for tasks list and the input value
  const [tasks, setTasks] = useState([]);
  const [newTask, setNewTask] = useState('');

  // Function to handle the input change
  const handleInputChange = (e) => {
    setNewTask(e.target.value);
  };

  // Function to handle adding a new task
  const addTask = () => {
    if (newTask.trim()) {
      const newTaskObj = {
        id: Date.now(), // Unique id based on timestamp
        text: newTask,
        completed: false,
      };
      setTasks([...tasks, newTaskObj]);
      setNewTask(''); // Clear input after adding
    }
  };

  // Function to toggle task completion status
  const toggleTaskCompletion = (taskId) => {
    setTasks(tasks.map((task) =>
      task.id === taskId ? { ...task, completed: !task.completed } : task
    ));
  };

  // Function to delete a task
  const deleteTask = (taskId) => {
    setTasks(tasks.filter((task) => task.id !== taskId));
  };

  return (
    <div>
            <h1>To-Do List</h1>
      
      {/* Input field for new task */}
      <input
        type="text"
        value={newTask}
        onChange={handleInputChange}
        placeholder="Add a new task"
      />
      <button onClick={addTask}>Add Task</button>

      {/* List of tasks */}
      <ul>
        {tasks.map((task) => (
          <li key={task.id} style={{ margin: '10px 0' }}>
            {/* Task text */}
            <span
              onClick={() => toggleTaskCompletion(task.id)}
              style={{
                textDecoration: task.completed ? 'line-through' : 'none',
                cursor: 'pointer',
              }}
            >
              {task.text}
            </span>

            {/* Delete button */}
            <button
              onClick={() => deleteTask(task.id)}
              style={{ marginLeft: '10px', color: 'red' }}
            >
              Delete
            </button>
          </li>
        ))}
      </ul>
    </div>
  );
}

export default TodoFunction;
