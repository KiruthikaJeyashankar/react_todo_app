import React from 'react';
import Task from './Task';
import {useState} from "react";

export default function ToDoList({listOfTasks}) {

    const [todoList, setTodoList] = useState(listOfTasks);

    const handleParent = (updatedTask) => {
        setTodoList((currTodoList) =>
            currTodoList.map((task) =>
                task.id === updatedTask.id ? {...task, completed: updatedTask.completed} : task
            )
        );
    }

    const handleRemoveCompletedTasks = () => {
        setTodoList((currTodoList) => {
            return currTodoList.filter((task) => {
                if (task.completed)
                    return false
                return true
            })
        })
    };


    return (
        <div>
            {todoList.length === 0 && <h4><i>Nothing to do buddy. Sleep!!</i></h4>}
            <ul>
                {todoList.map((task) => <Task key={task.id} task={task}
                                              tellParent={(updatedTask) => handleParent(updatedTask)}/>)}
            </ul>

            <br/> <br/>
            <button data-testid="empty-list-button" type='button' onClick={() => setTodoList([])}>
                Empty List
            </button>
            <button onClick={handleRemoveCompletedTasks}>Remove Completed</button>
        </div>
    )
}
