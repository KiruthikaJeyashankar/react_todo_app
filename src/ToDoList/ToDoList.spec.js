import React from 'react';
import {render} from '@testing-library/react';
import '@testing-library/jest-dom/extend-expect';
import ToDoList from './ToDoList';
import userEvent from "@testing-library/user-event";

describe('ToDoList Tests', () => {
    const task1 = "Test task 1";
    const task2 = 'Test task 2';
    const listOfTasks = [
        {id: 1, text: task1, completed: false},
        {id: 2, text: task2, completed: false},
    ];

    it('should render todo list and button - empty list, remove completed', () => {
        const component = render(<ToDoList listOfTasks={listOfTasks}/>);

        expect(component.getByRole('list')).toBeInTheDocument();
        expect(component.getByRole('list')).toHaveTextContent('Test task 1Test task 2');
        expect(component.getByRole('button', {name: "Empty List"})).toBeInTheDocument();
        expect(component.getByRole('button', {name: "Remove Completed"})).toBeInTheDocument();
        expect(component.asFragment()).toMatchSnapshot();
    });

    it('should strike the task when clicked on the task', () => {
        const component = render(<ToDoList listOfTasks={listOfTasks}/>);
        let task = task1;

        userEvent.click(component.getByText(task))

        expect(component.getByText(task)).toHaveStyle('text-decoration: line-through');
    });


    it('should empty list after clicking on "Empty List" button', () => {
        const component = render(<ToDoList listOfTasks={listOfTasks}/>);

        const emptyListButton = component.getByRole('button', {name: "Empty List"});
        expect(emptyListButton).not.toBeDisabled();

        userEvent.click(emptyListButton);

        expect(component.getByRole('list')).toHaveTextContent("");
        expect(component.getByText('Nothing to do buddy. Sleep!!')).toBeInTheDocument();
    });

    it('should remove all completed tasks when "Remove Completed" button is clicked', () => {
        const component = render(<ToDoList listOfTasks={listOfTasks}/>);

        userEvent.click(component.getByText(task1))
        userEvent.click(component.getByRole('button', {name: "Remove Completed"}));


        expect(component.queryByText(task1)).not.toBeInTheDocument()
        expect(component.getByText(task2)).toBeInTheDocument()
    });
});
