import React from 'react';
import Task from './Task';
import {useState} from "react";

export default function ToDoList({listOfTasks}) {

    const [todoList, setTodoList] = useState(listOfTasks);

    const handleParent = (updatedTask) => {
        setTodoList((currTodoList) => {
                const updatedList = currTodoList.map((task) =>
                    task.id === updatedTask.id ? {...task, completed: updatedTask.completed} : task
                );
                console.log("updated list ", updatedList)
                return updatedList
            }
        );
    }

    const handleRemoveCompletedTasks = () => {
        setTodoList((currTodoList) => {
            const filteredList = currTodoList.filter((task) => task.completed === false);
            console.log("filtered list ", filteredList)
            return filteredList
        })
    }

    return (
        <div>
            {todoList.length === 0 && <h4><i>Nothing to do buddy. Sleep!!</i></h4>}
            <ul>
                {todoList.map((task) => <Task key={task.id} task={task}
                                              tellParent={(updatedTask) => handleParent(updatedTask)}/>)}
            </ul>

            <br/> <br/>
            <button type='button' onClick={() => setTodoList([])}>
                Empty List
            </button>
            <button type='button' onClick={handleRemoveCompletedTasks}>
                Remove Completed
            </button>

        </div>
    )
}
