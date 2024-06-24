import React from 'react';
import {fireEvent, render} from '@testing-library/react';
import '@testing-library/jest-dom/extend-expect';
import ToDoList from './ToDoList';
import userEvent from "@testing-library/user-event";
import renderer from 'react-test-renderer';

describe('ToDoList Tests', () => {
    const task1 = 'Test task 1';
    const task2 = 'Test task 2';
    const listOfTasks = [
        {id: 1, text: task1, completed: false},
        {id: 2, text: task2, completed: false},
    ];

    it('should render todo list and buttons - empty list, remove completed', () => {
        const component = render(<ToDoList listOfTasks={listOfTasks}/>);

        expect(component.getByRole('list')).toBeInTheDocument();
        expect(component.getByRole('list')).toHaveTextContent('Test task 1Test task 2');
        expect(component.getByRole("button", {name: "Remove Completed"})).toBeInTheDocument()
        expect(component.getByTestId('empty-list-button')).toBeInTheDocument();
    });

    it('renders TODOList correctly', () => {
        const tree = renderer
            .create(<ToDoList listOfTasks={listOfTasks}/>)
            .toJSON();
        expect(tree).toMatchSnapshot();
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

    it('should remove all completed tasks when I click on "Remove Completed" button', () => {
        const {getByRole, getByText, queryByText} = render(<ToDoList listOfTasks={listOfTasks}/>)

        fireEvent.click(getByText('Test task 1'))
        const removeCompletedButton = getByRole("button", {name: "Remove Completed"});
        fireEvent.click(removeCompletedButton)

        expect(queryByText('Test task 1')).toBeNull()
    })
});
