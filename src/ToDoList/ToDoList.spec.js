import React from 'react';
import {render} from '@testing-library/react';
import '@testing-library/jest-dom/extend-expect';
import ToDoList from './ToDoList';
import userEvent from "@testing-library/user-event";

describe('ToDoList Tests', () => {
    const task1 = 'Test task 1';
    const task2 = 'Test task 2';
    const listOfTasks = [
        {id: 1, text: task1, completed: false},
        {id: 2, text: task2, completed: false},
    ];

    it('should render todo list and empty list button', () => {
        const component = render(<ToDoList listOfTasks={listOfTasks}/>);

        expect(component.getByRole('list')).toBeInTheDocument();
        expect(component.getByRole('list')).toHaveTextContent('Test task 1Test task 2');
        expect(component.getByTestId('empty-list-button')).toBeInTheDocument();
        expect(component.asFragment()).toMatchSnapshot();
    });

    it('should strike the task when clicked on the task', () => {
        const component = render(<ToDoList listOfTasks={listOfTasks}/>);

        userEvent.click(component.getByText(task1))

        expect(component.getByText(task1)).toHaveStyle('text-decoration: line-through');
    });


    it('should empty list after clicking on "Empty List" button', () => {
        const component = render(<ToDoList listOfTasks={listOfTasks}/>);

        const emptyListButton = component.getByTestId('empty-list-button');
        expect(emptyListButton).not.toBeDisabled();

        userEvent.click(emptyListButton);

        expect(component.getByRole('list')).toHaveTextContent("");
        expect(component.getByText('Nothing to do buddy. Sleep!!')).toBeInTheDocument();
    });
});
