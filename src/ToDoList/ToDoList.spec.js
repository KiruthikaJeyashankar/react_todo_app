import React from 'react';
import {render} from '@testing-library/react';
import '@testing-library/jest-dom/extend-expect';
import ToDoList from './ToDoList';
import userEvent from "@testing-library/user-event";

describe('ToDoList Tests', () => {
    const listOfTasks = [
        {id: 1, text: 'Test task 1', completed: false},
        {id: 2, text: 'Test task 2', completed: true},
    ];

    it('should render todo list and empty list button', () => {
        const component = render(<ToDoList listOfTasks={listOfTasks}/>);

        expect(component.getByRole('list')).toBeInTheDocument();
        expect(component.getByRole('list')).toHaveTextContent('Test task 1Test task 2');
        expect(component.getByTestId('empty-list-button')).toBeInTheDocument();
        expect(component.asFragment()).toMatchSnapshot();
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
